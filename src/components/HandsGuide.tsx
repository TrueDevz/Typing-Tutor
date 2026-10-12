import React from 'react';
import type { KeyLayoutItem } from '../data/layouts';


interface HandsGuideProps {
  activeFinger: KeyLayoutItem['finger'] | null;
  targetFinger: KeyLayoutItem['finger'] | null;
}

export const HandsGuide: React.FC<HandsGuideProps> = ({ targetFinger }) => {
  // Mapping finger key to human readable name and hand
  const fingerData: Record<
    KeyLayoutItem['finger'],
    { hand: 'Left Hand' | 'Right Hand'; name: string; color: string; ringClass: string }
  > = {
    'left-pinky': { hand: 'Left Hand', name: 'Pinky Finger', color: '#f43f5e', ringClass: 'stroke-rose-500 fill-rose-500/30' },
    'left-ring': { hand: 'Left Hand', name: 'Ring Finger', color: '#f59e0b', ringClass: 'stroke-amber-500 fill-amber-500/30' },
    'left-middle': { hand: 'Left Hand', name: 'Middle Finger', color: '#10b981', ringClass: 'stroke-emerald-500 fill-emerald-500/30' },
    'left-index': { hand: 'Left Hand', name: 'Index Finger', color: '#06b6d4', ringClass: 'stroke-cyan-500 fill-cyan-500/30' },
    'thumb': { hand: 'Left Hand', name: 'Thumb (Space)', color: '#6366f1', ringClass: 'stroke-indigo-500 fill-indigo-500/30' },
    'right-index': { hand: 'Right Hand', name: 'Index Finger', color: '#3b82f6', ringClass: 'stroke-blue-500 fill-blue-500/30' },
    'right-middle': { hand: 'Right Hand', name: 'Middle Finger', color: '#14b8a6', ringClass: 'stroke-teal-500 fill-teal-500/30' },
    'right-ring': { hand: 'Right Hand', name: 'Ring Finger', color: '#a855f7', ringClass: 'stroke-purple-500 fill-purple-500/30' },
    'right-pinky': { hand: 'Right Hand', name: 'Pinky Finger', color: '#ec4899', ringClass: 'stroke-pink-500 fill-pink-500/30' },
  };

  const currentInfo = targetFinger ? fingerData[targetFinger] : null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
      <div className="w-full flex items-center justify-between text-xs px-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-semibold text-slate-200">Interactive Finger Guidance & Posture</span>
        </div>
        {currentInfo ? (
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800 text-xs font-bold text-white shadow-inner">
            <span className="text-slate-400">{currentInfo.hand}:</span>
            <span style={{ color: currentInfo.color }} className="animate-pulse flex items-center gap-1.5">
              ● {currentInfo.name}
            </span>
          </div>
        ) : (
          <span className="text-slate-500 text-xs">Rest fingers gently on the Home Row</span>
        )}
      </div>

      {/* SVG Interactive Hands Visualization */}
      <div className="w-full flex justify-around items-center py-2 max-w-lg">
        {/* LEFT HAND */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold text-slate-400 mb-1">Left Hand</span>
          <svg viewBox="0 0 160 200" className="w-36 h-44 drop-shadow-md">
            {/* Palm */}
            <path
              d="M 30,110 C 30,80 40,70 80,70 C 120,70 130,85 130,130 C 130,175 110,195 80,195 C 50,195 30,175 30,110 Z"
              className="fill-slate-800/80 stroke-slate-700"
              strokeWidth="2"
            />
            {/* Pinky */}
            <rect
              x="22"
              y={targetFinger === 'left-pinky' ? '30' : '40'}
              width="16"
              height="65"
              rx="8"
              className={`transition-all duration-200 ${
                targetFinger === 'left-pinky'
                  ? 'fill-rose-500 stroke-rose-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Ring */}
            <rect
              x="44"
              y={targetFinger === 'left-ring' ? '15' : '25'}
              width="17"
              height="80"
              rx="8.5"
              className={`transition-all duration-200 ${
                targetFinger === 'left-ring'
                  ? 'fill-amber-500 stroke-amber-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Middle */}
            <rect
              x="67"
              y={targetFinger === 'left-middle' ? '5' : '15'}
              width="18"
              height="90"
              rx="9"
              className={`transition-all duration-200 ${
                targetFinger === 'left-middle'
                  ? 'fill-emerald-500 stroke-emerald-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Index */}
            <rect
              x="91"
              y={targetFinger === 'left-index' ? '18' : '28'}
              width="18"
              height="80"
              rx="9"
              className={`transition-all duration-200 ${
                targetFinger === 'left-index'
                  ? 'fill-cyan-500 stroke-cyan-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Thumb */}
            <path
              d="M 115,115 C 130,105 145,100 152,118 C 158,132 142,145 125,142 Z"
              className={`transition-all duration-200 ${
                targetFinger === 'thumb'
                  ? 'fill-indigo-500 stroke-indigo-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
          </svg>
        </div>

        {/* RIGHT HAND */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold text-slate-400 mb-1">Right Hand</span>
          <svg viewBox="0 0 160 200" className="w-36 h-44 drop-shadow-md">
            {/* Palm */}
            <path
              d="M 130,110 C 130,80 120,70 80,70 C 40,70 30,85 30,130 C 30,175 50,195 80,195 C 110,195 130,175 130,110 Z"
              className="fill-slate-800/80 stroke-slate-700"
              strokeWidth="2"
            />
            {/* Thumb */}
            <path
              d="M 45,115 C 30,105 15,100 8,118 C 2,132 18,145 35,142 Z"
              className={`transition-all duration-200 ${
                targetFinger === 'thumb'
                  ? 'fill-indigo-500 stroke-indigo-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Index */}
            <rect
              x="51"
              y={targetFinger === 'right-index' ? '18' : '28'}
              width="18"
              height="80"
              rx="9"
              className={`transition-all duration-200 ${
                targetFinger === 'right-index'
                  ? 'fill-blue-500 stroke-blue-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Middle */}
            <rect
              x="75"
              y={targetFinger === 'right-middle' ? '5' : '15'}
              width="18"
              height="90"
              rx="9"
              className={`transition-all duration-200 ${
                targetFinger === 'right-middle'
                  ? 'fill-teal-500 stroke-teal-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Ring */}
            <rect
              x="99"
              y={targetFinger === 'right-ring' ? '15' : '25'}
              width="17"
              height="80"
              rx="8.5"
              className={`transition-all duration-200 ${
                targetFinger === 'right-ring'
                  ? 'fill-purple-500 stroke-purple-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
            {/* Pinky */}
            <rect
              x="122"
              y={targetFinger === 'right-pinky' ? '30' : '40'}
              width="16"
              height="65"
              rx="8"
              className={`transition-all duration-200 ${
                targetFinger === 'right-pinky'
                  ? 'fill-pink-500 stroke-pink-300 stroke-2 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]'
                  : 'fill-slate-800 stroke-slate-700 stroke-2'
              }`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
