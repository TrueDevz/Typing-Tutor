import React, { useState } from 'react';
import type { UserProgress } from '../types';
import { Trophy, Clock, Target, History, AlertTriangle, Play, Trash2, Download, Upload, RefreshCw } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { clearErrorHistory, resetAllProgress, exportProgressJson, importProgressJson } from '../utils/storage';

interface StatsDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onPracticeWeakKeys: (keys: string[]) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  progress,
  onUpdateProgress,
  onPracticeWeakKeys,
}) => {
  const [importText, setImportText] = useState<string>('');
  const [showImportBox, setShowImportBox] = useState<boolean>(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ${mins % 60}m`;
    return `${mins}m ${seconds % 60}s`;
  };

  // Sort mistyped characters by error frequency
  const mistypedList = Object.entries(progress.mistypedChars || {})
    .filter(([char]) => char && char.trim() !== '')
    .sort((a, b) => b[1] - a[1]);

  const handleClearErrors = () => {
    const updated = clearErrorHistory();
    onUpdateProgress(updated);
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all typing progress and high scores? This action cannot be undone.')) {
      const updated = resetAllProgress();
      onUpdateProgress(updated);
    }
  };

  const handleExportData = () => {
    const jsonStr = exportProgressJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `indic-typing-tutor-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const updated = importProgressJson(importText);
    if (updated) {
      onUpdateProgress(updated);
      setShowImportBox(false);
      setImportText('');
      alert('Progress data restored successfully!');
    } else {
      alert('Invalid JSON data format. Please check and try again.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Performance & Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track your typing speed milestones, accuracy records, and error analytics.
          </p>
        </div>

        {/* Data Management Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
            title="Export Backup JSON"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" /> Export JSON
          </button>

          <button
            onClick={() => setShowImportBox(!showImportBox)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
            title="Import Backup JSON"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" /> Import
          </button>

          <button
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-semibold transition cursor-pointer"
            title="Reset All Progress"
          >
            <RefreshCw className="w-3.5 h-3.5 text-rose-400" /> Reset
          </button>
        </div>
      </div>

      {/* Import Modal / Accordion */}
      {showImportBox && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-300">Paste Backup JSON Content:</span>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder='{"completedLessons": [...], "bestWpmByLanguage": {...}}'
            className="w-full h-24 p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowImportBox(false)}
              className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleImportSubmit}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
            >
              Restore Progress
            </button>
          </div>
        </div>
      )}

      {/* Top 3 KPI Cards */}
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

      {/* Weak Keys & Mistyped Characters Heatmap */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white">
              Weak Keys & Error Analysis
            </span>
          </div>

          {mistypedList.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPracticeWeakKeys(mistypedList.slice(0, 8).map(([char]) => char))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Practice Weak Keys Now
              </button>

              <button
                onClick={handleClearErrors}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                title="Clear Error History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {mistypedList.length === 0 ? (
          <div className="text-xs text-emerald-400/80 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
            ✨ Excellent precision! No frequent typing errors recorded so far. Keep practicing to discover keys that need improvement.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-slate-400">
              Characters with the most mistakes during your practice sessions. Click any key to start a focused drill:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {mistypedList.slice(0, 12).map(([char, count], idx) => {
                const isHighSeverity = count >= 5;
                return (
                  <div
                    key={idx}
                    onClick={() => onPracticeWeakKeys([char])}
                    className={`p-3 rounded-xl border cursor-pointer transition flex flex-col items-center justify-center ${
                      isHighSeverity
                        ? 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20'
                        : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
                    }`}
                  >
                    <span className="text-2xl font-bold text-white mb-1 font-sans">{char}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isHighSeverity ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {count} mistakes
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
