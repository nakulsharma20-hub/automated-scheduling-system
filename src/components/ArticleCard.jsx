import React, { useState } from 'react';
import { 
  Bookmark, 
  Volume2, 
  Clock, 
  User, 
  ExternalLink, 
  Share2, 
  Heart, 
  Check, 
  BookOpen,
  Eye
} from 'lucide-react';
import { CATEGORY_BADGES, CATEGORY_GRADIENTS } from '../utils/categoryDetector';

export default function ArticleCard({
  article,
  onOpenArticle,
  onToggleBookmark,
  onPlaySpeech,
  onUpdateStatus,
  isAudioPlaying
}) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes || 12);

  const badge = CATEGORY_BADGES[article.category] || { bg: 'bg-sky-500/10 text-sky-500', label: article.category };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(article.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  return (
    <div 
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Top Image & Overlays */}
      <div 
        onClick={() => onOpenArticle(article)}
        className="relative overflow-hidden aspect-[16/9] cursor-pointer bg-slate-100 dark:bg-slate-800"
      >
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Category Pill on top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-3 py-1 text-[11px] font-bold tracking-wide rounded-full backdrop-blur-md border ${badge.bg}`}>
            {badge.label}
          </span>
        </div>

        {/* Read Time on top right */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
          <Clock className="w-3 h-3 text-sky-400" />
          <span>{article.readTime}</span>
        </div>

        {/* Audio button overlay on bottom right of image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlaySpeech(article);
          }}
          className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-lg transition-all active:scale-95 ${
            isAudioPlaying
              ? 'bg-sky-500 text-white animate-pulse'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white hover:bg-sky-500 hover:text-white'
          }`}
          title="Listen to headline & summary"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between p-5 space-y-4">
        
        <div className="space-y-2.5">
          {/* Date & Views */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {article.views} reads
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenArticle(article)}
            className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer transition-colors leading-snug line-clamp-2 font-serif"
          >
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Card Footer: Columnist & Interactive Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          
          {/* Author avatar & Name */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              {article.author.charAt(0)}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate" title={article.author}>
              {article.author}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            
            {/* Like */}
            <button
              onClick={handleLike}
              className={`p-1.5 rounded-lg transition-all ${
                liked 
                  ? 'text-rose-500 bg-rose-500/10' 
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Like"
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative"
              title="Copy link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-1.5 rounded-lg transition-all ${
                article.bookmarked 
                  ? 'text-amber-500 bg-amber-500/10' 
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={article.bookmarked ? 'Remove Bookmark' : 'Save for later'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${article.bookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            {/* Direct Link to The Hindu */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Open on The Hindu"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}
