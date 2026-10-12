import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { SupportedLanguage } from '../types';
import { GAME_VOCABULARY } from '../data/gameWords';
import { getMappedCharFromEvent } from '../utils/typingEngine';
import { Play, RotateCcw, Volume2, VolumeX, ShieldAlert, Award, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WordRainGameProps {
  language: SupportedLanguage;
}

interface FallingWord {
  id: string;
  word: string;
  x: number;          // percentage from left: 10% to 85%
  y: number;          // percentage from top: 0% to 90%
  speed: number;      // fall speed per tick
}

export const WordRainGame: React.FC<WordRainGameProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState(1);
  const [words, setWords] = useState<FallingWord[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound generator
  const playAudio = useCallback((type: 'zap' | 'error' | 'gameover') => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'zap') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'gameover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch {}
  }, [soundEnabled]);

  const wordBank = GAME_VOCABULARY[language] || GAME_VOCABULARY.english;

  // Start game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLives(5);
    setLevel(1);
    setWords([]);
    setCurrentInput('');
    setIsGameOver(false);
  };

  // Spawn words loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const spawnInterval = setInterval(() => {
      setWords((prev) => {
        if (prev.length >= 6) return prev;
        const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
        const newWord: FallingWord = {
          id: `${Date.now()}-${Math.random()}`,
          word: randomWord,
          x: 10 + Math.floor(Math.random() * 70), // range 10% to 80%
          y: 0,
          speed: 0.4 + level * 0.15,
        };
        return [...prev, newWord];
      });
    }, Math.max(1200, 2600 - level * 200));

    return () => clearInterval(spawnInterval);
  }, [isPlaying, isGameOver, level, wordBank]);

  // Movement loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const frame = setInterval(() => {
      setWords((prev) => {
        const nextWords: FallingWord[] = [];
        let lostLife = false;

        for (const item of prev) {
          const nextY = item.y + item.speed;
          if (nextY >= 88) {
            lostLife = true;
          } else {
            nextWords.push({ ...item, y: nextY });
          }
        }

        if (lostLife) {
          playAudio('error');
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
              playAudio('gameover');
            }
            return Math.max(0, nextL);
          });
        }

        return nextWords;
      });
    }, 50);

    return () => clearInterval(frame);
  }, [isGameOver, isPlaying, playAudio]);

  // Keyboard handler for typed characters
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (['F5', 'F12', 'Tab', 'Alt', 'Control', 'Meta'].includes(e.key)) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setCurrentInput((prev) => prev.slice(0, -1));
        return;
      }

      let char: string | null = null;
      if (language === 'english') {
        char = e.key;
      } else {
        char = getMappedCharFromEvent(e.code, e.shiftKey, language) || e.key;
      }

      if (!char || char.length > 2) return;
      e.preventDefault();

      const nextTyped = currentInput + char;
      setCurrentInput(nextTyped);

      // Check if matches any falling word
      const matchIndex = words.findIndex((w) => w.word === nextTyped.trim());
      if (matchIndex !== -1) {
        // Destroy word!
        playAudio('zap');
        setWords((prev) => prev.filter((_, idx) => idx !== matchIndex));
        setCurrentInput('');
        setScore((s) => {
          const newS = s + 10;
          if (newS % 50 === 0) {
            setLevel((lvl) => lvl + 1);
            try {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            } catch {}
          }
          return newS;
        });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentInput, isGameOver, isPlaying, language, playAudio, words]);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4">
      {/* Top HUD */}
      <div className="w-full flex items-center justify-between p-4 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-xl font-black text-white">{score}</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Score</div>
            </div>
          </div>

          <div className="h-7 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xl font-black text-white">{level}</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Level</div>
            </div>
          </div>

          <div className="h-7 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full ${
                    i < lives ? 'bg-rose-500 shadow-sm shadow-rose-500/50' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-sm transition ${
              soundEnabled ? 'bg-slate-800 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {!isPlaying ? (
            <button
              onClick={startGame}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> {isGameOver ? 'Play Again' : 'Start Rain Game'}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsPlaying(false);
                setIsGameOver(true);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition cursor-pointer"
            >
              Pause / End
            </button>
          )}
        </div>
      </div>

      {/* Main Game Screen Canvas */}
      <div className="w-full h-[450px] relative rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
        {/* Falling Words Arena */}
        <div className="w-full h-full relative">
          {words.map((item) => {
            const isTargeted = currentInput.length > 0 && item.word.startsWith(currentInput.trim());

            return (
              <div
                key={item.id}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, 0)',
                }}
                className={`
                  absolute px-3 py-1.5 rounded-xl border text-base font-bold transition-all duration-75 shadow-lg select-none
                  ${isTargeted
                    ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/40 scale-110 shadow-amber-400/50'
                    : 'bg-slate-900/90 text-white border-indigo-500/40 shadow-indigo-500/20'
                  }
                `}
              >
                {item.word}
              </div>
            );
          })}

          {/* Danger Laser Line at Bottom */}
          <div className="absolute bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_12px_rgba(244,63,94,0.8)] opacity-70 animate-pulse"></div>

          {/* Splash screen before start */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 gap-4">
              <Rocket className="w-12 h-12 text-indigo-400 animate-bounce" />
              <h3 className="text-2xl font-black text-white">Word Rain Arcade</h3>
              <p className="text-xs text-slate-400 max-w-md">
                Words fall from the sky in <span className="text-indigo-400 capitalize font-bold">{language}</span>. Type the words before they hit the laser boundary below!
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 transition cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" /> Launch Game
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {isGameOver && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 gap-3">
              <h3 className="text-3xl font-black text-rose-500">Game Over</h3>
              <p className="text-sm text-slate-300">
                You scored <span className="text-amber-400 font-bold">{score} points</span> and reached{' '}
                <span className="text-indigo-400 font-bold">Level {level}</span>!
              </p>
              <button
                onClick={startGame}
                className="mt-2 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 flex items-center gap-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>

        {/* Live Input Beam */}
        {isPlaying && (
          <div className="w-full flex items-center justify-center py-2 z-10">
            <div className="px-6 py-2 rounded-2xl bg-slate-900 border border-indigo-500/60 shadow-lg text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span className="text-xs text-slate-500">Currently typing:</span>
              <span className="text-white text-xl">{currentInput || '...'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
