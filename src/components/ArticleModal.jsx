import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Volume2, 
  ExternalLink, 
  Share2, 
  Clock, 
  User, 
  Type, 
  Sparkles, 
  Check,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CATEGORY_BADGES } from '../utils/categoryDetector';

export default function ArticleModal({
  article,
  onClose,
  onToggleBookmark,
  onPlaySpeech,
  isAudioPlaying,
  allArticles = [],
  onOpenArticle
}) {
  const [fontSize, setFontSize] = useState('base'); // 'sm', 'base', 'lg', 'xl'
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const badge = CATEGORY_BADGES[article.category] || { bg: 'bg-sky-500/10 text-sky-500', label: article.category };

  // Find related articles in same category
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(article.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header Sticky Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${badge.bg}`}>
              {badge.label}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Reader Mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-sm' : 'text-slate-400'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-sm' : 'text-slate-400'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 text-sky-500 shadow-sm' : 'text-slate-400'}`}
              >
                A+
              </button>
            </div>

            {/* Audio Listen */}
            <button
              onClick={() => onPlaySpeech(article)}
              className={`p-2 rounded-xl transition-all ${
                isAudioPlaying 
                  ? 'bg-sky-500 text-white animate-pulse' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500'
              }`}
              title="Listen with AI Voice"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 transition-all ${
                article.bookmarked 
                  ? 'text-amber-500' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
              title="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${article.bookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-all"
              title="Share"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Article Cover Image */}
          <div className="relative aspect-[21/9] sm:aspect-[16/8] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
              {article.title}
            </h1>

            {/* Author & Publication Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {article.author}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    The Hindu Special Report • {article.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className={`text-slate-700 dark:text-slate-300 font-serif ${fontClasses[fontSize]} space-y-4`}>
            <p className="font-semibold text-slate-900 dark:text-slate-100 border-l-4 border-sky-500 pl-4 py-1 italic bg-sky-50/50 dark:bg-sky-950/30 rounded-r-xl">
              {article.description}
            </p>

            <p>
              This report provides in-depth analysis and reporting curated from the editorial archives of <em>The Hindu</em>. To view full investigative reporting, multi-angle interviews, high-resolution photo galleries, and reader discussions, please visit the official digital edition.
            </p>
          </div>

          {/* Call to action: Open Original Link */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Read Complete Original Story
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Continue reading the full unabridged article on thehindu.com
              </p>
            </div>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 active:scale-95 transition-all shrink-0"
            >
              <span>Visit The Hindu</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Related Stories in same category */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Related in {badge.label}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onOpenArticle(rel)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-sky-500/40 cursor-pointer transition-all space-y-1.5"
                  >
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-sky-500">
                      {rel.title}
                    </h5>
                    <p className="text-[10px] text-slate-400">{rel.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
