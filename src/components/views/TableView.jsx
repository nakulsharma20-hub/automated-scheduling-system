import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  ExternalLink, 
  Bookmark, 
  Volume2, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  CheckSquare,
  Square
} from 'lucide-react';
import { CATEGORY_BADGES } from '../../utils/categoryDetector';
import { exportToCSV, exportToJSON } from '../../utils/exportUtils';

export default function TableView({
  articles = [],
  onOpenArticle,
  onToggleBookmark,
  onPlaySpeech,
  activeSpeechArticleId
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Sorting
  const sortedArticles = [...articles].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedArticles.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + rowsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedArticles.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedArticles.map(a => a.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const selectedArticles = articles.filter(a => selectedIds.includes(a.id));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm space-y-4">
      
      {/* Top Bar for Table Actions */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Data Explorer Table
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400">
            {articles.length} records
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold text-sky-500">{selectedIds.length} selected</span>
              <button
                onClick={() => exportToCSV(selectedArticles, 'selected_articles.csv')}
                className="px-2 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-sky-50 transition-colors"
              >
                Export Selected CSV
              </button>
            </div>
          )}

          <button
            onClick={() => exportToCSV(articles)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5 text-sky-500" />
            <span>Export All CSV</span>
          </button>
          
          <button
            onClick={() => exportToJSON(articles)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-4 w-10">
                <button onClick={toggleSelectAll} className="text-slate-400 hover:text-sky-500">
                  {selectedIds.length === paginatedArticles.length && paginatedArticles.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-sky-500" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th onClick={() => handleSort('title')} className="p-4 cursor-pointer hover:text-sky-500">
                <div className="flex items-center gap-1">
                  <span>Headline</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th onClick={() => handleSort('author')} className="p-4 cursor-pointer hover:text-sky-500">
                <div className="flex items-center gap-1">
                  <span>Columnist / Bureau</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th onClick={() => handleSort('category')} className="p-4 cursor-pointer hover:text-sky-500">
                <div className="flex items-center gap-1">
                  <span>Desk / Topic</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="p-4 hidden md:table-cell">Summary</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {paginatedArticles.map((article) => {
              const badge = CATEGORY_BADGES[article.category] || { bg: 'bg-sky-500/10 text-sky-500', label: article.category };
              const isSelected = selectedIds.includes(article.id);
              const isPlaying = activeSpeechArticleId === article.id;

              return (
                <tr 
                  key={article.id}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                    isSelected ? 'bg-sky-50/40 dark:bg-sky-950/20' : ''
                  }`}
                >
                  <td className="p-4">
                    <button onClick={() => toggleSelectRow(article.id)} className="text-slate-400 hover:text-sky-500">
                      {isSelected ? <CheckSquare className="w-4 h-4 text-sky-500" /> : <Square className="w-4 h-4" />}
                    </button>
                  </td>

                  <td className="p-4 max-w-xs sm:max-w-md">
                    <button
                      onClick={() => onOpenArticle(article)}
                      className="font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 text-left line-clamp-2"
                    >
                      {article.title}
                    </button>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">
                    {article.author}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </td>

                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400 max-w-sm hidden md:table-cell line-clamp-2">
                    {article.description}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onPlaySpeech(article)}
                        className={`p-1.5 rounded-lg ${isPlaying ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onToggleBookmark(article.id)}
                        className={`p-1.5 rounded-lg ${article.bookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        title="Save"
                      >
                        <Bookmark className={`w-4 h-4 ${article.bookmarked ? 'fill-amber-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => onOpenArticle(article)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Open Source Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
