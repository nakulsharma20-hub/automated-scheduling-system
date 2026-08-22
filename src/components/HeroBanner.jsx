import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  User, 
  Volume2, 
  ArrowRight, 
  Radio, 
  TrendingUp, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { CATEGORY_BADGES } from '../utils/categoryDetector';

export default function HeroBanner({
  featuredArticle,
  tickerArticles = [],
  onOpenArticle,
  onPlaySpeech
}) {
  if (!featuredArticle) return null;

  const badge = CATEGORY_BADGES[featuredArticle.category] || { bg: 'bg-sky-500/10 text-sky-500', label: 'Spotlight' };

  return (
    <div className="relative overflow-hidden mb-8">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Breaking News Marquee Ticker */}
      <div className="flex items-center gap-3 bg-slate-900 dark:bg-slate-950 text-white px-4 py-2.5 rounded-2xl mb-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-[11px] font-bold uppercase tracking-wider shrink-0">
          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>BREAKING</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full relative">
          <div className="inline-block animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] text-xs font-medium text-slate-300">
            {tickerArticles.map((art, i) => (
              <span 
                key={i} 
                onClick={() => onOpenArticle(art)}
                className="cursor-pointer hover:text-sky-400 transition-colors mx-4 inline-flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"></span>
                <span>{art.title}</span>
                <span className="text-slate-500 text-[10px]">({art.author})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Featured Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl transition-all hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8">
          
          {/* Content Left */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5" />
                  Lead Story
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h2 
                onClick={() => onOpenArticle(featuredArticle)}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer transition-colors leading-tight font-serif"
              >
                {featuredArticle.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {featuredArticle.description}
              </p>
            </div>

            {/* Author info & Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {featuredArticle.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {featuredArticle.author}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    The Hindu Editorial Desk • {featuredArticle.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onPlaySpeech(featuredArticle)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700/80 rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
                  title="Listen with AI Voice"
                >
                  <Volume2 className="w-4 h-4 text-sky-500" />
                  <span>Listen</span>
                </button>

                <button
                  onClick={() => onOpenArticle(featuredArticle)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 rounded-xl shadow-md transition-all active:scale-95 group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Image Right */}
          <div 
            onClick={() => onOpenArticle(featuredArticle)}
            className="lg:col-span-5 relative group cursor-pointer overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 dark:bg-slate-800"
          >
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-md">
                Verified Dispatch
              </span>
              <span className="flex items-center gap-1 text-sky-300 font-medium">
                Full Preview <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
