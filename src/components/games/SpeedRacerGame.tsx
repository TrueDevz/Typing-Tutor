import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { SupportedLanguage } from '../../types';
import { getMappedCharFromEvent } from '../../utils/typingEngine';
import { GAME_VOCABULARY } from '../../data/gameWords';
import { Play, RotateCcw, Volume2, VolumeX, Flag, Zap, Trophy, Gauge } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpeedRacerGameProps {
  language: SupportedLanguage;
}

export const SpeedRacerGame: React.FC<SpeedRacerGameProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userDistance, setUserDistance] = useState<number>(0);
  const [botDistance, setBotDistance] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [typedInput, setTypedInput] = useState<string>('');
  const [wordsCompleted, setWordsCompleted] = useState<number>(0);
  const [speedMph, setSpeedMph] = useState<number>(0);
  const [winner, setWinner] = useState<'user' | 'bot' | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const TARGET_DISTANCE = 1000;
  const wordList = GAME_VOCABULARY[language] || GAME_VOCABULARY.english;

  const playEngineSfx = useCallback((type: 'nitro' | 'rev' | 'win') => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'nitro') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {}
  }, [soundEnabled]);

  const nextWord = useCallback(() => {
    const randomW = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomW);
    setTypedInput('');
  }, [wordList]);

  const startRace = () => {
    setIsPlaying(true);
    setIsFinished(false);
    setUserDistance(0);
    setBotDistance(0);
    setWordsCompleted(0);
    setSpeedMph(65);
    setWinner(null);
    nextWord();
    containerRef.current?.focus();
  };

  // AI Rival bot progress loop
  useEffect(() => {
    if (!isPlaying || isFinished) return;
    const botInterval = setInterval(() => {
      setBotDistance((prev) => {
        const nextDist = prev + Math.floor(Math.random() * 22) + 16;
        if (nextDist >= TARGET_DISTANCE) {
          setIsFinished(true);
          setIsPlaying(false);
          setWinner('bot');
        }
        return nextDist;
      });
    }, 400);

    return () => clearInterval(botInterval);
  }, [isPlaying, isFinished]);

  // Key event handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isPlaying || isFinished) return;
    if (['F5', 'F12', 'Tab', 'Alt', 'Control', 'Meta'].includes(e.key)) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      setTypedInput((prev) => prev.slice(0, -1));
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

    const nextTyped = typedInput + char;
    setTypedInput(nextTyped);

    if (nextTyped === currentWord) {
      // Word completed! Nitro boost!
      playEngineSfx('nitro');
      setWordsCompleted((w) => w + 1);
      setSpeedMph((spd) => Math.min(185, spd + 18));

      setUserDistance((prevDist) => {
        const newDist = prevDist + 110;
        if (newDist >= TARGET_DISTANCE) {
          setIsFinished(true);
          setIsPlaying(false);
          setWinner('user');
          playEngineSfx('win');
          try {
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
          } catch {}
        }
        return newDist;
      });

      nextWord();
    } else {
      playEngineSfx('rev');
    }
  }, [currentWord, isFinished, isPlaying, language, nextWord, playEngineSfx, typedInput]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const userProgress = Math.min(100, (userDistance / TARGET_DISTANCE) * 100);
  const botProgress = Math.min(100, (botDistance / TARGET_DISTANCE) * 100);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="w-full max-w-5xl mx-auto flex flex-col gap-4 focus:outline-none select-none animate-fade-in"
    >
      {/* HUD Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-2xl font-black text-white">{speedMph} <span className="text-xs text-slate-500 font-normal">MPH</span></div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Speedometer</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-2xl font-black text-white">{Math.min(TARGET_DISTANCE, userDistance)}m / 1000m</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Distance to Finish</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-2xl font-black text-purple-300">{wordsCompleted}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Nitro Words</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={startRace}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-orange-500/30 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {isPlaying ? 'Restart Race' : 'Start Drag Race'}
          </button>
        </div>
      </div>

      {/* Racetrack Visualizer Card with generous height to prevent clipping */}
      <div className="min-h-[460px] p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
        {/* Track 1: User */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-black">
              🏎️ Your Nitro Racer (Player)
            </span>
            <span className="font-mono text-slate-400">{Math.round(userProgress)}% ({Math.min(TARGET_DISTANCE, userDistance)}m)</span>
          </div>
          <div className="relative w-full h-10 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center px-2">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-2xl transition-all duration-150 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${userProgress}%` }}
            />
            <span
              className="absolute text-2xl transition-all duration-150 drop-shadow"
              style={{ left: `calc(${userProgress}% - 26px)` }}
            >
              🏎️
            </span>
            <div className="absolute right-3 text-xs font-bold text-slate-500">🏁 1000m</div>
          </div>
        </div>

        {/* Track 2: Bot */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-purple-400 font-black">
              🚗 AI Rival Racer (Target 45 WPM)
            </span>
            <span className="font-mono text-slate-400">{Math.round(botProgress)}% ({Math.min(TARGET_DISTANCE, botDistance)}m)</span>
          </div>
          <div className="relative w-full h-10 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center px-2">
            <div
              className="absolute top-0 bottom-0 left-0 bg-purple-600/40 rounded-2xl transition-all duration-300"
              style={{ width: `${botProgress}%` }}
            />
            <span
              className="absolute text-2xl transition-all duration-300 drop-shadow"
              style={{ left: `calc(${botProgress}% - 26px)` }}
            >
              🚗
            </span>
            <div className="absolute right-3 text-xs font-bold text-slate-500">🏁 1000m</div>
          </div>
        </div>

        {/* Active Nitro Word Prompt Box */}
        {isPlaying ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-amber-500/30 flex flex-col items-center justify-center gap-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Type This Nitro Word To Accelerate:
            </span>

            <div className="text-3xl sm:text-5xl font-black font-['Anek_Telugu'] text-amber-300 tracking-wider">
              {currentWord.split('').map((char, idx) => {
                const isMatched = idx < typedInput.length && typedInput[idx] === char;
                return (
                  <span
                    key={idx}
                    className={isMatched ? 'text-emerald-400 underline decoration-2' : 'text-amber-300'}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            <div className="font-mono text-base px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white min-w-[160px] text-center font-['Anek_Telugu']">
              {typedInput || <span className="text-slate-500 text-sm">keystroke input...</span>}
            </div>
          </div>
        ) : (
          <div className="h-28" />
        )}

        {/* Start Overlay (Properly centered and padded, never clipped!) */}
        {!isPlaying && !isFinished && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-10 text-center gap-5 z-20 animate-fade-in">
            <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/20">
              <Zap className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Speed Nitro Racer</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1 leading-relaxed">
                Race head-to-head in a 1000m drag sprint against the AI rival! Type each word accurately to fire nitrous boosters and cross the finish line first.
              </p>
            </div>
            <button
              onClick={startRace}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/30 transition cursor-pointer flex items-center gap-2 transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" /> Start Drag Race
            </button>
          </div>
        )}

        {/* Victory / Defeat Modal */}
        {isFinished && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-10 text-center gap-5 z-20 animate-fade-in">
            <div className={`p-4 rounded-3xl ${winner === 'user' ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400'}`}>
              <Trophy className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {winner === 'user' ? '🏆 1st Place Victory!' : '🏁 2nd Place Finish!'}
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-md">
                {winner === 'user'
                  ? `Incredible speed! You smoked the AI rival with ${wordsCompleted} nitro bursts!`
                  : 'The AI car crossed first. Polish your typing speed and challenge again!'}
              </p>
            </div>
            <button
              onClick={startRace}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Race Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
