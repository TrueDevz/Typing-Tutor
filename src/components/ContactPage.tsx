import { useState } from 'react';
import { 
  Mail, MessageSquare, Send, CheckCircle2, HelpCircle, 
  ChevronDown, ChevronUp, Code2, Clock, ShieldCheck 
} from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How do I enable the InScript keyboard layout on Windows 11 or Windows 10?',
    answer: 'Go to Windows Settings > Time & Language > Language & Region. Click "Add a language" and choose your desired language (e.g. Telugu, Hindi, Tamil). Once installed, click Language Options > Keyboards > Add a keyboard > select "InScript (Indian Script)". You can quickly toggle between English and InScript anytime using Windows Key + Spacebar.',
  },
  {
    question: 'How do I type conjunct consonants (ఒత్తులు / संयुक्ताक्षर / കൂട്ടക്ഷരങ്ങൾ) in InScript?',
    answer: 'In all InScript layouts, the Virama / Halant is assigned to the "D" key. To type a conjunct, simply type: First Consonant + D (Halant) + Second Consonant. For example, in Telugu: క్క = K + D + K. In Hindi: क्त = K + D + L. In Tamil: க்க = K + D + K. This uniform logic works across all Indic scripts.',
  },
  {
    question: 'Is my typing data, speed, or text uploaded to any server?',
    answer: 'No, absolutely not. InScript Indic Typing Tutor is engineered as a 100% client-side offline-first application. All stats, mistyped keys, and high scores are stored locally in your browser\'s secure LocalStorage sandbox. No keystroke logging or network telemetry is ever transmitted.',
  },
  {
    question: 'Can I use this tutor to prepare for Government Typing Exams (SSC, APPSC, TSPSC, High Court)?',
    answer: 'Yes! Official government typing recruitment tests require candidates to type using the standardized InScript keyboard layout at 30 WPM (Telugu/Regional) or 40 WPM (English). Our "Govt Typing Exam" passage and Timed Test modes are tailored specifically to match these recruitment criteria.',
  },
  {
    question: 'Is this application completely free and open-source?',
    answer: 'Yes. InScript Indic Typing Tutor is an open-source initiative built by TrueDevz under the permissive MIT License. There are no subscriptions, ads, or paywalls.',
  },
  {
    question: 'Does this platform support phonetic (transliteration) typing as well?',
    answer: 'Yes! While InScript is the government standard, we also include an integrated Phonetic Typing mode where you can type roman letters (e.g. "namaste") and view corresponding Indic syllables.',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    // Simulate instant local dispatch
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        category: 'General Inquiry',
        subject: '',
        message: '',
      });
    }, 500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 py-4 animate-fade-in text-slate-200">
      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider w-fit">
          <MessageSquare className="w-3.5 h-3.5" /> 24/7 Community & Developer Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Get in Touch & Feedback
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Have a suggestion for a new Indic script lesson, found a layout mapping issue, or need guidance preparing for state typing exams? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information & Channels */}
        <div className="flex flex-col gap-5">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              Direct Communication
            </h2>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                <Mail className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Project Email</div>
                  <div className="text-slate-400 select-all">truedevz.official@gmail.com</div>
                </div>
              </div>

              <a
                href="https://github.com/TrueDevz/Typing-Tutor/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
              >
                <Code2 className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white">GitHub Issues</div>
                  <div className="text-slate-400">Submit bugs and pull requests</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Response Turnaround</div>
                  <div className="text-slate-400">Within 24 to 48 hours</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 flex flex-col gap-2 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-indigo-400" /> Open Source & Free
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We welcome contributions from typists, teachers, and developers across all Indian states. Help us add more regional language exercises!
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" />
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-center gap-3 animate-fade-in my-6">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Thank you for reaching out. Your feedback has been recorded and our team will follow up at your provided email if required.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-300">Inquiry Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Government Exam Passage">Government Exam Question</option>
                    <option value="Translation & Script Correction">Translation / Script Correction</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-slate-300">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your note"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-slate-300">Message / Details *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue, idea, or typing query in detail..."
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Feedback
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Common questions regarding InScript layout setup, conjunct typing, and government exams:
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-950/70 border border-slate-800 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
