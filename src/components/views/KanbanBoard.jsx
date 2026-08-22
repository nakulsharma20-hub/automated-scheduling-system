import React from 'react';
import { 
  Bookmark, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  ExternalLink,
  Volume2
} from 'lucide-react';
import { CATEGORY_BADGES } from '../../utils/categoryDetector';

const COLUMNS = [
  { id: 'saved', title: 'Saved for Later', icon: Bookmark, color: 'border-amber-500/30 bg-amber-500/5 text-amber-500' },
  { id: 'reading', title: 'Currently Reading', icon: BookOpen, color: 'border-sky-500/30 bg-sky-500/5 text-sky-500' },
  { id: 'completed', title: 'Completed & Read', icon: CheckCircle2, color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500' },
];

export default function KanbanBoard({
  articles = [],
  onOpenArticle,
  onUpdateStatus,
  onPlaySpeech,
  activeSpeechArticleId
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMNS.map((col) => {
        const Icon = col.icon;
        const columnArticles = articles.filter(a => (a.status || 'saved') === col.id);

        return (
          <div 
            key={col.id}
            className="flex flex-col rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-4 min-h-[550px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border ${col.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {col.title}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm">
                {columnArticles.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[70vh] pr-1">
              {columnArticles.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-700/60 rounded-2xl">
                  <p className="text-xs text-slate-400">No stories in this column</p>
                </div>
              ) : (
                columnArticles.map((article) => {
                  const badge = CATEGORY_BADGES[article.category] || { bg: 'bg-sky-500/10 text-sky-500', label: article.category };
                  const isPlaying = activeSpeechArticleId === article.id;

                  return (
                    <div
                      key={article.id}
                      onClick={() => onOpenArticle(article)}
                      className="group relative bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {article.readTime}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors line-clamp-2">
                        {article.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {article.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 truncate max-w-[120px]">
                          {article.author}
                        </span>

                        {/* Status Mover Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlaySpeech(article);
                            }}
                            className={`p-1 rounded-md ${isPlaying ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-sky-500'}`}
                            title="Listen"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>

                          {col.id !== 'saved' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const prevStatus = col.id === 'completed' ? 'reading' : 'saved';
                                onUpdateStatus(article.id, prevStatus);
                              }}
                              className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                              title="Move Left"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}

                          {col.id !== 'completed' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextStatus = col.id === 'saved' ? 'reading' : 'completed';
                                onUpdateStatus(article.id, nextStatus);
                              }}
                              className="p-1 rounded-md bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900 text-sky-600 dark:text-sky-400"
                              title="Move to next stage"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
