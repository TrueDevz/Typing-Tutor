import React from 'react';
import type { SupportedLanguage } from '../types';

import { KEYBOARD_ROWS, INSCRIPT_LAYOUTS, FINGER_COLORS, FINGER_NAMES } from '../data/layouts';

interface VirtualKeyboardProps {
  language: SupportedLanguage;
  activeKey: string | null;     // Physical code pressed right now
  targetKey: string | null;     // Physical code of character to type next
  targetNeedsShift: boolean;    // Whether next character requires Shift
  showFingerGuide: boolean;
  onKeyClick?: (code: string, char: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  language,
  activeKey,
  targetKey,
  targetNeedsShift,
  showFingerGuide,
  onKeyClick,
}) => {
  const currentLayout = INSCRIPT_LAYOUTS[language] || INSCRIPT_LAYOUTS.english;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md select-none">
      {/* Keyboard Status Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">InScript Active Layout:</span>
          <span className="text-indigo-400 font-medium capitalize">{language}</span>
        </div>
        {showFingerGuide && (
          <div className="hidden sm:flex items-center gap-2">
            <span>Guide:</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px]">Pinky</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px]">Ring</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">Middle</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px]">Index</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px]">Thumbs</span>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Matrix */}
      <div className="flex flex-col gap-1.5 p-2 bg-slate-950/70 rounded-xl border border-slate-800/80">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 justify-center">
            {row.map((key) => {
              const inscriptChars = currentLayout[key.code];
              const isTarget = targetKey === key.code;
              const isShiftNeeded = targetNeedsShift && (key.code === 'ShiftLeft' || key.code === 'ShiftRight');
              const isHighlighted = isTarget || isShiftNeeded;
              const isPressed = activeKey === key.code;

              const fingerStyle = showFingerGuide ? FINGER_COLORS[key.finger] : null;

              // Size classes
              const widthClass = key.width || 'w-11 sm:w-14';
              const keyChar = targetNeedsShift && inscriptChars?.shift 
                ? inscriptChars.shift 
                : (inscriptChars?.normal || (key.code === 'Space' ? ' ' : key.label.split(' ')[0]));

              return (
                <div
                  key={key.code}
                  onClick={() => onKeyClick?.(key.code, keyChar)}
                  className={`
                    relative h-12 sm:h-14 ${widthClass} rounded-lg flex flex-col justify-between p-1 cursor-pointer
                    transition-all duration-100 ease-out font-sans border
                    ${isPressed
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-95 shadow-lg shadow-amber-400/50'
                      : isHighlighted
                        ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400 shadow-lg shadow-indigo-500/50 animate-bounce'
                        : fingerStyle
                          ? `${fingerStyle.bg} ${fingerStyle.border} text-slate-200`
                          : 'bg-slate-800/70 border-slate-700/60 text-slate-300'
                    }
                  `}
                >
                  {/* Top: Shift character or Secondary character */}
                  <div className="flex justify-between items-start text-[10px] sm:text-xs font-medium leading-none">
                    <span className="opacity-60 text-slate-400">
                      {key.label.includes(' ') ? key.label.split(' ')[1] : ''}
                    </span>
                    {inscriptChars?.shift && (
                      <span className={`font-semibold ${isHighlighted && targetNeedsShift ? 'text-amber-300 font-bold scale-110' : 'text-slate-300'}`}>
                        {inscriptChars.shift}
                      </span>
                    )}
                  </div>

                  {/* Center / Bottom: Main inscript character & QWERTY letter */}
                  <div className="flex justify-between items-end leading-none">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {key.label.split(' ')[0]}
                    </span>
                    <span className={`text-sm sm:text-base font-bold ${isHighlighted && !targetNeedsShift ? 'text-white' : 'text-slate-100'}`}>
                      {inscriptChars ? inscriptChars.normal : ''}
                    </span>
                  </div>

                  {/* Active Finger Indicator Pill */}
                  {isHighlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-[9px] text-white font-semibold px-1.5 py-0.2 rounded-full whitespace-nowrap shadow">
                      {FINGER_NAMES[key.finger]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
