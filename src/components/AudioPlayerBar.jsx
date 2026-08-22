import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Radio, 
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { speechController } from '../utils/textToSpeech';

export default function AudioPlayerBar({
  playingArticle,
  isPlaying,
  isPaused,
  onStop,
  onOpenArticle
}) {
  const [speed, setSpeed] = useState(1.0);

  if (!playingArticle) return null;

  const handleTogglePlay = () => {
    if (isPaused) {
      speechController.resume();
    } else {
      speechController.pause();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (speechController.utterance) {
      speechController.utterance.rate = newSpeed;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-slide-up">
      <div className="p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border border-sky-500/30 text-white shadow-2xl shadow-sky-500/20 flex flex-col gap-3">
        
        {/* Top: Header & Wave */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400">
              AI Audio Reader
            </span>
          </div>

          {/* Sound Wave Animation */}
          <div className="flex items-center gap-1 h-3">
            <span className={`w-1 bg-sky-400 rounded-full transition-all ${isPlaying && !isPaused ? 'animate-[bounce_0.6s_infinite_100ms] h-3' : 'h-1'}`}></span>
            <span className={`w-1 bg-sky-400 rounded-full transition-all ${isPlaying && !isPaused ? 'animate-[bounce_0.6s_infinite_300ms] h-4' : 'h-1.5'}`}></span>
            <span className={`w-1 bg-sky-400 rounded-full transition-all ${isPlaying && !isPaused ? 'animate-[bounce_0.6s_infinite_200ms] h-2' : 'h-1'}`}></span>
            <span className={`w-1 bg-sky-400 rounded-full transition-all ${isPlaying && !isPaused ? 'animate-[bounce_0.6s_infinite_400ms] h-3.5' : 'h-2'}`}></span>
          </div>
        </div>

        {/* Middle: Title info */}
        <div 
          onClick={() => onOpenArticle(playingArticle)}
          className="cursor-pointer hover:text-sky-300 transition-colors"
        >
          <p className="text-xs font-bold truncate">
            {playingArticle.title}
          </p>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">
            {playingArticle.author}
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          
          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <select
              value={speed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="bg-slate-800 text-[11px] font-mono px-2 py-1 rounded-lg border border-slate-700 text-slate-300 outline-none"
            >
              <option value="0.75">0.75x</option>
              <option value="1.0">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={handleTogglePlay}
              className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold transition-all shadow-md"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* Stop */}
            <button
              onClick={onStop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              title="Stop"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
