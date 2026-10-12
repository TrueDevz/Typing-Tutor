import { useState } from 'react';
import { Shield, FileText, Scale, Lock } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const [activeLegalTab, setActiveLegalTab] = useState<'privacy' | 'terms' | 'license'>('privacy');

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 py-4 animate-fade-in text-slate-200">
      {/* Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider w-fit">
          <Scale className="w-3.5 h-3.5" /> Legal, Privacy & Compliance Documentation
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Legal & Privacy Policies
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Transparent, open, and privacy-respecting standards. Last updated: October 2026.
        </p>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80 mt-2">
          <button
            onClick={() => setActiveLegalTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeLegalTab === 'privacy'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Privacy Policy
          </button>

          <button
            onClick={() => setActiveLegalTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeLegalTab === 'terms'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Terms of Service
          </button>

          <button
            onClick={() => setActiveLegalTab('license')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeLegalTab === 'license'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Open Source & BIS Attribution
          </button>
        </div>
      </div>

      {/* PRIVACY POLICY */}
      {activeLegalTab === 'privacy' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 shadow-xl leading-relaxed text-sm text-slate-300">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Lock className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
              <span className="text-xs text-slate-500">Effective Date: October 12, 2026</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
            🛡️ <strong>Zero Data Collection Policy:</strong> We do NOT log, store, or transmit your keystrokes, personal identity, or typing performance to any external server. 100% of calculation is executed client-side inside your browser sandbox.
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">1. Scope and Architecture</h3>
            <p className="text-xs text-slate-400">
              InScript Indic Typing Tutor is engineered as an offline-first Single Page Application (SPA). Unlike web applications that record user inputs on cloud backends, our architecture processes character mapping, WPM benchmarks, and accuracy metrics exclusively in your client-side JavaScript runtime.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">2. Keystroke Privacy Guarantee</h3>
            <p className="text-xs text-slate-400">
              We explicitly declare that no keylogger, telemetry tracker, or session recording tools (such as Hotjar or FullStory) are embedded in this application. Your typing practice paragraphs, mistakes, and custom text inputs remain solely in volatile memory or local browser storage.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">3. Local Storage Utilization</h3>
            <p className="text-xs text-slate-400">
              To deliver persistent progress tracking, the application saves the following data in your browser's HTML5 LocalStorage under the key <code>indian_typing_tutor_progress_v1</code>:
            </p>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 ml-2">
              <li>List of completed lesson IDs</li>
              <li>Peak WPM records by language</li>
              <li>Aggregate practice duration and total tests taken</li>
              <li>Aggregated error frequency counters for weak key identification</li>
              <li>Recent session log timestamps and scores</li>
            </ul>
            <p className="text-xs text-slate-400">
              This data never departs your device. You can purge or export it anytime using the "Reset" or "Export JSON" utilities in the Analytics dashboard.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">4. Cookies and Third-Party Trackers</h3>
            <p className="text-xs text-slate-400">
              We do not employ HTTP tracking cookies, advertising beacons, canvas fingerprinting, or third-party marketing SDKs.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">5. Compliance with DPDP Act 2023 & GDPR</h3>
            <p className="text-xs text-slate-400">
              In adherence to India's Digital Personal Data Protection (DPDP) Act 2023 and the General Data Protection Regulation (GDPR), the application respects the fundamental principle of data minimization by collecting zero personally identifiable data (PII).
            </p>
          </section>
        </div>
      )}

      {/* TERMS OF SERVICE */}
      {activeLegalTab === 'terms' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 shadow-xl leading-relaxed text-sm text-slate-300">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <FileText className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Terms of Service</h2>
              <span className="text-xs text-slate-500">Effective Date: October 12, 2026</span>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">1. Acceptance of Terms</h3>
            <p className="text-xs text-slate-400">
              By accessing and utilizing InScript Indic Typing Tutor, you acknowledge and agree to abide by these Terms of Service. If you disagree with any portion of these conditions, you may cease usage of the application.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">2. Permitted Use</h3>
            <p className="text-xs text-slate-400">
              This platform is granted freely for personal educational use, institutional typing training, educational test preparation, and skill advancement. You are permitted to use this platform in schools, computer coaching centers, and government training institutes free of charge.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">3. Educational & Certification Disclaimer</h3>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              ⚠️ <strong>Disclaimer Regarding Official Examination Boards:</strong> While our training passages, WPM calculations, and InScript layouts follow official standards, the certificates generated on this platform are for personal practice benchmarks and portfolio demonstration. They do not constitute official statutory certificates issued by any government public service commission unless officially accredited.
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">4. Intellectual Property & Open Source</h3>
            <p className="text-xs text-slate-400">
              The application source code is maintained by TrueDevz under the open-source MIT License. You are permitted to inspect, fork, modify, and contribute to the repository in compliance with the license provisions.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white">5. Limitation of Liability</h3>
            <p className="text-xs text-slate-400">
              The service is provided on an "as is" and "as available" basis without warranties of any kind. TrueDevz shall not be liable for any incidental, indirect, or consequential damages resulting from the use or inability to use the platform.
            </p>
          </section>
        </div>
      )}

      {/* OPEN SOURCE & BIS ATTRIBUTION */}
      {activeLegalTab === 'license' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 shadow-xl leading-relaxed text-sm text-slate-300">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Scale className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Open Source License & Standards Attribution</h2>
              <span className="text-xs text-slate-500">MIT License & Bureau of Indian Standards (BIS)</span>
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white">Government of India Standard Attribution</h3>
            <p className="text-xs text-slate-400">
              The keyboard layouts integrated into this software adhere to the official Indian Script (InScript) standard designed by the <strong>Centre for Development of Advanced Computing (C-DAC)</strong> and standardized by the <strong>Bureau of Indian Standards (BIS, IS 1408:2000)</strong> under the Ministry of Electronics and Information Technology (MeitY).
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
              All scripts (Devanagari, Telugu, Tamil, Kannada, Malayalam, Bengali, Gujarati, Gurmukhi, Odia) are aligned with Unicode Consortium standards.
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white">The MIT License (MIT)</h3>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 leading-relaxed overflow-x-auto">
              <p className="text-white font-bold mb-2">Copyright (c) 2026 TrueDevz (https://github.com/TrueDevz)</p>
              <p className="mb-2">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              <p className="mb-2">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
