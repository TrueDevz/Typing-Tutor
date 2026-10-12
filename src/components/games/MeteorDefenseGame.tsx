import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { SupportedLanguage } from '../../types';
import { getMappedCharFromEvent } from '../../utils/typingEngine';
import { GAME_VOCABULARY } from '../../data/gameWords';
import { Play, RotateCcw, Volume2, VolumeX, Shield, Award, Flame, Zap, Target } from 'lucide-react';

interface MeteorDefenseGameProps {
  language: SupportedLanguage;
}

interface Meteor {
  id: string;
  word: string;
  x: number; // 10% to 85%
  y: number; // 0% to 75%
  speed: number;
  size: number;
}

export const MeteorDefenseGame: React.FC<MeteorDefenseGameProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [shieldHealth, setShieldHealth] = useState<number>(100);
  const [wave, setWave] = useState<number>(1);
  const [combo, setCombo] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [laserBeam, setLaserBeam] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const wordList = GAME_VOCABULARY[language] || GAME_VOCABULARY.english;

  // Sound effects
  const playSfx = useCallback((type: 'laser' | 'explosion' | 'alarm') => {
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

      if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'explosion') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {}
  }, [soundEnabled]);

  // Spawn meteor
  const spawnMeteor = useCallback(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const newMeteor: Meteor = {
      id: `${Date.now()}-${Math.random()}`,
      word: randomWord,
      x: Math.floor(Math.random() * 70) + 12,
      y: 0,
      speed: 0.8 + wave * 0.15,
      size: Math.random() > 0.5 ? 40 : 48,
    };
    setMeteors((prev) => [...prev, newMeteor]);
  }, [wave, wordList]);

  // Start / restart game
  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setMeteors([]);
    setCurrentInput('');
    setScore(0);
    setShieldHealth(100);
    setWave(1);
    setCombo(0);
    containerRef.current?.focus();
  };

  // Spawn interval loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const intervalTime = Math.max(1600, 3200 - wave * 250);
    const spawnTimer = setInterval(spawnMeteor, intervalTime);
    return () => clearInterval(spawnTimer);
  }, [isPlaying, isGameOver, wave, spawnMeteor]);

  // Physics animation tick
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const gameLoop = setInterval(() => {
      setMeteors((prevMeteors) => {
        let healthDeduction = 0;
        const updated: Meteor[] = [];

        for (const m of prevMeteors) {
          const nextY = m.y + m.speed;
          if (nextY >= 75) {
            // Meteor impacted planetary shield
            healthDeduction += 20;
            playSfx('alarm');
          } else {
            updated.push({ ...m, y: nextY });
          }
        }

        if (healthDeduction > 0) {
          setCombo(0);
          setShieldHealth((prevHp) => {
            const newHp = Math.max(0, prevHp - healthDeduction);
            if (newHp <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
            }
            return newHp;
          });
        }

        return updated;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [isPlaying, isGameOver, playSfx]);

  // Key handling
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isPlaying || isGameOver) return;
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

    // Check if any meteor word is fully destroyed
    const targetIdx = meteors.findIndex((m) => m.word.toLowerCase() === nextTyped.toLowerCase());

    if (targetIdx !== -1) {
      const targetMeteor = meteors[targetIdx];
      // Fire laser animation
      setLaserBeam({ x: targetMeteor.x, y: targetMeteor.y });
      setTimeout(() => setLaserBeam(null), 180);

      playSfx('explosion');
      setMeteors((prev) => prev.filter((_, idx) => idx !== targetIdx));
      setCurrentInput('');

      setCombo((prevCombo) => {
        const nextCombo = prevCombo + 1;
        const pts = 100 + nextCombo * 20;
        setScore((prevScore) => {
          const updatedScore = prevScore + pts;
          if (updatedScore > wave * 600) {
            setWave((w) => w + 1);
          }
          return updatedScore;
        });
        return nextCombo;
      });
    } else {
      playSfx('laser');
    }
  }, [currentInput, isGameOver, isPlaying, language, meteors, playSfx, wave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="w-full max-w-5xl mx-auto flex flex-col gap-4 focus:outline-none select-none animate-fade-in"
    >
      {/* Top HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-2xl font-black text-white">{score}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Defense Score</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <Shield className={`w-5 h-5 ${shieldHealth > 40 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`} />
            <div>
              <div className={`text-2xl font-black ${shieldHealth > 40 ? 'text-white' : 'text-rose-400'}`}>
                {shieldHealth}%
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Shield Matrix</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800" />

          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-2xl font-black text-amber-300">WAVE {wave}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {combo > 1 ? `${combo}x Combo Streak!` : 'Threat Level'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={startGame}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {isPlaying ? 'Restart Game' : 'Launch Defense'}
          </button>
        </div>
      </div>

      {/* Main Space Arena */}
      <div className="relative w-full h-[460px] bg-gradient-to-b from-[#030712] via-[#0b0f19] to-[#020617] rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
        {/* Starfield particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Laser Beam Animation */}
        {laserBeam && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <line
              x1="50%"
              y1="90%"
              x2={`${laserBeam.x}%`}
              y2={`${laserBeam.y}%`}
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Meteors falling */}
        <div className="relative w-full h-full">
          {meteors.map((m) => {
            const isTargetPartial = currentInput.length > 0 && m.word.toLowerCase().startsWith(currentInput.toLowerCase());
            return (
              <div
                key={m.id}
                className="absolute transition-all duration-100 ease-linear flex flex-col items-center"
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: 'translate(-50%, 0)',
                }}
              >
                {/* Glowing Asteroid Rock */}
                <div className={`relative px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg border backdrop-blur-md ${
                  isTargetPartial
                    ? 'bg-amber-500/30 border-amber-400 shadow-amber-500/50 scale-110'
                    : 'bg-slate-900/90 border-slate-700/80 shadow-cyan-500/20'
                }`}>
                  <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                  <span className="font-['Anek_Telugu'] text-base font-bold text-white tracking-wide">
                    {m.word}
                  </span>
                </div>

                {/* Trail glow */}
                <div className="w-2 h-6 bg-gradient-to-t from-transparent to-orange-500/60 rounded-full blur-[1px] mt-0.5" />
              </div>
            );
          })}
        </div>

        {/* Base Planetary Shield Line (Impact Zone) */}
        <div className="relative z-10 w-full flex flex-col items-center gap-2">
          <div className="w-full h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]" />

          {/* Player Cannon & Input Feedback */}
          <div className="flex flex-col items-center gap-1">
            <div className="px-5 py-2 rounded-2xl bg-slate-900/95 border border-cyan-500/40 text-lg font-bold text-cyan-300 font-['Anek_Telugu'] shadow-xl min-w-[200px] text-center">
              {currentInput ? (
                <span className="tracking-widest">{currentInput}</span>
              ) : (
                <span className="text-slate-500 text-xs font-normal">Type words to fire orbital cannon...</span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">Planetary Defense Cannon • Ready</span>
          </div>
        </div>

        {/* Start Game Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center gap-4 animate-fade-in">
            <div className="p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Target className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-white">Meteor Typo Defense</h3>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Meteors carrying words are breaching orbit! Type their words with your keyboard to lock-on lasers and vaporize them before they hit your planetary shield.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 transition cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Engage Defense Cannons
            </button>
          </div>
        )}

        {/* Game Over Modal */}
        {isGameOver && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center gap-4 animate-fade-in">
            <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Award className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-white">Shield Breached!</h3>
            <p className="text-sm text-slate-300">
              You defended the planet through <span className="text-amber-400 font-bold">Wave {wave}</span> with a total score of{' '}
              <span className="text-cyan-400 font-bold">{score}</span> points!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
