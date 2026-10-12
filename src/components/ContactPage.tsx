import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  HelpCircle, 
  Bug, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const supportEmail = 'mbtatiparthi.me@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Build mailto link so user can immediately send via their default mail client
    const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(`[TypingTutor - ${category}] From ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`)}`;
    
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Do I need to install any software or Indian language pack on my PC?',
      a: 'No! Our typing tutor has a built-in virtual InScript transliteration engine. When you select an Indian language like Telugu or Hindi, standard QWERTY keystrokes are automatically mapped directly into the official InScript characters inside the browser.'
    },
    {
      q: 'Is this InScript layout suitable for Government typing tests?',
      a: 'Yes, 100%. The layout adheres strictly to the Bureau of Indian Standards (BIS) InScript standard, which is mandatory for exams like SSC CGL/CHSL, High Court Typist/Stenographer, State PSCs (APPSC, TSPSC, UPPSC, etc.), and Railway recruitment.'
    },
    {
      q: 'Can I practice typing my own essays or custom paragraphs?',
      a: 'Yes! Use the "Custom Text" button in the top navigation bar to paste any text or article in your preferred language and practice typing it with real-time WPM analytics.'
    },
    {
      q: 'Is my typing data or custom text stored on a remote server?',
      a: 'No. The entire application runs 100% locally in your web browser. Your typing speeds, accuracy records, and custom lessons are stored only in your browser local storage.'
    },
    {
      q: 'How can I request support for a new dialect, font, or curriculum?',
      a: 'You can submit feedback using the form above or open an issue directly on our GitHub repository. We actively welcome contributions and community feedback!'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 py-4 animate-fade-in text-slate-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-3">
          <MessageSquare className="w-3.5 h-3.5" /> Support & Community
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Get in Touch & Feedback
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Have an idea for a feature, found a bug, or need help with InScript touch typing? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" /> Send a Message
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Fill in the details below to email our developer team directly.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Thank You for Your Feedback!</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Your email draft has been generated. If your email client did not open automatically, you can send an email directly to <strong className="text-white">{supportEmail}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder-slate-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder-slate-600 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Topic / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-white transition cursor-pointer"
                >
                  <option value="Feedback">General Feedback / Appreciation</option>
                  <option value="Feature Request">Feature Request / Enhancement</option>
                  <option value="Bug Report">Bug Report / Layout Issue</option>
                  <option value="New Language Request">Request New Language / Script</option>
                  <option value="Exam Preparation">Government Exam Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or issues..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:outline-none text-sm text-white placeholder-slate-600 transition resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Quick Contact Cards */}
        <div className="flex flex-col gap-4">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" /> Direct Developer Email
            </h3>
            <p className="text-xs text-slate-400">
              Feel free to shoot an email directly anytime for collaborations or feedback.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 mt-1">
              <span className="text-xs font-mono text-indigo-300 truncate">{supportEmail}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copiedEmail && (
              <span className="text-[11px] text-emerald-400 font-medium">✓ Email copied to clipboard!</span>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <svg className="w-4 h-4 fill-current text-purple-400" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Open Source on GitHub
            </h3>
            <p className="text-xs text-slate-400">
              The project is 100% open source under the MIT License. You can star the repo, inspect code, or report issues directly on GitHub.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="https://github.com/TrueDevz/Typing-Tutor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <a
                href="https://github.com/TrueDevz/Typing-Tutor/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs font-semibold text-rose-400 hover:text-rose-300 transition"
              >
                <span className="flex items-center gap-1.5">
                  <Bug className="w-3.5 h-3.5" /> Report an Issue
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 mt-2">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">Help & Knowledge Base</span>
          <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" /> Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
              <h4 className="font-bold text-white text-sm">{faq.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
