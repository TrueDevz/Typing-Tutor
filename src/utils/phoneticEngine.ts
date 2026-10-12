import type { SupportedLanguage } from '../types';

/**
 * Phonetic Transliteration mappings for Indian languages.
 * Maps English combinations to Indic Unicode characters.
 */

// Telugu Phonetic Map
const TELUGU_MAP: Record<string, string> = {
  // Vowels
  'a': 'అ', 'aa': 'ఆ', 'A': 'ఆ',
  'i': 'ఇ', 'ee': 'ఈ', 'I': 'ఈ',
  'u': 'ఉ', 'oo': 'ఊ', 'U': 'ఊ',
  'e': 'ఎ', 'E': 'ఏ', 'ea': 'ఏ',
  'ai': 'ఐ',
  'o': 'ఒ', 'O': 'ఓ', 'oa': 'ఓ',
  'au': 'ఔ', 'ou': 'ఔ',
  'am': 'అం', 'ah': 'అః',

  // Consonants
  'k': 'క', 'kh': 'ఖ', 'K': 'ఖ',
  'g': 'గ', 'gh': 'ఘ', 'G': 'ఘ',
  'ch': 'చ', 'Ch': 'ఛ',
  'j': 'జ', 'jh': 'ఝ', 'J': 'ఝ',
  'T': 'ట', 'Th': 'ఠ',
  'D': 'డ', 'Dh': 'ఢ',
  'N': 'ణ',
  't': 'త', 'th': 'థ',
  'd': 'ద', 'dh': 'ధ',
  'n': 'న',
  'p': 'ప', 'ph': 'ఫ', 'f': 'ఫ', 'P': 'ఫ',
  'b': 'బ', 'bh': 'భ', 'B': 'భ',
  'm': 'మ',
  'y': 'య', 'r': 'ర', 'l': 'ల', 'v': 'వ', 'w': 'వ',
  'sh': 'శ', 'S': 'ష', 'Sh': 'ష',
  's': 'స', 'h': 'హ', 'L': 'ళ', 'ksh': 'క్ష', 'tra': 'త్ర',

  // Matras / Guninthalu
  '_aa': 'ా', '_i': 'ి', '_ee': 'ీ', '_u': 'ు', '_oo': 'ూ',
  '_e': 'ె', '_E': 'ే', '_ai': 'ై', '_o': 'ొ', '_O': 'ో',
  '_au': 'ౌ', '_m': 'ం', '_h': 'ః', '_virama': '్',
};

// Hindi Devanagari Phonetic Map
const HINDI_MAP: Record<string, string> = {
  'a': 'अ', 'aa': 'आ', 'A': 'आ',
  'i': 'इ', 'ee': 'ई', 'I': 'ई',
  'u': 'उ', 'oo': 'ऊ', 'U': 'ऊ',
  'e': 'ए', 'ai': 'ऐ',
  'o': 'ओ', 'au': 'औ', 'ou': 'औ',
  'am': 'अं', 'ah': 'अः',

  'k': 'क', 'kh': 'ख', 'K': 'ख',
  'g': 'ग', 'gh': 'घ',
  'ch': 'च', 'Ch': 'छ',
  'j': 'ज', 'jh': 'झ',
  'T': 'ट', 'Th': 'ठ',
  'D': 'ड', 'Dh': 'ढ',
  'N': 'ण',
  't': 'त', 'th': 'थ',
  'd': 'द', 'dh': 'ध',
  'n': 'न',
  'p': 'प', 'ph': 'फ', 'f': 'फ',
  'b': 'ब', 'bh': 'भ',
  'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
  'sh': 'श', 'Sh': 'ष', 's': 'स', 'h': 'ह',
  'ksh': 'क्ष', 'gy': 'ज्ञ',
};

// Tamil Phonetic Map
const TAMIL_MAP: Record<string, string> = {
  'a': 'அ', 'aa': 'ஆ', 'A': 'ஆ',
  'i': 'இ', 'ee': 'ஈ', 'I': 'ஈ',
  'u': 'உ', 'oo': 'ஊ', 'U': 'ஊ',
  'e': 'எ', 'E': 'ஏ',
  'ai': 'ஐ', 'o': 'ஒ', 'O': 'ஓ', 'au': 'ஔ',
  'k': 'க', 'g': 'க',
  'ng': 'ங',
  'ch': 'ச', 's': 'ச', 'j': 'ஜ',
  'ny': 'ஞ',
  't': 'ட', 'T': 'ட',
  'N': 'ண',
  'th': 'த', 'd': 'த',
  'n': 'ந',
  'p': 'ப', 'b': 'ப',
  'm': 'ம',
  'y': 'ய', 'r': 'ர', 'l': 'ல', 'v': 'வ',
  'zh': 'ழ', 'L': 'ள', 'R': 'ற', 'nn': 'ன',
};

// Kannada Phonetic Map
const KANNADA_MAP: Record<string, string> = {
  'a': 'ಅ', 'aa': 'ಆ', 'i': 'ಇ', 'ee': 'ಈ', 'u': 'ಉ', 'oo': 'ಊ',
  'e': 'ಎ', 'E': 'ಏ', 'ai': 'ಐ', 'o': 'ಒ', 'O': 'ಓ', 'au': 'ಔ',
  'k': 'ಕ', 'kh': 'ಖ', 'g': 'ಗ', 'gh': 'ಘ',
  'ch': 'ಚ', 'j': 'ಜ', 'T': 'ಟ', 'D': 'ಡ', 'N': 'ಣ',
  't': 'ತ', 'th': 'ಥ', 'd': 'ದ', 'dh': 'ಧ', 'n': 'ನ',
  'p': 'ಪ', 'ph': 'ಫ', 'b': 'ಬ', 'bh': 'ಭ', 'm': 'ಮ',
  'y': 'ಯ', 'r': 'ರ', 'l': 'ಲ', 'v': 'ವ', 's': 'ಸ', 'h': 'ಹ',
};

const MAPS_BY_LANG: Partial<Record<SupportedLanguage, Record<string, string>>> = {
  telugu: TELUGU_MAP,
  hindi: HINDI_MAP,
  tamil: TAMIL_MAP,
  kannada: KANNADA_MAP,
};

/**
 * Given an Indic character, returns the most common phonetic romanization (e.g. 'క' -> 'k' or 'ka').
 */
export function getPhoneticHintForChar(char: string, lang: SupportedLanguage): string | null {
  const map = MAPS_BY_LANG[lang];
  if (!map) return null;

  for (const [latin, indic] of Object.entries(map)) {
    if (indic === char) {
      return latin;
    }
  }
  return null;
}

/**
 * Simple greedy phonetic transliteration from Latin string to Indic script.
 */
export function transliteratePhonetic(input: string, lang: SupportedLanguage): string {
  const map = MAPS_BY_LANG[lang];
  if (!map) return input;

  let result = '';
  let i = 0;
  while (i < input.length) {
    // Try 3-char match, then 2-char, then 1-char
    const c3 = input.slice(i, i + 3);
    const c2 = input.slice(i, i + 2);
    const c1 = input.slice(i, i + 1);

    if (map[c3]) {
      result += map[c3];
      i += 3;
    } else if (map[c2]) {
      result += map[c2];
      i += 2;
    } else if (map[c1]) {
      result += map[c1];
      i += 1;
    } else {
      result += input[i];
      i += 1;
    }
  }
  return result;
}
