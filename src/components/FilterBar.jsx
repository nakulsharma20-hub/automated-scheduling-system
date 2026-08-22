import React from 'react';
import { 
  Search, 
  X, 
  ArrowUpDown, 
  User, 
  Bookmark, 
  Download, 
  LayoutGrid, 
  List, 
  Layers, 
  BarChart3, 
  Table,
  Filter
} from 'lucide-react';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedAuthor,
  setSelectedAuthor,
  authorsList = [],
  showBookmarkedOnly,
  setShowBookmarkedOnly,
  currentView,
  setCurrentView,
  filteredCount,
  totalCount,
  articles
}) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-2xl mb-8 shadow-sm space-y-4">
      
      {/* Top row: Search & Primary Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headline, summary, columnist..."
            className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns & Toggles */}
        <div className="flex flex-wrap items-center justify-between md:justify-end w-full md:w-auto gap-2.5">
          
          {/* Author Selector */}
          <div className="relative">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">All Columnists ({authorsList.length})</option>
              {authorsList.map((auth, i) => (
                <option key={i} value={auth}>{auth}</option>
              ))}
            </select>
            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="latest">Latest Date</option>
              <option value="title-asc">Title (A to Z)</option>
              <option value="title-desc">Title (Z to A)</option>
              <option value="readtime">Quick Read First</option>
              <option value="views">Most Popular</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Bookmarks Toggle */}
          <button
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
              showBookmarkedOnly
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
          </button>

          {/* Export button */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => exportToCSV(articles)}
              title="Download as CSV"
              className="p-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom row info bar & Mobile view tabs */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-sky-500" />
          <span>
            Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredCount}</strong> of <strong className="text-slate-900 dark:text-white font-mono">{totalCount}</strong> articles
          </span>
          {(searchQuery || selectedAuthor !== 'all' || showBookmarkedOnly) && (
            <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-medium">
              Filtered
            </span>
          )}
        </div>

        {/* Mobile View switcher */}
        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={() => setCurrentView('magazine')}
            className={`p-1.5 rounded-lg ${currentView === 'magazine' ? 'bg-sky-500 text-white' : 'text-slate-400'}`}
            title="Magazine View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentView('list')}
            className={`p-1.5 rounded-lg ${currentView === 'list' ? 'bg-sky-500 text-white' : 'text-slate-400'}`}
            title="Feed View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentView('kanban')}
            className={`p-1.5 rounded-lg ${currentView === 'kanban' ? 'bg-sky-500 text-white' : 'text-slate-400'}`}
            title="Board View"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentView('analytics')}
            className={`p-1.5 rounded-lg ${currentView === 'analytics' ? 'bg-sky-500 text-white' : 'text-slate-400'}`}
            title="Insights"
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentView('table')}
            className={`p-1.5 rounded-lg ${currentView === 'table' ? 'bg-sky-500 text-white' : 'text-slate-400'}`}
            title="Data Table"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
