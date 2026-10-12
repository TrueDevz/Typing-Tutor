import { 
  Keyboard, Cpu, Globe2, Award, 
  Sparkles, CheckCircle2, HeartHandshake, Code2 
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface AboutPageProps {
  onStartPracticing: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartPracticing }) => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 py-4 animate-fade-in text-slate-200">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5" /> Empowering Indic Computing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            About InScript Indic Typing Tutor
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The modern, interactive touch-typing platform engineered specifically for Indian language scripts 
            and English. Built according to official Government of India InScript standards, designed for government exam aspirants, translators, journalists, students, and bilingual typists.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartPracticing}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-2"
            >
              <Keyboard className="w-4 h-4" /> Start Typing Practice
            </button>
            <a
              href="https://github.com/TrueDevz/Typing-Tutor"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm transition flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-indigo-400" /> View on GitHub
            </a>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Core Mission & Why InScript */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
            <Globe2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            India has 22 officially recognized languages spoken by over 1.4 billion people. Despite rich literary heritage, typing in regional scripts has historically lacked standardized, intuitive training software. 
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Our mission is to democratize high-speed touch typing for Indian languages through phonetic intuition, biomechanical visual aids, and standardized government layouts—enabling anyone to type at 50+ WPM in their mother tongue with zero barrier to entry.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4 shadow-xl">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">The InScript Advantage</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            InScript (Indian Script) was designed by the <strong>Centre for Development of Advanced Computing (C-DAC)</strong> and endorsed by the <strong>Bureau of Indian Standards (BIS)</strong>. 
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unlike legacy Remington typewriter layouts that differ drastically between each language, InScript shares a uniform logical structure: left hand handles vowels & matras, right hand handles consonants across Devanagari, Telugu, Tamil, Bengali, Kannada, and more. Master one, and you can type across any Indian script!
          </p>
        </div>
      </div>

      {/* Key Architectural Highlights */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Built With Cutting-Edge Web Standards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Client-Side Privacy
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every keystroke, test result, and error record is evaluated and saved entirely inside your browser's local sandbox. No typing data or keystrokes ever leave your computer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Biomechanical Finger Feedback
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time SVG hands guide and color-coded key mapping guide your fingers to the proper physical home row positions, eliminating hunt-and-peck typing habits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real Web Audio Synthesizer
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Realistic physical keyboard auditory feedback with Cherry MX Blue, Mechanical Thock, and Vintage Typewriter switch acoustic profiles synthesized purely via Web Audio API.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Government Exam Simulator
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official 30-word and 40-word per minute exam benchmark tests matching APPSC, TSPSC, SSC CGL/CHSL, Railway RRB, and State High Court typing formats.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Weak Keys Heatmap AI
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuous per-character error frequency analysis pinpoints your problematic conjuncts and offers one-click targeted recovery drills.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> High-DPI Certificate Generator
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Canvas-generated official typing speed certification card with rank tier seals, ready for download in 1600x1000 PNG format for resumes and portfolios.
            </p>
          </div>
        </div>
      </div>

      {/* Languages Supported Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-5 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-400" />
            11+ Supported Indian Languages
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Engineered with complete Unicode character sets, matras, halants, and conjuncts:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <div
              key={lang.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col"
            >
              <div className="text-xs font-bold text-white">{lang.name}</div>
              <div className="text-base font-black text-indigo-400 mt-0.5">{lang.nativeName}</div>
              <div className="text-[10px] text-slate-500 mt-1">{lang.script} Script</div>
            </div>
          ))}
        </div>
      </div>

      {/* TrueDevz Team Credit */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Built by TrueDevz</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Dedicated to open-source software and digital linguistic empowerment in India.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/TrueDevz/Typing-Tutor"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition whitespace-nowrap cursor-pointer"
        >
          Star & Contribute on GitHub ★
        </a>
      </div>
    </div>
  );
};
