import React, { useState } from 'react';
import type { SupportedLanguage } from '../../types';
import { WordRainGame } from '../WordRainGame';
import { MeteorDefenseGame } from './MeteorDefenseGame';
import { SpeedRacerGame } from './SpeedRacerGame';
import { Gamepad2, CloudRain, Rocket, Flame, Sparkles } from 'lucide-react';

interface GamesHubProps {
  language: SupportedLanguage;
}

export const GamesHub: React.FC<GamesHubProps> = ({ language }) => {
  const [selectedGame, setSelectedGame] = useState<'rain' | 'meteor' | 'racer'>('rain');

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
      {/* Game Selection Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Typing Arcade Arena
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400">Play gamified speed challenges in Indian scripts & English</p>
          </div>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 gap-1.5">
          <button
            onClick={() => setSelectedGame('rain')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedGame === 'rain'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-4 h-4 text-cyan-400" /> Word Rain
          </button>

          <button
            onClick={() => setSelectedGame('meteor')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedGame === 'meteor'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4 text-purple-400" /> Meteor Defense
          </button>

          <button
            onClick={() => setSelectedGame('racer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedGame === 'racer'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" /> Nitro Racer
          </button>
        </div>
      </div>

      {/* Render Active Game */}
      {selectedGame === 'rain' && <WordRainGame language={language} />}
      {selectedGame === 'meteor' && <MeteorDefenseGame language={language} />}
      {selectedGame === 'racer' && <SpeedRacerGame language={language} />}
    </div>
  );
};
