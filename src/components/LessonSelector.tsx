import React from 'react';
import type { Lesson, SupportedLanguage } from '../types';

import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';


interface LessonSelectorProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessons: string[];
  activeLanguage: SupportedLanguage;
  onSelectLesson: (lesson: Lesson) => void;
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  lessons,
  currentLessonId,
  completedLessons,
  activeLanguage,
  onSelectLesson,
}) => {
  const filteredLessons = lessons.filter((l) => l.language === activeLanguage);

  // Group by level
  const beginners = filteredLessons.filter((l) => l.level === 'beginner');
  const intermediates = filteredLessons.filter((l) => l.level === 'intermediate');
  const advanced = filteredLessons.filter((l) => l.level === 'advanced');

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Structured Curriculum
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Carefully structured step-by-step finger progression for {activeLanguage.toUpperCase()} InScript.
          </p>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
          Completed: <span className="text-indigo-400 font-bold">{completedLessons.filter(id => filteredLessons.some(l => l.id === id)).length}</span> / {filteredLessons.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Beginner */}
        <div className="flex flex-col gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Beginner
            </span>
            <span className="text-[11px] text-slate-500">{beginners.length} Modules</span>
          </div>

          <div className="flex flex-col gap-2">
            {beginners.map((l) => {
              const isSelected = l.id === currentLessonId;
              const isDone = completedLessons.includes(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => onSelectLesson(l)}
                  className={`text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-sm font-semibold">{l.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{l.description}</span>
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Intermediate */}
        <div className="flex flex-col gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Intermediate
            </span>
            <span className="text-[11px] text-slate-500">{intermediates.length} Modules</span>
          </div>

          <div className="flex flex-col gap-2">
            {intermediates.map((l) => {
              const isSelected = l.id === currentLessonId;
              const isDone = completedLessons.includes(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => onSelectLesson(l)}
                  className={`text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-sm font-semibold">{l.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{l.description}</span>
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced */}
        <div className="flex flex-col gap-3 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> Advanced & Fluency
            </span>
            <span className="text-[11px] text-slate-500">{advanced.length} Modules</span>
          </div>


          <div className="flex flex-col gap-2">
            {advanced.map((l) => {
              const isSelected = l.id === currentLessonId;
              const isDone = completedLessons.includes(l.id);

              return (
                <button
                  key={l.id}
                  onClick={() => onSelectLesson(l)}
                  className={`text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-sm font-semibold">{l.title}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{l.description}</span>
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
