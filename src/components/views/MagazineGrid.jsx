import React from 'react';
import ArticleCard from '../ArticleCard';
import { Newspaper } from 'lucide-react';

export default function MagazineGrid({
  articles = [],
  onOpenArticle,
  onToggleBookmark,
  onPlaySpeech,
  onUpdateStatus,
  activeSpeechArticleId
}) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
        <Newspaper className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No articles found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Try adjusting your search query, clearing filters, or switching category tabs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onOpenArticle={onOpenArticle}
          onToggleBookmark={onToggleBookmark}
          onPlaySpeech={onPlaySpeech}
          onUpdateStatus={onUpdateStatus}
          isAudioPlaying={activeSpeechArticleId === article.id}
        />
      ))}
    </div>
  );
}
