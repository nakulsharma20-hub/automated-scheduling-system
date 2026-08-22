import React from 'react';
import { 
  Clock, 
  Volume2, 
  Bookmark, 
  ExternalLink, 
  Share2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CATEGORY_BADGES } from '../../utils/categoryDetector';

export default function ListView({
  articles = [],
  onOpenArticle,
  onToggleBookmark,
  onPlaySpeech,
  activeSpeechArticleId
}) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No articles matched your criteria</h3>
        <p className="text-xs text-slate-400 mt-1">Please try modifying your search keywords.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {articles.map((article, idx) => {
        const badge = CATEGORY_BADGES[article.category] || { bg: 'bg-sky-500/10 text-sky-500', label: article.category };
        const isPlaying = activeSpeechArticleId === article.id;

        return (
          <div
            key={article.id}
            onClick={() => onOpenArticle(article)}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:shadow-md transition-all cursor-pointer gap-4"
          >
            {/* Left Info */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-400 shrink-0">
                {idx + 1}
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${badge.bg}`}>
                    {badge.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {article.readTime}
                  </span>
                  <span className="text-[11px] text-slate-400">• {article.date}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {article.description}
                </p>

                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    By <strong className="text-slate-800 dark:text-slate-200">{article.author}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right thumbnail & Actions */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
              
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img 
                  src={article.image} 
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySpeech(article);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    isPlaying 
                      ? 'bg-sky-500 text-white' 
                      : 'text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(article.id);
                  }}
                  className={`p-2 rounded-xl transition-all ${
                    article.bookmarked 
                      ? 'text-amber-500 bg-amber-500/10' 
                      : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${article.bookmarked ? 'fill-amber-500' : ''}`} />
                </button>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  title="Open source link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="hidden sm:flex items-center text-xs font-semibold text-sky-500 group-hover:translate-x-1 transition-transform pl-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}
