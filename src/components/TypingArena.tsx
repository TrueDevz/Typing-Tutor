import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Lesson, SupportedLanguage, SoundTheme, InputMode } from '../types';
import { findKeyForChar, getMappedCharFromEvent, calculateStats } from '../utils/typingEngine';
import { getPhoneticHintForChar } from '../utils/phoneticEngine';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandsGuide } from './HandsGuide';
import { CertificateModal } from './CertificateModal';
import { KEYBOARD_ROWS } from '../data/layouts';
import { 
  Play, RotateCcw, Volume2, VolumeX, Eye, EyeOff, Award, Zap, Hand, 
  Timer, Bot 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TypingArenaProps {
  lesson: Lesson;
  language: SupportedLanguage;
  onComplete: (
    wpm: number, 
    accuracy: number, 
    duration: number, 
    sessionErrors?: Record<string, number>,
    keystrokeCounts?: { total: number; correct: number }
  ) => void;
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
  const [sessionErrors, setSessionErrors] = useState<Record<string, number>>({});
  const [activeKeyCode, setActiveKeyCode] = useState<string | null>(null);
  
  // Custom Controls
  const [soundTheme, setSoundTheme] = useState<SoundTheme>('cherry');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [showFingerGuide, setShowFingerGuide] = useState<boolean>(true);
  const [showHands, setShowHands] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<InputMode>('inscript');
  
  // Timed Test Mode: 0 = Passage length, 30s, 60s, 120s, 300s
  const [testDuration, setTestDuration] = useState<number>(0);
  
  // Ghost Racer Target WPM: 0 = Off, 20, 35, 50, 70
  const [ghostWpm, setGhostWpm] = useState<number>(0);

  // Certificate Modal State
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Realistic synthesized audio for mechanical keyboard clicks & errors
  const playSynthesizedSound = useCallback((isError: boolean = false) => {
    if (!soundEnabled || soundTheme === 'silent') return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (isError) {
        // Harsh error buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.14);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
        return;
      }

      // Themes sound profiles
      if (soundTheme === 'cherry') {
        // Cherry MX Blue: High snap click + body snap
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'triangle';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(1200, now);
        osc1.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        osc2.frequency.setValueAtTime(2400, now);
        osc2.frequency.exponentialRampToValueAtTime(800, now + 0.02);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.045);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.045);
        osc2.stop(now + 0.045);

      } else if (soundTheme === 'thock') {
        // Mechanical Thock: Deep low frequency resonant bottom-out
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);

      } else if (soundTheme === 'typewriter') {
        // Vintage typewriter: Metallic click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.06);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);

      } else if (soundTheme === 'bubble') {
        // Bubble pop: playful sine ramp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.05);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);

      } else {
        // Simple click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio not initiated
    }
  }, [soundEnabled, soundTheme]);

  // Reset arena state when lesson changes
  useEffect(() => {
    setTyped('');
    setStartTime(null);
    setElapsedTime(0);
    setIsFinished(false);
    setErrorsCount(0);
    setSessionErrors({});
  }, [lesson]);

  // Complete test helper
  const completeSession = useCallback((finalTyped: string, finalDuration: number, finalErrors: number, finalErrorMap: Record<string, number>) => {
    setIsFinished(true);
    const duration = Math.max(1, finalDuration);
    const finalStats = calculateStats(finalTyped, lesson.content, duration, finalErrors);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    onComplete(
      finalStats.wpm, 
      finalStats.accuracy, 
      duration, 
      finalErrorMap, 
      { total: finalStats.totalTyped, correct: finalStats.correctCount }
    );
  }, [lesson.content, onComplete]);

  // Real-time timer & Countdown check
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(seconds);

        // Timed Test countdown expiration check
        if (testDuration > 0 && seconds >= testDuration) {
          completeSession(typed, seconds, errorsCount, sessionErrors);
        }
      }, 500);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished, testDuration, typed, errorsCount, sessionErrors, completeSession]);

  // Target text calculation
  const targetText = lesson.content;
  const nextChar = !isFinished && typed.length < targetText.length ? targetText[typed.length] : null;

  // Find physical key for the next char
  const nextKeyInfo = nextChar ? findKeyForChar(nextChar, language) : null;
  const phoneticHint = nextChar && inputMode === 'phonetic' ? getPhoneticHintForChar(nextChar, language) : null;

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

  // Core character processor
  const processCharacterInput = useCallback((inputChar: string) => {
    if (isFinished) return;

    const newStartTime = startTime || Date.now();
    if (!startTime) setStartTime(newStartTime);

    const expectedChar = targetText[typed.length];
    const isCorrect = inputChar === expectedChar;

    let updatedErrors = errorsCount;
    let updatedErrorMap = { ...sessionErrors };

    if (!isCorrect) {
      updatedErrors += 1;
      setErrorsCount(updatedErrors);
      if (expectedChar) {
        updatedErrorMap[expectedChar] = (updatedErrorMap[expectedChar] || 0) + 1;
        setSessionErrors(updatedErrorMap);
      }
      playSynthesizedSound(true);
    } else {
      playSynthesizedSound(false);
    }

    const nextTyped = typed + inputChar;
    setTyped(nextTyped);

    // Check completion when passage is fully typed
    if (nextTyped.length >= targetText.length) {
      const duration = Math.max(1, Math.floor((Date.now() - newStartTime) / 1000));
      completeSession(nextTyped, duration, updatedErrors, updatedErrorMap);
    }
  }, [completeSession, errorsCount, isFinished, playSynthesizedSound, sessionErrors, startTime, targetText, typed]);

  // Handle physical keyboard input
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
      if (language === 'english' || inputMode === 'phonetic') {
        mappedChar = e.key;
      } else {
        mappedChar = getMappedCharFromEvent(e.code, e.shiftKey, language) || e.key;
      }

      if (!mappedChar || mappedChar.length > 2) return;

      e.preventDefault();
      processCharacterInput(mappedChar);
    },
    [inputMode, isFinished, language, processCharacterInput]
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

  // Tap typing on virtual keyboard
  const handleVirtualKeyClick = (code: string, char: string) => {
    setActiveKeyCode(code);
    setTimeout(() => setActiveKeyCode(null), 120);

    if (code === 'Backspace') {
      setTyped((prev) => prev.slice(0, -1));
    } else {
      processCharacterInput(char);
    }
  };

  // Live stats
  const stats = calculateStats(typed, targetText, elapsedTime, errorsCount);

  // Ghost Racer Calculation
  const userProgressPercent = Math.min(100, (typed.length / targetText.length) * 100);
  const ghostTargetChars = ghostWpm > 0 && startTime ? Math.floor((ghostWpm * 5 / 60) * elapsedTime) : 0;
  const ghostProgressPercent = Math.min(100, (ghostTargetChars / targetText.length) * 100);
  const wordLead = Math.round((typed.length - ghostTargetChars) / 5);

  // Countdown time for Timed Test
  const remainingSeconds = testDuration > 0 ? Math.max(0, testDuration - elapsedTime) : null;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center gap-6 focus:outline-none">
      {/* Top Metric Strip & Live Controls */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
        {/* KPI metrics */}
        <div className="flex items-center gap-5 sm:gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-2xl font-black text-white">{stats.wpm}</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">WPM</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-2xl font-black text-white">{stats.accuracy}%</div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-2">
            <Timer className={`w-5 h-5 ${testDuration > 0 && remainingSeconds! <= 10 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
            <div>
              <div className="text-2xl font-black text-white">
                {testDuration > 0
                  ? `${Math.floor(remainingSeconds! / 60)}:${(remainingSeconds! % 60).toString().padStart(2, '0')}`
                  : `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {testDuration > 0 ? 'Remaining' : 'Elapsed'}
              </div>
            </div>
          </div>
        </div>

        {/* Practice Modes & Config Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Duration Selector */}
          <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-1 text-xs">
            <span className="text-[10px] text-slate-400 px-1.5 font-bold flex items-center gap-1">
              <Timer className="w-3 h-3 text-cyan-400" /> Time:
            </span>
            {[
              { label: 'Full', val: 0 },
              { label: '30s', val: 30 },
              { label: '1m', val: 60 },
              { label: '2m', val: 120 },
              { label: '5m', val: 300 },
            ].map((t) => (
              <button
                key={t.val}
                onClick={() => {
                  setTestDuration(t.val);
                  setTyped('');
                  setStartTime(null);
                  setElapsedTime(0);
                  setIsFinished(false);
                }}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] ${
                  testDuration === t.val
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Ghost Racer Selector */}
          <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-1 text-xs">
            <span className="text-[10px] text-slate-400 px-1.5 font-bold flex items-center gap-1">
              <Bot className="w-3 h-3 text-purple-400" /> Pace:
            </span>
            {[
              { label: 'Off', val: 0 },
              { label: '25', val: 25 },
              { label: '40', val: 40 },
              { label: '60', val: 60 },
            ].map((g) => (
              <button
                key={g.val}
                onClick={() => setGhostWpm(g.val)}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px] ${
                  ghostWpm === g.val
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Sound Theme Selector */}
          <div className="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                soundEnabled ? 'text-indigo-400 hover:bg-slate-800' : 'text-slate-500'
              }`}
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {soundEnabled && (
              <select
                value={soundTheme}
                onChange={(e) => setSoundTheme(e.target.value as SoundTheme)}
                className="bg-transparent text-[11px] font-bold text-slate-300 focus:outline-none cursor-pointer pr-1"
              >
                <option value="cherry" className="bg-slate-900">Cherry Blue</option>
                <option value="thock" className="bg-slate-900">Thock (Deep)</option>
                <option value="typewriter" className="bg-slate-900">Typewriter</option>
                <option value="bubble" className="bg-slate-900">Bubble Pop</option>
                <option value="simple" className="bg-slate-900">Simple Beep</option>
              </select>
            )}
          </div>

          {/* View Toggles */}
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-2 rounded-xl border text-sm transition cursor-pointer ${
              showKeyboard ? 'bg-slate-800 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Keyboard View"
          >
            {showKeyboard ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Input Mode Toggle (for Indian languages) */}
          {language !== 'english' && (
            <button
              onClick={() => setInputMode(inputMode === 'inscript' ? 'phonetic' : 'inscript')}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                inputMode === 'phonetic' 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}
              title="Toggle InScript / Phonetic Input"
            >
              {inputMode === 'inscript' ? 'InScript' : 'Phonetic'}
            </button>
          )}

          <button
            onClick={() => setShowFingerGuide(!showFingerGuide)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              showFingerGuide 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Key Finger Guides"
          >
            Fingers: {showFingerGuide ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowHands(!showHands)}
            className={`p-2 rounded-xl border text-sm transition cursor-pointer ${
              showHands ? 'bg-slate-800 text-indigo-400 border-indigo-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title="Toggle Hands Guide"
          >
            <Hand className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setTyped('');
              setStartTime(null);
              setElapsedTime(0);
              setIsFinished(false);
              setErrorsCount(0);
              setSessionErrors({});
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart
          </button>
        </div>
      </div>

      {/* Ghost Racer Interactive Race Track */}
      {ghostWpm > 0 && (
        <div className="w-full max-w-5xl bg-slate-900/80 border border-purple-500/30 p-3.5 rounded-2xl flex flex-col gap-2 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2 text-indigo-300">
              🏎️ You ({stats.wpm} WPM)
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              wordLead >= 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {wordLead >= 0 ? `+${wordLead} words ahead` : `${Math.abs(wordLead)} words behind`}
            </span>
            <span className="flex items-center gap-2 text-purple-400">
              🤖 Ghost Racer ({ghostWpm} WPM target)
            </span>
          </div>

          <div className="relative w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            {/* Ghost Track */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-purple-600/40 transition-all duration-300"
              style={{ width: `${ghostProgressPercent}%` }}
            />
            {/* User Track */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-150"
              style={{ width: `${userProgressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Text Arena */}
      <div className="w-full max-w-5xl p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Lesson Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {lesson.title}
              {testDuration > 0 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  ⏱️ {testDuration}s Timed Test
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{lesson.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {phoneticHint && (
              <div className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 font-mono">
                🔤 Phonetic Key: <strong>{phoneticHint}</strong>
              </div>
            )}
            {lesson.instructions && (
              <div className="text-xs text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20">
                💡 {lesson.instructions}
              </div>
            )}
          </div>
        </div>

        {/* Character Stream Box */}
        <div className="relative text-2xl sm:text-3xl leading-relaxed tracking-wider font-sans p-5 bg-slate-950/80 rounded-2xl min-h-[140px] border border-slate-800 flex flex-wrap items-baseline select-none">
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
          <div className="mt-6 p-6 bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 rounded-2xl border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl animate-fade-in">
            <div>
              <div className="text-xl font-black text-white flex items-center gap-2">
                🎉 Test & Lesson Finished!
              </div>
              <p className="text-sm text-slate-300 mt-1">
                You achieved <span className="text-amber-400 font-bold">{stats.wpm} WPM</span> with{' '}
                <span className="text-emerald-400 font-bold">{stats.accuracy}% accuracy</span> in {elapsedTime} seconds.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCertOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <Award className="w-4 h-4" /> View Certificate
              </button>

              <button
                onClick={() => {
                  setTyped('');
                  setStartTime(null);
                  setElapsedTime(0);
                  setIsFinished(false);
                  setErrorsCount(0);
                  setSessionErrors({});
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition cursor-pointer"
              >
                Try Again
              </button>

              <button
                onClick={onReset}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-1.5"
              >
                Next Lesson <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Hands Posture Guidance */}
      {showHands && (
        <HandsGuide activeFinger={targetFinger} targetFinger={targetFinger} />
      )}

      {/* Interactive Virtual Keyboard with Active InScript Visuals and Tap-Typing */}
      {showKeyboard && (
        <VirtualKeyboard
          language={language}
          activeKey={activeKeyCode}
          targetKey={nextKeyInfo?.code || null}
          targetNeedsShift={Boolean(nextKeyInfo?.needsShift)}
          showFingerGuide={showFingerGuide}
          onKeyClick={handleVirtualKeyClick}
        />
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        wpm={stats.wpm}
        accuracy={stats.accuracy}
        language={language}
        duration={elapsedTime}
        lessonTitle={lesson.title}
      />
    </div>
  );
};
