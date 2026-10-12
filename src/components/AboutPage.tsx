import React from 'react';
import { 
  Globe2, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/languages';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 py-4 animate-fade-in text-slate-200">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-purple-950/50 p-8 sm:p-12 border border-indigo-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Empowering Indic Typists Worldwide
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Master Touch Typing in Indian Languages & English
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            The free, open-source, government-standard InScript typing tutor built for students, government exam aspirants, writers, and digital professionals across India.
          </p>
        </div>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Globe2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Mission</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Despite over a billion speakers of Indian languages, typing in native scripts often remains slow, cumbersome, or reliant on third-party phonetic tools. Our goal is to popularize touch typing in official Indic scripts using the standardized <strong className="text-white">InScript</strong> keyboard layout, enabling everyone to type their mother tongue at 50+ WPM with pure muscle memory.
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Designed for Government Exams</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            InScript is the mandatory keyboard layout prescribed for national and state-level typing tests, including <strong className="text-white">SSC (CGL & CHSL), High Court Typist/Steno Exams, State PSCs (APPSC, TSPSC, UPPSC, BPSC, MPSC), Railways, and Postal Services</strong>. This tutor gives aspirants the exact real-time exam conditions and finger training required to qualify with flying colors.
          </p>
        </div>
      </div>

      {/* Why InScript Standard? */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col gap-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">Standardization</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Why the InScript Layout?</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-3xl">
            Created by the Ministry of Electronics and Information Technology (MeitY) and standardized by the Bureau of Indian Standards (BIS - IS 16350:2016), InScript shares a common phonetic foundation across all Brahmic-derived Indian scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <h3 className="font-bold text-indigo-300 text-sm mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400"></span> Left Hand: Vowels & Matras
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All independent vowels and matras (diacritics) are logically clustered on the left hand. Pressing a key yields the matra; Shift + key yields the primary vowel.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <h3 className="font-bold text-cyan-300 text-sm mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span> Right Hand: Consonants
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All consonants (Vyanjan/Hallu) are mapped systematically to the right hand according to their phonetic vargas (Ka-varga, Cha-varga, Ta-varga, etc.).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <h3 className="font-bold text-emerald-300 text-sm mb-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Learn One, Type All
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because the layout structure is uniform across languages, mastering InScript for Telugu or Hindi allows you to type Tamil, Kannada, or Bengali with zero re-learning!
            </p>
          </div>
        </div>
      </div>

      {/* Supported Languages Grid */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-400" />
            11 Supported Languages & Scripts
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official InScript layouts with customized curriculum, matras, and speed passages for each language.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <div 
              key={lang.id} 
              className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition flex flex-col justify-between"
            >
              <div>
                <span className="text-lg font-bold text-white block">{lang.nativeName}</span>
                <span className="text-xs text-slate-400">{lang.name}</span>
              </div>
              <span className="text-[10px] font-semibold text-indigo-400/80 uppercase mt-2">
                {lang.script}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Architectural Features */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" /> Key Technical Capabilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Direct On-the-Fly Keystroke Engine</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No need to install Windows/Mac language packs or configure external IMEs. The app maps standard hardware QWERTY keys directly into InScript unicode characters in real time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Interactive 2D Hands Guidance</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Anatomical SVG hand visuals highlight the exact finger (Pinky, Ring, Middle, Index, Thumb) for every keypress to build proper touch typing posture.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">Synthesizer Audio Feedback</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Zero audio latency using the native browser Web Audio API to create mechanical click and error cues without loading heavy sound files.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">100% Client-Side Privacy</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Everything executes locally in your browser. No keystroke trackers, no remote database logging, and your custom practice texts stay strictly on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
