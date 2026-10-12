import type { UserProgress, SupportedLanguage } from '../types';


const STORAGE_KEY = 'indian_typing_tutor_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  bestWpmByLanguage: {
    english: 0,
    hindi: 0,
    telugu: 0,
    tamil: 0,
    kannada: 0,
    bengali: 0,
    marathi: 0,
    gujarati: 0,
    malayalam: 0,
    punjabi: 0,
    odia: 0,
  },
  totalTimeTrainedSeconds: 0,
  testsTaken: 0,
  recentResults: [],
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress:', err);
  }
}

export function recordLessonCompletion(
  lessonId: string,
  lang: SupportedLanguage,
  wpm: number,
  accuracy: number,
  duration: number
): UserProgress {
  const current = loadUserProgress();
  const completed = Array.from(new Set([...current.completedLessons, lessonId]));

  const bestWpm = Math.max(current.bestWpmByLanguage[lang] || 0, wpm);
  const updatedBest = { ...current.bestWpmByLanguage, [lang]: bestWpm };

  const newResult = {
    id: `${Date.now()}`,
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    language: lang,
    level: lessonId,
    wpm,
    accuracy,
    duration,
  };

  const updated: UserProgress = {
    ...current,
    completedLessons: completed,
    bestWpmByLanguage: updatedBest,
    totalTimeTrainedSeconds: current.totalTimeTrainedSeconds + duration,
    testsTaken: current.testsTaken + 1,
    recentResults: [newResult, ...current.recentResults].slice(0, 20),
  };

  saveUserProgress(updated);
  return updated;
}
