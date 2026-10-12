import { Keyboard, Code2, Shield, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'arena' | 'curriculum' | 'game' | 'tutorial' | 'stats' | 'help' | 'about' | 'contact' | 'legal') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950/90 backdrop-blur-md mt-auto text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Overview */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Keyboard className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">InScript Indic Tutor</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The premier open-source touch typing platform for 11+ Indian languages and English. Designed to Government of India InScript standards.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for Indian typists</span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Practice & Games</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('arena')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Practice Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('curriculum')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Curriculum & Lessons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tutorial')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Finger Biomechanics Tutorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('game')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Typing Games Arcade (3 Games)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stats')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Performance & Weak Keys
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Support */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Company & Info</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left font-medium"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left font-medium"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  InScript Keyboard Guide
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/TrueDevz/Typing-Tutor"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Privacy Policy (Zero Logging)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  BIS IS 1408:2000 Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('legal')}
                  className="hover:text-indigo-400 transition cursor-pointer text-left"
                >
                  MIT Open Source License
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} InScript Indic Typing Tutor. Maintained by{' '}
            <a
              href="https://github.com/TrueDevz"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-400 font-semibold"
            >
              TrueDevz
            </a>
            . All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400/80">
              <Shield className="w-3 h-3" /> 100% Client-Side Private
            </span>
            <span>•</span>
            <span>InScript Layout Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
