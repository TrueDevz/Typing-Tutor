import React, { useState } from 'react';
import { Keyboard, BookOpen, BarChart3, HelpCircle, Gamepad2, Video } from 'lucide-react';

import type { SupportedLanguage, Lesson } from './types';
import { LESSONS } from './data/lessons';
import { TypingArena } from './components/TypingArena';
import { LessonSelector } from './components/LessonSelector';
import { StatsDashboard } from './components/StatsDashboard';
import { LanguageSelector } from './components/LanguageSelector';
import { CustomLessonModal } from './components/CustomLessonModal';
import { WordRainGame } from './components/WordRainGame';
import { InteractiveTutorial } from './components/InteractiveTutorial';
import { loadUserProgress, recordLessonCompletion } from './utils/storage';


export const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('english');
  const [activeTab, setActiveTab] = useState<'arena' | 'curriculum' | 'game' | 'tutorial' | 'stats' | 'help'>('arena');

  const [userProgress, setUserProgress] = useState(loadUserProgress);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Current selected lesson
  const defaultLessonForLang = LESSONS.find((l: Lesson) => l.language === 'english') || LESSONS[0];
  const [currentLesson, setCurrentLesson] = useState<Lesson>(defaultLessonForLang);


  // When language changes, update default active lesson
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    const newLesson = LESSONS.find((l: Lesson) => l.language === lang) || LESSONS[0];
    setCurrentLesson(newLesson);
  };


  const handleLessonComplete = (wpm: number, accuracy: number, duration: number) => {
    const updated = recordLessonCompletion(currentLesson.id, currentLanguage, wpm, accuracy, duration);
    setUserProgress(updated);
  };

  const handleNextLesson = () => {
    const langLessons = LESSONS.filter((l: Lesson) => l.language === currentLanguage);
    const currentIndex = langLessons.findIndex((l: Lesson) => l.id === currentLesson.id);
    if (currentIndex !== -1 && currentIndex + 1 < langLessons.length) {
      setCurrentLesson(langLessons[currentIndex + 1]);
    }
  };

  const handleCustomLessonSubmit = (title: string, content: string) => {
    const customLesson: Lesson = {
      id: `custom-${Date.now()}`,
      title,
      description: 'User-provided custom practice paragraph',
      level: 'custom',
      language: currentLanguage,
      content,
    };
    setCurrentLesson(customLesson);
    setActiveTab('arena');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Keyboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                InScript Indic Typing Tutor
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Government Standard
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Master Indian Languages & English Touch Typing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Custom Text
            </button>


            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={handleLanguageChange}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-slate-900">
          <button
            onClick={() => setActiveTab('arena')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'arena'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Keyboard className="w-4 h-4" /> Practice Arena
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Curriculum & Lessons
          </button>

          <button
            onClick={() => setActiveTab('tutorial')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'tutorial'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4" /> Finger Animation Tutorial
          </button>

          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'game'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> Word Rain Game
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'stats'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Analytics & Records
          </button>

          <button
            onClick={() => setActiveTab('help')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'help'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> InScript Guide
          </button>
        </div>
      </header>

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'arena' && (
          <TypingArena
            key={`${currentLesson.id}-${currentLanguage}`}
            lesson={currentLesson}
            language={currentLanguage}
            onComplete={handleLessonComplete}
            onReset={handleNextLesson}
          />
        )}

        {activeTab === 'tutorial' && (
          <InteractiveTutorial language={currentLanguage} />
        )}

        {activeTab === 'game' && (
          <WordRainGame language={currentLanguage} />
        )}


        {activeTab === 'curriculum' && (
          <LessonSelector
            lessons={LESSONS}
            currentLessonId={currentLesson.id}
            completedLessons={userProgress.completedLessons}
            activeLanguage={currentLanguage}
            onSelectLesson={(lesson: Lesson) => {
              setCurrentLesson(lesson);
              setActiveTab('arena');
            }}
          />
        )}


        {activeTab === 'stats' && <StatsDashboard progress={userProgress} />}

        {activeTab === 'help' && (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-6 sm:p-8 bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-300">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-400" />
              About InScript Keyboard Standard
            </h2>

            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong className="text-white">InScript (Indian Script)</strong> is the standardized keyboard layout
                created by the Government of India for typing Indian language scripts. It is supported natively
                across Windows, macOS, Linux, Android, and iOS.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <h4 className="font-bold text-indigo-300 mb-1">Left Hand: Vowels & Matras</h4>
                  <p className="text-xs text-slate-400">
                    The left hand side contains all vowels and vowel diacritics (matras). Normal keypress gives the matra,
                    and Shift + key gives the independent vowel.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <h4 className="font-bold text-cyan-300 mb-1">Right Hand: Consonants</h4>
                  <p className="text-xs text-slate-400">
                    The right hand side contains consonants. Unvoiced consonants are on normal keys, and their aspirated
                    counterparts are accessed with Shift.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <h4 className="font-bold mb-1">Halant / Virama (D Key):</h4>
                <p className="text-xs">
                  Pressing the letter <strong>D</strong> in Indian scripts inserts the Virama / Halant (్ / ् / ் / ್).
                  To type conjuncts (e.g. क् + ष = क्ष, or త్ + త = త్త), type consonant + D + consonant.
                </p>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-white mb-2">Finger Home Position:</h4>
                <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-400">
                  <li><strong>Left Pinky:</strong> A key (ो / ো / ో)</li>
                  <li><strong>Left Ring:</strong> S key (े / ে / ే)</li>
                  <li><strong>Left Middle:</strong> D key (् / ್ / ్ / ் - Halant / Virama)</li>
                  <li><strong>Left Index:</strong> F key (ि / ി / ి) and reaches to G (ु / ು / ు)</li>
                  <li><strong>Right Index:</strong> J key (र / ர / ర / ರ) and reaches to H (प / ப / ప / ಪ)</li>
                  <li><strong>Right Middle:</strong> K key (क / க / క / ಕ)</li>
                  <li><strong>Right Ring:</strong> L key (त / த / త / ತ)</li>
                  <li><strong>Right Pinky:</strong> ; key (च / ச / చ / ಚ)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Custom Lesson Creation Modal */}
      <CustomLessonModal
        language={currentLanguage}
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSubmit={handleCustomLessonSubmit}
      />
    </div>
  );
};

export default App;
