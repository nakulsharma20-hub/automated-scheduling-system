import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  FileSpreadsheet, 
  Link as LinkIcon, 
  Upload, 
  Sparkles, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { CATEGORIES } from '../utils/categoryDetector';

export default function AddArticleModal({
  isOpen,
  onClose,
  onAddArticle,
  onImportSheetUrl
}) {
  const [tab, setTab] = useState('manual'); // 'manual' or 'sheet'
  
  // Manual form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('politics');
  const [description, setDescription] = useState('');

  // Sheet URL state
  const [sheetUrl, setSheetUrl] = useState('https://docs.google.com/spreadsheets/d/1px6nE2KLE9NapM_YloQZ9Fvso1g5l0OCUS_0lrNlEoc/edit?usp=sharing');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmitManual = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setErrorMsg('Please enter at least a title and a valid URL.');
      return;
    }

    onAddArticle({
      title: title.trim(),
      author: author.trim() || 'Guest Contributor',
      url: url.trim(),
      category,
      description: description.trim() || `Read full story at ${url.trim()}`
    });

    onClose();
  };

  const handleImportSheet = async (e) => {
    e.preventDefault();
    if (!sheetUrl.trim()) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      await onImportSheetUrl(sheetUrl.trim());
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Failed to fetch Google Sheet. Make sure the sheet is shared as "Anyone with the link can view".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Add News & Ingest Data
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Insert a single dispatch or connect a Google Sheet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl">
          <button
            onClick={() => { setTab('manual'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              tab === 'manual'
                ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => { setTab('sheet'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              tab === 'sheet'
                ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Google Sheet Sync
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab 1: Manual Form */}
        {tab === 'manual' && (
          <form onSubmit={handleSubmitManual} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Headline Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Breakthrough in green hydrogen corridors..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Author / Columnist
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Sriram V."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Article URL *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.thehindu.com/..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Summary / Lead Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief summary of the news story..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-md shadow-sky-500/20 active:scale-95 transition-all"
              >
                Save Article
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Sheet URL Form */}
        {tab === 'sheet' && (
          <form onSubmit={handleImportSheet} className="space-y-4">
            <div className="p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-sky-600 dark:text-sky-400">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Google Sheets Live Connector</span>
              </div>
              <p>
                Paste any publicly shared Google Sheets link. The system will automatically convert it into a live CSV endpoint and parse the titles, columnists, and article links.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Google Sheets / CSV Link
              </label>
              <input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                required
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Fetch & Sync</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}
