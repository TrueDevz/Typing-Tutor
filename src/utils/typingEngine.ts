import type { SupportedLanguage } from '../types';

import { INSCRIPT_LAYOUTS } from '../data/layouts';

/**
 * Resolves which physical keyboard key (e.g. "KeyK") and shift state produces a given character
 * in the active language layout.
 */
export function findKeyForChar(
  char: string,
  lang: SupportedLanguage
): { code: string; needsShift: boolean } | null {
  const layout = INSCRIPT_LAYOUTS[lang] || INSCRIPT_LAYOUTS.english;

  for (const [code, keyDef] of Object.entries(layout)) {
    if (keyDef.normal === char) {
      return { code, needsShift: false };
    }
    if (keyDef.shift === char) {
      return { code, needsShift: true };
    }
  }

  // Fallback check in English layout
  for (const [code, keyDef] of Object.entries(INSCRIPT_LAYOUTS.english)) {
    if (keyDef.normal === char) {
      return { code, needsShift: false };
    }
    if (keyDef.shift === char) {
      return { code, needsShift: true };
    }
  }

  return null;
}

/**
 * Translates a physical keyboard event (e.g. KeyK + Shift) into the corresponding
 * Indian language character based on InScript mapping.
 */
export function getMappedCharFromEvent(
  code: string,
  shiftKey: boolean,
  lang: SupportedLanguage
): string | null {
  const layout = INSCRIPT_LAYOUTS[lang];
  if (!layout) return null;

  const keyDef = layout[code];
  if (!keyDef) return null;

  return shiftKey ? keyDef.shift : keyDef.normal;
}

/**
 * Calculates typing statistics accurately
 */
export function calculateStats(
  typed: string,
  target: string,
  timeElapsedSec: number,
  errorsCount: number
) {
  const timeInMinutes = Math.max(timeElapsedSec / 60, 0.01);
  const totalTyped = typed.length;

  let correctCount = 0;
  for (let i = 0; i < totalTyped; i++) {
    if (typed[i] === target[i]) {
      correctCount++;
    }
  }

  // Standard typing calculation: 1 word = 5 characters
  const rawWpm = Math.round(totalTyped / 5 / timeInMinutes);
  const netWpm = Math.max(0, Math.round(correctCount / 5 / timeInMinutes));
  const accuracy = totalTyped > 0 ? Math.max(0, Math.round((correctCount / totalTyped) * 100)) : 100;

  return {
    wpm: netWpm,
    rawWpm,
    accuracy,
    correctCount,
    totalTyped,
    errorsCount,
  };
}
