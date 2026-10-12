import React, { useState } from 'react';
import { Shield, FileText, Scale, Lock } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'licenses';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const [activeLegalTab, setActiveLegalTab] = useState<'privacy' | 'terms' | 'licenses'>(initialTab);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-4 animate-fade-in text-slate-200">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <Scale className="w-8 h-8 text-indigo-400" /> Legal & Transparency
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          We believe in total transparency, 100% client-side privacy, and commitment to the open-source community.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveLegalTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeLegalTab === 'privacy'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
          }`}
        >
          <Shield className="w-4 h-4" /> Privacy Policy
        </button>

        <button
          onClick={() => setActiveLegalTab('terms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeLegalTab === 'terms'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
          }`}
        >
          <FileText className="w-4 h-4" /> Terms of Service
        </button>

        <button
          onClick={() => setActiveLegalTab('licenses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeLegalTab === 'licenses'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white bg-slate-900/60 border border-transparent'
          }`}
        >
          <Scale className="w-4 h-4" /> Licenses & Attributions
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 text-sm text-slate-300 leading-relaxed">
        {/* --- PRIVACY POLICY --- */}
        {activeLegalTab === 'privacy' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" /> Privacy Policy
                </h2>
                <span className="text-[11px] text-slate-500">Effective Date: October 2026</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 100% Client-Side Private
              </span>
            </div>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">1. Core Privacy Philosophy</h3>
              <p>
                InScript Indic Typing Tutor is engineered with a strict <strong>Zero-Tracking Architecture</strong>. We do not maintain any backend user tracking databases, remote logging services, or analytics trackers. Everything you do on this web application runs exclusively inside your own browser window.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">2. Data We Store Locally</h3>
              <p>
                To provide you with a persistent learning experience, the application uses your browser's standard <code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 text-xs">localStorage</code> mechanism. The stored keys include:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400 pl-2">
                <li><strong className="text-slate-200">typing_tutor_progress:</strong> Records your completed lesson IDs, highest words per minute (WPM), accuracy percentages, and total time practiced.</li>
                <li><strong className="text-slate-200">typing_tutor_records:</strong> Your personal best records per language.</li>
              </ul>
              <p className="text-xs text-slate-400">
                This data is stored purely on your personal device and is never transmitted over the internet to any external server. You can erase all data at any time by clearing your browser cache and cookies.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">3. Zero Keystroke Logging</h3>
              <p>
                We do not log, record, or transmit any keystrokes you make during practice tests or custom text sessions. Keystrokes are converted dynamically in memory into the selected InScript character and discarded upon session completion.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">4. Audio & Microphone Permissions</h3>
              <p>
                The mechanical click and error sounds in this application are generated dynamically using the browser's native <strong>Web Audio API synthesizer (OscillatorNode)</strong>. No microphone access, sound recording, or system audio permissions are ever requested or used.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">5. Third-Party CDNs & Fonts</h3>
              <p>
                To render Indian language scripts with crisp, authentic typography, the application requests font files directly from Google Fonts (<code className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 text-xs">fonts.googleapis.com</code>). Google Fonts may log standard network requests according to Google's public Privacy Policy.
              </p>
            </section>
          </div>
        )}

        {/* --- TERMS OF SERVICE --- */}
        {activeLegalTab === 'terms' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" /> Terms of Service
                </h2>
                <span className="text-[11px] text-slate-500">Effective Date: October 2026</span>
              </div>
            </div>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">1. Educational & Training Purpose</h3>
              <p>
                InScript Indic Typing Tutor is provided completely free of charge as an open-source educational utility intended to assist users in learning and improving touch typing speed in Indian languages and English.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">2. Open Source License (MIT)</h3>
              <p>
                The source code of this software is licensed under the permissible <strong>MIT License</strong>. You are free to view, study, modify, and distribute the software in compliance with the terms of the MIT license.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">3. User Conduct</h3>
              <p>
                When utilizing the Custom Text Practice feature, you are solely responsible for the content you paste into your local browser session. The application operates client-side and does not censor, moderate, or store your text.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-white">4. Disclaimer of Warranty</h3>
              <p className="text-xs text-slate-400 uppercase leading-relaxed font-mono">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.
              </p>
            </section>
          </div>
        )}

        {/* --- LICENSES & ATTRIBUTIONS --- */}
        {activeLegalTab === 'licenses' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-purple-400" /> Licenses & Attributions
                </h2>
                <span className="text-[11px] text-slate-500">Open-Source Acknowledgments</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-1">Bureau of Indian Standards (InScript Layout)</h4>
                <p className="text-xs text-slate-400">
                  The InScript keyboard layouts implemented in this software are based on the standard Indian Script layout designed by the Department of Electronics (DoE), Ministry of Electronics and Information Technology (MeitY), and published under Bureau of Indian Standards standard <strong>IS 16350:2016</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-1">Google Fonts Typography</h4>
                <p className="text-xs text-slate-400">
                  This application utilizes <em>Anek Telugu</em>, <em>Noto Sans Devanagari</em>, <em>Noto Sans Tamil</em>, <em>Noto Sans Kannada</em>, <em>Noto Sans Bengali</em>, <em>Noto Sans Gujarati</em>, <em>Noto Sans Gurmukhi</em>, <em>Noto Sans Malayalam</em>, and <em>Noto Sans Oriya</em> fonts, licensed under the <strong>SIL Open Font License, Version 1.1</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <h4 className="font-bold text-white text-sm mb-1">Open Source Libraries</h4>
                <p className="text-xs text-slate-400">
                  We express gratitude to the authors of:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-400 mt-1 pl-2 space-y-1">
                  <li><strong>React 19 & React DOM:</strong> MIT License</li>
                  <li><strong>Tailwind CSS v4:</strong> MIT License</li>
                  <li><strong>Vite:</strong> MIT License</li>
                  <li><strong>Lucide React:</strong> ISC License</li>
                  <li><strong>Canvas Confetti:</strong> MIT License</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
