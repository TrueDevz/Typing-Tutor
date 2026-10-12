export type SupportedLanguage = 
  | 'english'
  | 'hindi'
  | 'telugu'
  | 'tamil'
  | 'kannada'
  | 'bengali'
  | 'marathi'
  | 'gujarati'
  | 'malayalam'
  | 'punjabi'
  | 'odia';

export type InputMode = 'inscript' | 'phonetic';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'custom' | 'speedtest';

export interface FingerAssignment {
  finger: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
  hand: 'left' | 'right';
  label: string;
  color: string;
}

export interface KeyMapItem {
  code: string;           // e.g. "KeyF"
  normal: string;         // e.g. "f" or "ि"
  shifted?: string;       // e.g. "F" or "थ"
  altGr?: string;
  finger: FingerAssignment['finger'];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: DifficultyLevel;
  language: SupportedLanguage;
  targetKeys?: string[];
  content: string;
  instructions?: string;
}

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsedSeconds: number;
  backspaceCount: number;
  charTimes: { char: string; timeMs: number }[];
}

export type SoundTheme = 'cherry' | 'thock' | 'typewriter' | 'bubble' | 'simple' | 'silent';

export type AppTheme = 'slate' | 'cyberpunk' | 'matrix' | 'light';

export interface UserProgress {
  completedLessons: string[]; // lesson IDs
  bestWpmByLanguage: Record<SupportedLanguage, number>;
  totalTimeTrainedSeconds: number;
  testsTaken: number;
  mistypedChars?: Record<string, number>;
  recentResults: {
    id: string;
    date: string;
    language: SupportedLanguage;
    level: string;
    wpm: number;
    accuracy: number;
    duration: number;
  }[];
}
