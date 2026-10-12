import React, { useState } from 'react';
import type { SupportedLanguage } from '../types';

import { SUPPORTED_LANGUAGES } from '../data/languages';
import { Globe2, Search, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.id === currentLanguage);

  const filtered = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-100 transition shadow-sm cursor-pointer"
      >
        <Globe2 className="w-4 h-4 text-indigo-400" />
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold leading-tight">{activeLangMeta?.name}</span>
          <span className="text-[10px] text-indigo-400 leading-tight">{activeLangMeta?.nativeName}</span>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl">
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              <input
                type="text"
                placeholder="Search languages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto flex flex-col gap-1 pr-1">
              {filtered.map((lang) => {
                const isSelected = lang.id === currentLanguage;
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onSelectLanguage(lang.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl text-left text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/30 text-white font-semibold'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-100">{lang.name}</div>
                      <div className="text-[10px] text-slate-400">{lang.nativeName} ({lang.script})</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
