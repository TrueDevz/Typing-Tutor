import type { UserProgress, SupportedLanguage } from '../types';
import { recordGlobalTestContribution } from './globalStats';


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
  totalKeystrokes: 0,
  totalCorrectKeystrokes: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  mistypedChars: {},
  recentResults: [],
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      totalKeystrokes: parsed.totalKeystrokes || 0,
      totalCorrectKeystrokes: parsed.totalCorrectKeystrokes || 0,
      streakDays: parsed.streakDays || 1,
      lastActiveDate: parsed.lastActiveDate || new Date().toISOString().slice(0, 10),
      mistypedChars: parsed.mistypedChars || {},
    };
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
  duration: number,
  sessionErrors?: Record<string, number>,
  keystrokeCounts?: { total: number; correct: number }
): UserProgress {
  const current = loadUserProgress();
  const completed = Array.from(new Set([...current.completedLessons, lessonId]));

  const bestWpm = Math.max(current.bestWpmByLanguage[lang] || 0, wpm);
  const updatedBest = { ...current.bestWpmByLanguage, [lang]: bestWpm };

  // Merge mistyped characters
  const updatedMistyped: Record<string, number> = { ...(current.mistypedChars || {}) };
  if (sessionErrors) {
    for (const [char, count] of Object.entries(sessionErrors)) {
      updatedMistyped[char] = (updatedMistyped[char] || 0) + count;
    }
  }

  // Calculate Streak
  const todayStr = new Date().toISOString().slice(0, 10);
  let streak = current.streakDays || 1;
  const lastActive = current.lastActiveDate;
  if (lastActive && lastActive !== todayStr) {
    const lastDate = new Date(lastActive);
    const todayDate = new Date(todayStr);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  const addedTotalKeys = keystrokeCounts ? keystrokeCounts.total : Math.round((wpm * 5 * duration) / 60);
  const addedCorrectKeys = keystrokeCounts ? keystrokeCounts.correct : Math.round(addedTotalKeys * (accuracy / 100));

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
    totalKeystrokes: (current.totalKeystrokes || 0) + addedTotalKeys,
    totalCorrectKeystrokes: (current.totalCorrectKeystrokes || 0) + addedCorrectKeys,
    streakDays: streak,
    lastActiveDate: todayStr,
    mistypedChars: updatedMistyped,
    recentResults: [newResult, ...current.recentResults].slice(0, 20),
  };

  saveUserProgress(updated);
  recordGlobalTestContribution(addedTotalKeys);
  return updated;
}

export function clearErrorHistory(): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    mistypedChars: {},
  };
  saveUserProgress(updated);
  return updated;
}

export function resetAllProgress(): UserProgress {
  saveUserProgress(DEFAULT_PROGRESS);
  return DEFAULT_PROGRESS;
}

export function exportProgressJson(): string {
  const progress = loadUserProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgressJson(jsonStr: string): UserProgress | null {
  try {
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const progress: UserProgress = {
      ...DEFAULT_PROGRESS,
      ...parsed,
      mistypedChars: parsed.mistypedChars || {},
    };
    saveUserProgress(progress);
    return progress;
  } catch (err) {
    console.error('Failed to import user progress:', err);
    return null;
  }
}
