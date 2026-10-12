import type { SupportedLanguage } from '../types';


export interface LanguageMeta {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
  sampleText: string;
  fontFamily?: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    sampleText: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    sampleText: 'सफलता का रहस्य निरंतर प्रयास और लगन में निहित है।',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    sampleText: 'నిరంతర సాధనతో ఎంతటి కష్టమైన పనినైనా సులభంగా సాధించవచ్చు.',
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    sampleText: 'முயற்சி உடையார் இகழ்ச்சி அடையார் என்பது ஆன்றோர் வாக்கு.',
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    sampleText: 'ನಿರಂತರ ಪರಿಶ್ರಮ ಮತ್ತು ಏಕಾಗ್ರತೆ ಯಶಸ್ಸಿನ ಹೆಬ್ಬಾಗಿಲು.',
  },
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    sampleText: 'পরিশ্রম এবং ধৈর্য মানুষের সাফল্যের আসল চাবিকাঠি।',
  },
  {
    id: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    sampleText: 'सतत सराव आणि आत्मविश्वासाने कोणत्याही ध्येयावर मात करता येते.',
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    sampleText: 'સતત પરિશ્રમ અને ધૈર્યથી દરેક મુશ્કેલ કાર્ય સરળ બને છે.',
  },
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    sampleText: 'നിരന്തര പരിശ്രമവും ആത്മവിശ്വാസവുമാണ് വിജയത്തിന് ആധാരം.',
  },
  {
    id: 'punjabi',
    name: 'Punjabi (Gurmukhi)',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    sampleText: 'ਲਗਾਤਾਰ ਮਿਹਨਤ ਅਤੇ ਲਗਨ ਨਾਲ ਹਰ ਮੁਸ਼ਕਲ ਆਸਾਨ ਹੋ ਜਾਂਦੀ ਹੈ।',
  },
  {
    id: 'odia',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    sampleText: 'କଠିନ ପରିଶ୍ରମ ଓ ଧୈର୍ଯ୍ୟ ଦ୍ୱାରା ପ୍ରତ୍ୟେକ ଲକ୍ଷ୍ୟ ହାସଲ ହୁଏ।',
  },
];
