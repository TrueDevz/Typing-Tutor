import React, { useState, useEffect } from 'react';
import { Minus, Square, Copy, X, Keyboard, ShieldCheck, WifiOff } from 'lucide-react';

interface WindowTitleBarProps {
  appName?: string;
  currentLanguageName?: string;
}

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
  appName = 'InScript Indic Typing Tutor',
  currentLanguageName,
}) => {
  const [isTauri, setIsTauri] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Check if running inside Tauri desktop environment
    if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
      setIsTauri(true);
    }
  }, []);

  const handleMinimize = async () => {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().minimize();
    } catch (err) {
      console.warn('Minimize not supported in web browser', err);
    }
  };

  const handleToggleMaximize = async () => {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const win = getCurrentWindow();
      await win.toggleMaximize();
      const max = await win.isMaximized();
      setIsMaximized(max);
    } catch (err) {
      console.warn('Maximize not supported in web browser', err);
    }
  };

  const handleClose = async () => {
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().close();
    } catch (err) {
      console.warn('Close not supported in web browser', err);
    }
  };

  return (
    <div 
      data-tauri-drag-region
      className="w-full h-8 bg-slate-950/95 border-b border-slate-800/80 select-none flex items-center justify-between px-3 text-xs text-slate-400 z-50 backdrop-blur-md sticky top-0"
    >
      {/* Left: Native App Icon + Title */}
      <div className="flex items-center gap-2 pointer-events-none">
        <div className="w-4 h-4 rounded bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
          <Keyboard className="w-2.5 h-2.5" />
        </div>
        <span className="font-semibold text-slate-300 text-[11px] tracking-tight">
          {appName}
        </span>
        {currentLanguageName && (
          <span className="text-[10px] text-slate-500 font-medium">
            — {currentLanguageName}
          </span>
        )}
      </div>

      {/* Center: Offline Desktop Status Badge */}
      <div className="hidden sm:flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-medium text-emerald-400">
          <WifiOff className="w-2.5 h-2.5" />
          <span>Offline Ready</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-medium text-indigo-400">
          <ShieldCheck className="w-2.5 h-2.5" />
          <span>Local Storage</span>
        </span>
      </div>

      {/* Right: Windows-style Window Controls or Web Pill */}
      {isTauri ? (
        <div className="flex items-center h-full -mr-3">
          <button
            onClick={handleMinimize}
            className="h-full px-3.5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={handleToggleMaximize}
            className="h-full px-3.5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            title={isMaximized ? 'Restore Down' : 'Maximize'}
          >
            {isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-2.5 h-2.5" />}
          </button>
          <button
            onClick={handleClose}
            className="h-full px-3.5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-600 transition cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800/60">
            Native App Mode
          </span>
        </div>
      )}
    </div>
  );
};
