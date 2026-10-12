import React, { useRef, useState, useEffect } from 'react';
import { Award, Download, Copy, Check, X, ShieldCheck, Sparkles } from 'lucide-react';
import type { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
  language: SupportedLanguage;
  duration: number;
  lessonTitle: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  wpm,
  accuracy,
  language,
  duration,
  lessonTitle,
}) => {
  const [candidateName, setCandidateName] = useState<string>('Touch Typist');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const langMeta = SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];

  const getRank = (speed: number) => {
    if (speed >= 70) return { title: 'Grandmaster Typist', color: '#f59e0b', stars: '★★★★★' };
    if (speed >= 50) return { title: 'Master Typist', color: '#8b5cf6', stars: '★★★★☆' };
    if (speed >= 35) return { title: 'Professional Typist', color: '#3b82f6', stars: '★★★☆☆' };
    if (speed >= 20) return { title: 'Intermediate Typist', color: '#10b981', stars: '★★☆☆☆' };
    return { title: 'Novice Typist', color: '#06b6d4', stars: '★☆☆☆☆' };
  };

  const rank = getRank(wpm);
  const formattedDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Render certificate on high-DPI canvas
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas (1600 x 1000)
    canvas.width = 1600;
    canvas.height = 1000;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1600, 1000);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1600, 1000);

    // Outer Decorative Border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1520, 920);

    // Inner Gold/Cyan Trim
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, 1490, 890);

    // Corner Ornaments
    const drawCorner = (x: number, y: number, rotate: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotate);
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 40);
      ctx.lineTo(0, 0);
      ctx.lineTo(40, 0);
      ctx.stroke();
      ctx.restore();
    };
    drawCorner(65, 65, 0);
    drawCorner(1535, 65, Math.PI / 2);
    drawCorner(1535, 935, Math.PI);
    drawCorner(65, 935, -Math.PI / 2);

    // Header Badge
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '4px';
    ctx.fillText('INSPECT & VALIDATED BY INSCRIPT INDIC TYPING STANDARDS', 800, 120);

    // Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px system-ui, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('CERTIFICATE OF TYPING PROFICIENCY', 800, 190);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px system-ui, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('This document certifies that the following candidate has demonstrated exceptional typing skills:', 800, 250);

    // Candidate Name
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 54px system-ui, sans-serif';
    ctx.fillText(candidateName.trim() || 'Candidate', 800, 335);

    // Underline for name
    const nameGrad = ctx.createLinearGradient(500, 355, 1100, 355);
    nameGrad.addColorStop(0, 'rgba(99, 102, 241, 0)');
    nameGrad.addColorStop(0.5, 'rgba(99, 102, 241, 1)');
    nameGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
    ctx.strokeStyle = nameGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(500, 355);
    ctx.lineTo(1100, 355);
    ctx.stroke();

    // Rank / Title
    ctx.fillStyle = rank.color;
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.fillText(`★ ${rank.title.toUpperCase()} (${rank.stars}) ★`, 800, 410);

    // Primary KPI Cards
    const drawKpiCard = (x: number, y: number, label: string, value: string, sub: string, color: string) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, 320, 150, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label.toUpperCase(), x + 160, y + 40);

      ctx.fillStyle = color;
      ctx.font = '900 52px system-ui, sans-serif';
      ctx.fillText(value, x + 160, y + 100);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText(sub, x + 160, y + 130);
    };

    drawKpiCard(260, 470, 'Speed Benchmark', `${wpm} WPM`, 'Net Words Per Minute', '#38bdf8');
    drawKpiCard(640, 470, 'Accuracy Score', `${accuracy}%`, 'Keystroke Precision', '#4ade80');
    drawKpiCard(1020, 470, 'Language & Script', langMeta.name, `${langMeta.nativeName} (${langMeta.script})`, '#c084fc');

    // Context description
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Passage: "${lessonTitle}" | Duration: ${duration}s`, 800, 680);

    // Official Seal (Bottom Left)
    ctx.save();
    ctx.translate(340, 810);
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI * 2);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 58, 0, Math.PI * 2);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('VERIFIED AUTHENTIC', 0, -20);
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('★ INSCRIPT ★', 0, 5);
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('GOVT STANDARD', 0, 26);
    ctx.restore();

    // Signatures & Metadata (Bottom Right)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#64748b';
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText(`Issue Date: ${formattedDate}`, 1400, 780);
    ctx.fillText(`Certificate ID: IND-TYP-${Date.now().toString(36).toUpperCase()}`, 1400, 810);

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(1150, 840);
    ctx.lineTo(1400, 840);
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.fillText('Verified Engine Certification', 1400, 865);
  };

  useEffect(() => {
    if (isOpen) {
      renderCanvas();
    }
  }, [isOpen, candidateName, wpm, accuracy, language]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `Typing-Certificate-${candidateName.replace(/\s+/g, '_')}-${wpm}WPM.png`;
    a.click();
  };

  const handleCopySummary = async () => {
    const text = `🏆 Typing Tutor Speed Certificate 🏆\n👤 Candidate: ${candidateName}\n⚡ Speed: ${wpm} WPM\n🎯 Accuracy: ${accuracy}%\n🌐 Language: ${langMeta.name} (${langMeta.nativeName})\n🏅 Rank: ${rank.title}\n📅 Date: ${formattedDate}\nVerified at InScript Indic Typing Tutor!`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Official Typing Certificate
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">Download and share your achievement card</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Name Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-300 min-w-[120px]">
            Candidate Name:
          </label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            maxLength={35}
          />
        </div>

        {/* Certificate Canvas Preview */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[420px] object-contain rounded-xl"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            High resolution (1600x1000) PNG
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Certificate (PNG)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
