import React from 'react';
import type { UserProgress } from '../types';

import { Trophy, Clock, Target, History } from 'lucide-react';

import { SUPPORTED_LANGUAGES } from '../data/languages';

interface StatsDashboardProps {
  progress: UserProgress;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ progress }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ${mins % 60}m`;
    return `${mins}m ${seconds % 60}s`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Performance & Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track your typing speed, milestones, and training journey.
          </p>
        </div>
      </div>

      {/* Top 3 High Level KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{progress.testsTaken}</div>
            <div className="text-xs text-slate-400 font-medium">Tests & Lessons Completed</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {formatTime(progress.totalTimeTrainedSeconds)}
            </div>
            <div className="text-xs text-slate-400 font-medium">Total Practice Time</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {progress.completedLessons.length}
            </div>
            <div className="text-xs text-slate-400 font-medium">Curriculum Modules Mastered</div>
          </div>
        </div>
      </div>

      {/* Language-wise Best WPM Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Highest Speed Records By Language (WPM)
          </span>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const best = progress.bestWpmByLanguage[lang.id] || 0;
            return (
              <div
                key={lang.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center text-center"
              >
                <span className="text-[11px] text-slate-400 font-medium">{lang.name}</span>
                <span className="text-xl font-black text-white mt-1">
                  {best} <span className="text-[10px] text-slate-500 font-normal">WPM</span>
                </span>
                <span className="text-[9px] text-indigo-400 mt-0.5">{lang.nativeName}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent History Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-bold text-white">Recent Session History</span>
        </div>

        {progress.recentResults.length === 0 ? (
          <div className="text-xs text-slate-500 py-6 text-center">
            No practice sessions recorded yet. Start practicing to see your performance logs!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-2 font-medium">Date & Time</th>
                  <th className="pb-2 font-medium">Language</th>
                  <th className="pb-2 font-medium">Speed</th>
                  <th className="pb-2 font-medium">Accuracy</th>
                  <th className="pb-2 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {progress.recentResults.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 font-mono text-slate-400">{item.date}</td>
                    <td className="py-2.5 capitalize font-medium text-slate-200">{item.language}</td>
                    <td className="py-2.5 font-bold text-amber-400">{item.wpm} WPM</td>
                    <td className="py-2.5 font-bold text-emerald-400">{item.accuracy}%</td>
                    <td className="py-2.5 font-mono text-slate-400">{item.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
