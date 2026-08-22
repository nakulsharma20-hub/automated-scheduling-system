import React from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  RefreshCw, 
  Plus, 
  Bookmark, 
  Layers, 
  BarChart3, 
  Table, 
  LayoutGrid, 
  List, 
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';

export default function Navbar({
  darkMode,
  setDarkMode,
  currentView,
  setCurrentView,
  onSyncSheet,
  isSyncing,
  bookmarkedCount,
  onOpenAddModal,
  totalCount
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 glass-panel transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 shadow-lg shadow-sky-500/20 text-white font-bold">
              <span className="text-xl tracking-tighter">CP</span>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-900 dark:from-white dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
                  CHRONICLE PULSE
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded-full">
                  Live Intel
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                The Hindu Curated Dispatch • {totalCount} Stories
              </p>
            </div>
          </div>

          {/* View Mode Nav Switcher (Desktop) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-inner">
            <button
              onClick={() => setCurrentView('magazine')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'magazine'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Magazine</span>
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'list'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Feed</span>
            </button>
            <button
              onClick={() => setCurrentView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setCurrentView('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'analytics'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Insights</span>
            </button>
            <button
              onClick={() => setCurrentView('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                currentView === 'table'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Sync with Google Sheets */}
            <button
              onClick={onSyncSheet}
              disabled={isSyncing}
              title="Sync live from Google Sheets"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-500 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Sheet</span>
            </button>

            {/* Add New Article / Import */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 rounded-xl shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add / Import</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all active:scale-95"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
