import React, { useState, useEffect } from 'react';
import type { SupportedLanguage } from '../types';
import { Play, Pause, RotateCcw, Video, CheckCircle2 } from 'lucide-react';

import { VirtualKeyboard } from './VirtualKeyboard';
import { HandsGuide } from './HandsGuide';
import { findKeyForChar } from '../utils/typingEngine';
import { KEYBOARD_ROWS } from '../data/layouts';

interface InteractiveTutorialProps {
  language: SupportedLanguage;
}

interface TutorialStep {
  title: string;
  description: string;
  charToType: string;
  fingerTip: string;
}

const TUTORIAL_CURRICULUM: Record<SupportedLanguage, TutorialStep[]> = {
  english: [
    { title: 'Left Index Home (F Key)', description: 'Place your left index finger on key F. Notice the tactile bump on modern keyboards.', charToType: 'f', fingerTip: 'Left Index' },
    { title: 'Right Index Home (J Key)', description: 'Place your right index finger on key J. Feel the tactile bump.', charToType: 'j', fingerTip: 'Right Index' },
    { title: 'Left Middle Home (D Key)', description: 'Rest your left middle finger directly on key D.', charToType: 'd', fingerTip: 'Left Middle' },
    { title: 'Right Middle Home (K Key)', description: 'Rest your right middle finger directly on key K.', charToType: 'k', fingerTip: 'Right Middle' },
    { title: 'Left Ring Home (S Key)', description: 'Rest your left ring finger on key S.', charToType: 's', fingerTip: 'Left Ring' },
    { title: 'Right Ring Home (L Key)', description: 'Rest your right ring finger on key L.', charToType: 'l', fingerTip: 'Right Ring' },
    { title: 'Left Pinky Home (A Key)', description: 'Rest your left pinky finger on key A.', charToType: 'a', fingerTip: 'Left Pinky' },
    { title: 'Right Pinky Home (; Key)', description: 'Rest your right pinky finger on the semicolon key (;).', charToType: ';', fingerTip: 'Right Pinky' },
    { title: 'Thumbs on Spacebar', description: 'Rest both thumbs gently over the bottom Space bar.', charToType: ' ', fingerTip: 'Thumbs' },
  ],
  telugu: [
    { title: 'ర (J కీ) - కుడి చూపుడు వేలు', description: 'కుడి చూపుడు వేలిని J కీ పై ఉంచి "ర" అక్షరాన్ని టైప్ చేయండి.', charToType: 'ర', fingerTip: 'Right Index' },
    { title: 'ప (H కీ) - కుడి చూపుడు వేలు సాగదీత', description: 'కుడి చూపుడు వేలిని ఎడమవైపు H కీ కి సాగదీసి "ప" టైప్ చేయండి.', charToType: 'ప', fingerTip: 'Right Index' },
    { title: 'క (K కీ) - కుడి మధ్య వేలు', description: 'కుడి చేతి మధ్య వేలితో K కీ పై నొక్కి "క" అక్షరాన్ని పొందండి.', charToType: 'క', fingerTip: 'Right Middle' },
    { title: 'త (L కీ) - కుడి ఉంగరపు వేలు', description: 'కుడి ఉంగరపు వేలితో L కీ ని సున్నితంగా నొక్కండి.', charToType: 'త', fingerTip: 'Right Ring' },
    { title: '్ (D కీ) - పొల్లు / హలంత్', description: 'ఎడమ చేతి మధ్య వేలితో D కీ నొక్కితే పొల్లు (్) వస్తుంది.', charToType: '్', fingerTip: 'Left Middle' },
    { title: 'ి (F కీ) - గుడి గుర్తు', description: 'ఎడమ చూపుడు వేలితో F కీ నొక్కి "ి" గుడి గుర్తు ఉంచండి.', charToType: 'ి', fingerTip: 'Left Index' },
    { title: 'ు (G కీ) - కొమ్ము గుర్తు', description: 'ఎడమ చూపుడు వేలిని G కీ కి సాగదీసి కొమ్ము "ు" ఉంచండి.', charToType: 'ు', fingerTip: 'Left Index' },
  ],
  hindi: [
    { title: 'र (J की) - दायाँ तर्जनी', description: 'दाएँ हाथ की तर्जनी (Index) को J की पर रखें और "र" टाइप करें।', charToType: 'र', fingerTip: 'Right Index' },
    { title: 'प (H की) - दायाँ तर्जनी विस्तार', description: 'दाएँ हाथ की तर्जनी को H की तक ले जाएँ और "प" टाइप करें।', charToType: 'प', fingerTip: 'Right Index' },
    { title: 'क (K की) - दायाँ मध्यमा', description: 'दाएँ हाथ की बीच की उंगली (Middle) से K की दबाएँ।', charToType: 'क', fingerTip: 'Right Middle' },
    { title: 'त (L की) - दायाँ अनामिका', description: 'दाएँ हाथ की अनामिका (Ring) से L की दबाएँ।', charToType: 'त', fingerTip: 'Right Ring' },
    { title: '् (D की) - हलंत का प्रयोग', description: 'बाएँ हाथ की मध्यमा से D की दबाकर हलंत लगाएँ।', charToType: '्', fingerTip: 'Left Middle' },
    { title: 'ि (F की) - इ की मात्रा', description: 'बाएँ हाथ की तर्जनी से F की दबाकर इ की मात्रा लगाएँ।', charToType: 'ि', fingerTip: 'Left Index' },
  ],
  tamil: [
    { title: 'ர (J விசை) - வலது கை ஆள்காட்டி', description: 'வலது ஆள்காட்டி விரலால் J விசையை அழுத்தவும்.', charToType: 'ர', fingerTip: 'Right Index' },
    { title: 'க (K விசை) - வலது நடு விரல்', description: 'வலது நடு விரலால் K விசையை அழுத்தி "க" பெறவும்.', charToType: 'க', fingerTip: 'Right Middle' },
    { title: 'த (L விசை) - வலது மோதிர விரல்', description: 'வலது மோதிர விரலால் L விசையை அழுத்தவும்.', charToType: 'த', fingerTip: 'Right Ring' },
    { title: '் (D விசை) - மெய்யெழுத்து புள்ளி', description: 'இடது நடு விரலால் D விசை அழுத்தி புள்ளி வைக்கவும்.', charToType: '்', fingerTip: 'Left Middle' },
  ],
  kannada: [
    { title: 'ರ (J ಕೀಲಿ) - ಬಲ ತೋರುಬೆರಳು', description: 'ಬಲ ತೋರುಬೆರಳಿನಿಂದ J ಕೀಲಿಯನ್ನು ಒತ್ತಿ "ರ" ಪಡೆಯಿರಿ.', charToType: 'ರ', fingerTip: 'Right Index' },
    { title: 'ಕ (K ಕೀಲಿ) - ಬಲ ನಡುಬೆರಳು', description: 'ಬಲ ನಡುಬೆರಳಿನಿಂದ K ಕೀಲಿಯನ್ನು ಒತ್ತಿ.', charToType: 'ಕ', fingerTip: 'Right Middle' },
    { title: '್ (D ಕೀಲಿ) - ಹಸಂತ / ಅರ್ಕಾವತ್ತು', description: 'ಎಡ ನಡುಬೆರಳಿನಿಂದ D ಕೀಲಿ ಒತ್ತಿ.', charToType: '್', fingerTip: 'Left Middle' },
  ],
  bengali: [
    { title: 'র (J কী) - ডান হাতের তর্জনী', description: 'ডান হাতের তর্জনী দিয়ে J কী চাপুন।', charToType: 'র', fingerTip: 'Right Index' },
    { title: 'ক (K কী) - ডান হাতের মধ্যমা', description: 'ডান মধ্যমা দিয়ে K কী চাপুন।', charToType: 'ক', fingerTip: 'Right Middle' },
    { title: '্ (D কী) - হসন্ত', description: 'বাম মধ্যমা দিয়ে D কী চাপুন।', charToType: '্', fingerTip: 'Left Middle' },
  ],
  marathi: [
    { title: 'र (J की) - उजवी तर्जनी', description: 'उजव्या हाताच्या तर्जनीने J की दाबा.', charToType: 'र', fingerTip: 'Right Index' },
    { title: 'क (K की) - उजवी मध्यमा', description: 'उजव्या हाताच्या मधल्या बोटाने K की दाबा.', charToType: 'क', fingerTip: 'Right Middle' },
    { title: '् (D की) - हलंत', description: 'डाव्या मधल्या बोटाने D की दाबा.', charToType: '्', fingerTip: 'Left Middle' },
  ],
  gujarati: [
    { title: 'ર (J કી) - જમણી તર્જની', description: 'જમણી તર્જની આંગળીથી J કી દબાવો.', charToType: 'ર', fingerTip: 'Right Index' },
    { title: 'ક (K કી) - જમણી મધ્યમા', description: 'જમણી મધ્યમાથી K કી દબાવો.', charToType: 'ક', fingerTip: 'Right Middle' },
  ],
  malayalam: [
    { title: 'ര (J കീ) - വലതു ചൂണ്ടുവിരൽ', description: 'വലതു ചൂണ്ടുവിരൽ കൊണ്ട് J കീ അമർത്തുക.', charToType: 'ര', fingerTip: 'Right Index' },
  ],
  punjabi: [
    { title: 'ਰ (J ਕੁੰਜੀ) - ਸੱਜੀ ਤਰਜਨੀ', description: 'ਸੱਜੀ ਤਰਜਨੀ ਉਂਗਲ ਨਾਲ J ਕੁੰਜੀ ਦਬਾਓ।', charToType: 'ਰ', fingerTip: 'Right Index' },
  ],
  odia: [
    { title: 'ର (J କୀ) - ଡାହାଣ ତର୍ଜନୀ', description: 'ଡାହାଣ ତର୍ଜନୀ ଆଙ୍ଗୁଠି ଦ୍ୱାରା J କୀ ଦବାନ୍ତୁ।', charToType: 'ର', fingerTip: 'Right Index' },
  ],
};

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ language }) => {
  const curriculum = TUTORIAL_CURRICULUM[language] || TUTORIAL_CURRICULUM.english;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  const step = curriculum[currentStepIndex] || curriculum[0];
  const keyInfo = findKeyForChar(step.charToType, language);

  // Auto-play animation simulation
  useEffect(() => {
    if (!isPlayingAuto) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % curriculum.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlayingAuto, curriculum.length]);

  // Determine active finger for the step
  let targetFinger: any = null;
  if (keyInfo) {
    for (const row of KEYBOARD_ROWS) {
      const match = row.find((k) => k.code === keyInfo.code);
      if (match) {
        targetFinger = match.finger;
        break;
      }
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Step-by-Step Finger Animation Tutorial
            </h2>
            <p className="text-xs text-slate-400">
              Visual animated demonstration showing exact hand posture and finger movement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              isPlayingAuto
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
            }`}
          >
            {isPlayingAuto ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" /> Pause Demo
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Auto-Play Video Demo
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlayingAuto(false);
              setCurrentStepIndex(0);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition cursor-pointer"
            title="Restart Tutorial"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Selector Timeline */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {curriculum.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setIsPlayingAuto(false);
              setCurrentStepIndex(index);
            }}
            className={`px-4 py-2 rounded-xl border text-xs whitespace-nowrap transition cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              index === currentStepIndex
                ? 'bg-indigo-600 text-white border-indigo-400 font-bold shadow-md shadow-indigo-600/30 ring-2 ring-indigo-500/30'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Step {index + 1}:</span>
            <span className="font-semibold">{item.charToType === ' ' ? 'Space' : item.charToType}</span>
            {index < currentStepIndex && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Main Focus Demonstration Screen */}
      <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Module {currentStepIndex + 1} of {curriculum.length}
            </div>
            <h3 className="text-2xl font-black text-white mt-0.5">{step.title}</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">{step.description}</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Target Key</span>
              <span className="text-3xl font-black text-amber-400 font-mono">
                {step.charToType === ' ' ? 'SPACE' : step.charToType}
              </span>
            </div>
            <div className="h-10 w-[1px] bg-slate-800"></div>
            <div className="text-center">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Assigned Finger</span>
              <span className="text-sm font-black text-emerald-400 whitespace-nowrap">{step.fingerTip}</span>
            </div>
          </div>
        </div>

        {/* Dynamic 2D Hands Posture Visualization */}
        <HandsGuide activeFinger={targetFinger} targetFinger={targetFinger} />

        {/* Keyboard overlay highlighting key */}
        <VirtualKeyboard
          language={language}
          activeKey={keyInfo?.code || null}
          targetKey={keyInfo?.code || null}
          targetNeedsShift={Boolean(keyInfo?.needsShift)}
          showFingerGuide={true}
        />
      </div>
    </div>
  );
};
