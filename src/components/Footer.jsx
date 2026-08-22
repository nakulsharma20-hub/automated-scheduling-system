import React from 'react';
import { Sparkles, Heart, ExternalLink, FileSpreadsheet, ShieldCheck } from 'lucide-react';

export default function Footer({ totalCount, onSelectCategory }) {
  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                CP
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                CHRONICLE PULSE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Curated intelligence, breaking headlines, and cultural editorial archives from <em>The Hindu</em>. Built with live Google Sheets streaming, multi-view analytics, reader mode, and Web Speech narration.
            </p>
          </div>

          {/* Quick Desks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Featured Desks
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onSelectCategory('heritage')} className="hover:text-sky-500 transition-colors">
                  Madras Day & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('politics')} className="hover:text-sky-500 transition-colors">
                  National & Politics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('opinion')} className="hover:text-sky-500 transition-colors">
                  Editorial & Op-Eds
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cinema')} className="hover:text-sky-500 transition-colors">
                  Cinema & Film Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Source Link */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Data Pipeline
            </h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <a 
                href="https://docs.google.com/spreadsheets/d/1px6nE2KLE9NapM_YloQZ9Fvso1g5l0OCUS_0lrNlEoc/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-medium hover:underline"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Connected Google Sheet</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[11px]">
                Active synchronized dataset: {totalCount} records.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Chronicle Pulse. All news content credited to The Hindu.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
              <ShieldCheck className="w-4 h-4" /> Live Sync Active
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
