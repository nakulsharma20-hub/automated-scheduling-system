import React from 'react';
import { 
  Sparkles, 
  Landmark, 
  Scale, 
  Feather, 
  Film, 
  Mic, 
  Home, 
  Trophy, 
  Cpu, 
  Utensils, 
  BookOpen 
} from 'lucide-react';
import { CATEGORIES } from '../utils/categoryDetector';

const ICON_MAP = {
  Sparkles,
  Landmark,
  Scale,
  Feather,
  Film,
  Mic,
  Home,
  Trophy,
  Cpu,
  Utensils,
  BookOpen
};

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {}
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? Object.values(categoryCounts).reduce((a, b) => a + b, 0) 
            : (categoryCounts[cat.id] || 0);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-slate-900/10 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400 dark:text-sky-600' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                isSelected 
                  ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
