import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  BookOpen, 
  Bookmark, 
  Clock, 
  Users, 
  Layers, 
  TrendingUp, 
  Sparkles,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import { CATEGORIES } from '../../utils/categoryDetector';

const COLORS = [
  '#0ea5e9', '#f59e0b', '#ef4444', '#10b981', '#a855f7', 
  '#ec4899', '#f97316', '#84cc16', '#06b6d4', '#6366f1'
];

export default function AnalyticsView({
  articles = [],
  onSelectCategory,
  onSelectAuthor,
  setCurrentView
}) {
  // 1. Calculate Category breakdown
  const categoryCounts = {};
  CATEGORIES.forEach(c => {
    if (c.id !== 'all') categoryCounts[c.id] = 0;
  });

  articles.forEach(a => {
    if (categoryCounts[a.category] !== undefined) {
      categoryCounts[a.category]++;
    } else {
      categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
    }
  });

  const categoryChartData = Object.keys(categoryCounts)
    .filter(k => categoryCounts[k] > 0)
    .map(k => {
      const found = CATEGORIES.find(c => c.id === k);
      return {
        name: found ? found.label : k,
        id: k,
        value: categoryCounts[k]
      };
    })
    .sort((a, b) => b.value - a.value);

  // 2. Calculate Author breakdown
  const authorCounts = {};
  articles.forEach(a => {
    const auth = a.author || 'The Hindu Bureau';
    authorCounts[auth] = (authorCounts[auth] || 0) + 1;
  });

  const authorChartData = Object.keys(authorCounts)
    .map(k => ({ name: k, count: authorCounts[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8

  // 3. Stats calculations
  const totalArticles = articles.length;
  const bookmarkedCount = articles.filter(a => a.bookmarked).length;
  const totalMinutes = articles.reduce((acc, a) => {
    const min = parseInt(a.readTime) || 2;
    return acc + min;
  }, 0);
  const avgReadTime = totalArticles ? Math.round(totalMinutes / totalArticles) : 0;
  const uniqueAuthors = Object.keys(authorCounts).length;
  const topCategory = categoryChartData[0]?.name || 'N/A';

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Stories</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 font-mono">
            {totalArticles}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Direct from Google Sheet</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Saved Articles</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 font-mono">
            {bookmarkedCount}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Personal reading list</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Read Time</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 font-mono">
            ~{totalMinutes} <span className="text-base font-normal text-slate-400">min</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Avg {avgReadTime} min per article</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Top Desk</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-3 truncate">
            {topCategory}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{uniqueAuthors} unique authors</p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (Donut Chart) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-sky-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Editorial Distribution by Topic
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Interactive</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  onClick={(entry) => {
                    if (entry && entry.id) {
                      onSelectCategory(entry.id);
                      setCurrentView('magazine');
                    }
                  }}
                  className="cursor-pointer"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '12px', 
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Badges Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {categoryChartData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectCategory(item.id);
                  setCurrentView('magazine');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <span 
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></span>
                <span>{item.name}</span>
                <span className="font-mono font-bold text-slate-400">({item.value})</span>
              </button>
            ))}
          </div>

        </div>

        {/* Top Authors Bar Chart */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Top Columnists & Desks
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Top 8</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={authorChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={90} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '12px', 
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '12px'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="#6366f1" 
                  radius={[0, 8, 8, 0]}
                  onClick={(entry) => {
                    if (entry && entry.name) {
                      onSelectAuthor(entry.name);
                      setCurrentView('magazine');
                    }
                  }}
                  className="cursor-pointer hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-400 text-center pt-2 border-t border-slate-100 dark:border-slate-800">
            Click on any columnist bar to instantly filter the news feed.
          </p>

        </div>

      </div>

    </div>
  );
}
