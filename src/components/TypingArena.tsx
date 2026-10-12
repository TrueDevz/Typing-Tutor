import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Lesson, SupportedLanguage } from '../types';

import { findKeyForChar, getMappedCharFromEvent, calculateStats } from '../utils/typingEngine';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandsGuide } from './HandsGuide';
import { KEYBOARD_ROWS } from '../data/layouts';
import { Play, RotateCcw, Volume2, VolumeX, Eye, EyeOff, Award, Zap, Hand } from 'lucide-react';

import confetti from 'canvas-confetti';

interface TypingArenaProps {
  lesson: Lesson;
  language: SupportedLanguage;
  onComplete: (wpm: number, accuracy: number, duration: number) => void;
  onReset: () => void;
}

export const TypingArena: React.FC<TypingArenaProps> = ({
  lesson,
  language,
  onComplete,
  onReset,
}) => {
  const [typed, setTyped] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [activeKeyCode, setActiveKeyCode] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [showFingerGuide, setShowFingerGuide] = useState<boolean>(true);
  const [showHands, setShowHands] = useState<boolean>(true);


  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play subtle mechanical click / error sound using Web Audio API
  const playClickSound = useCallback((isError: boolean = false) => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isError) {
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Audio might be blocked before first user gesture
    }
  }, [soundEnabled]);


  // Real-time timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished]);


  // Determine the next target character
  const targetText = lesson.content;
  const nextChar = !isFinished && typed.length < targetText.length ? targetText[typed.length] : null;

  // Find physical key for the next char
  const nextKeyInfo = nextChar ? findKeyForChar(nextChar, language) : null;

  // Resolve target finger
  let targetFinger: any = null;
  if (nextKeyInfo) {
    for (const row of KEYBOARD_ROWS) {
      const match = row.find((k) => k.code === nextKeyInfo.code);
      if (match) {
        targetFinger = match.finger;
        break;
      }
    }
  }


  // Handle typing input
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore functional controls like F5, Tab, Alt, etc.
      if (['F5', 'F12', 'Tab', 'Alt', 'Control', 'Meta'].includes(e.key)) {
        return;
      }

      setActiveKeyCode(e.code);

      if (isFinished) return;

      // Handle Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        setTyped((prev) => prev.slice(0, -1));
        return;
      }

      // Check InScript mapping or fallback to native char
      let mappedChar: string | null = null;
      if (language === 'english') {
        mappedChar = e.key;
      } else {
        mappedChar = getMappedCharFromEvent(e.code, e.shiftKey, language) || e.key;
      }

      // Only handle single characters / printable keys
      if (!mappedChar || mappedChar.length > 2) return;

      e.preventDefault();

      const newStartTime = startTime || Date.now();
      if (!startTime) setStartTime(newStartTime);

      const expectedChar = targetText[typed.length];
      const isCorrect = mappedChar === expectedChar;

      if (!isCorrect) {
        setErrorsCount((prev) => prev + 1);
        playClickSound(true);
      } else {
        playClickSound(false);
      }

      const nextTyped = typed + mappedChar;
      setTyped(nextTyped);

      // Check completion
      if (nextTyped.length >= targetText.length) {
        setIsFinished(true);
        const duration = Math.max(1, Math.floor((Date.now() - newStartTime) / 1000));
        const finalStats = calculateStats(nextTyped, targetText, duration, errorsCount + (isCorrect ? 0 : 1));
        
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}

        onComplete(finalStats.wpm, finalStats.accuracy, duration);
      }
    },
    [errorsCount, isFinished, language, onComplete, playClickSound, startTime, targetText, typed]
  );

  const handleKeyUp = useCallback(() => {
    setActiveKeyCode(null);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Live stats
  const stats = calculateStats(typed, targetText, elapsedTime, errorsCount);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-6 focus:outline-none">
      {/* Top Metric Strip */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-2xl font-black text-white">{stats.wpm}</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">WPM</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-2xl font-black text-white">{stats.accuracy}%</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Accuracy</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800"></div>

          <div>
            <div className="text-2xl font-black text-white">
              {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Time</div>
          </div>
        </div>

        {/* Practice Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-sm transition ${
              soundEnabled ? 'bg-slate-800 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-2 rounded-xl border text-sm transition ${
              showKeyboard ? 'bg-slate-800 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Keyboard View"
          >
            {showKeyboard ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowHands(!showHands)}
            className={`p-2 rounded-xl border text-sm transition ${
              showHands ? 'bg-slate-800 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Hands Animation Guide"
          >
            <Hand className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowFingerGuide(!showFingerGuide)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              showFingerGuide ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            Finger Guide: {showFingerGuide ? 'ON' : 'OFF'}
          </button>


          <button
            onClick={() => {
              setTyped('');
              setStartTime(null);
              setElapsedTime(0);
              setIsFinished(false);
              setErrorsCount(0);
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>
        </div>
      </div>

      {/* Main Text Display Arena */}
      <div className="w-full max-w-5xl p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Lesson Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {lesson.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{lesson.description}</p>
          </div>
          {lesson.instructions && (
            <div className="text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
              💡 {lesson.instructions}
            </div>
          )}
        </div>

        {/* Character Stream Box */}
        <div className="relative text-2xl sm:text-3xl leading-relaxed tracking-wider font-sans p-4 bg-slate-950/80 rounded-xl min-h-[140px] border border-slate-800 flex flex-wrap items-baseline select-none">
          {targetText.split('').map((char, index) => {
            const isTyped = index < typed.length;
            const isCurrent = index === typed.length;
            const isCorrect = isTyped && typed[index] === char;

            return (
              <span
                key={index}
                className={`
                  relative transition-colors duration-75 inline-block
                  ${isCurrent ? 'bg-indigo-600/40 text-amber-300 ring-2 ring-indigo-500 rounded px-0.5 animate-pulse font-bold' : ''}
                  ${isTyped
                    ? isCorrect
                      ? 'text-emerald-400'
                      : 'text-rose-400 bg-rose-500/20 line-through rounded px-0.5'
                    : !isCurrent
                      ? 'text-slate-500'
                      : ''
                  }
                  ${char === ' ' ? 'mx-1' : ''}
                `}
              >
                {char === ' ' && isCurrent ? '␣' : char}
              </span>
            );
          })}
        </div>

        {/* Completion Modal / Overlay */}
        {isFinished && (
          <div className="mt-6 p-6 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900/60 rounded-xl border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                🎉 Lesson Completed Successfully!
              </div>
              <p className="text-sm text-slate-300 mt-1">
                You achieved <span className="text-amber-400 font-bold">{stats.wpm} WPM</span> with{' '}
                <span className="text-emerald-400 font-bold">{stats.accuracy}% accuracy</span> in {elapsedTime} seconds.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setTyped('');
                  setStartTime(null);
                  setElapsedTime(0);
                  setIsFinished(false);
                  setErrorsCount(0);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={onReset}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-2"
              >
                Next Lesson <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic 2D Hands Posture Visualization */}
      {showHands && (
        <HandsGuide activeFinger={targetFinger} targetFinger={targetFinger} />
      )}

      {/* Interactive Virtual Keyboard with Active InScript Visuals */}
      {showKeyboard && (
        <VirtualKeyboard
          language={language}
          activeKey={activeKeyCode}
          targetKey={nextKeyInfo?.code || null}
          targetNeedsShift={Boolean(nextKeyInfo?.needsShift)}
          showFingerGuide={showFingerGuide}
        />
      )}
    </div>
  );
};

