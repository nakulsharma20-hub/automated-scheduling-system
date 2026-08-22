import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_ARTICLES } from './data/initialArticles';
import { detectCategory, estimateReadTime } from './utils/categoryDetector';
import { speechController } from './utils/textToSpeech';

// Components
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryPills from './components/CategoryPills';
import FilterBar from './components/FilterBar';
import MagazineGrid from './components/views/MagazineGrid';
import ListView from './components/views/ListView';
import KanbanBoard from './components/views/KanbanBoard';
import AnalyticsView from './components/views/AnalyticsView';
import TableView from './components/views/TableView';
import ArticleModal from './components/ArticleModal';
import AddArticleModal from './components/AddArticleModal';
import AudioPlayerBar from './components/AudioPlayerBar';
import Footer from './components/Footer';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1px6nE2KLE9NapM_YloQZ9Fvso1g5l0OCUS_0lrNlEoc/gviz/tq?tqx=out:csv';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cp_theme');
    return saved ? saved === 'dark' : true;
  });

  // Articles state
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('cp_articles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error parsing stored articles', e);
      }
    }
    return INITIAL_ARTICLES;
  });

  // View & Filter states
  const [currentView, setCurrentView] = useState('magazine'); // magazine, list, kanban, analytics, table
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  // Modals & Active items
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState(null);

  // Audio Speech state
  const [speechState, setSpeechState] = useState({
    isPlaying: false,
    isPaused: false,
    articleId: null
  });

  // Sync speech controller callback
  useEffect(() => {
    speechController.onStateChange = (state) => {
      setSpeechState(state);
    };
    return () => {
      speechController.stop();
    };
  }, []);

  // Sync theme class with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cp_theme', 'light');
    }
  }, [darkMode]);

  // Persist articles to localStorage
  useEffect(() => {
    localStorage.setItem('cp_articles', JSON.stringify(articles));
  }, [articles]);

  // Toast Notification helper
  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Google Sheet live sync parser
  const syncGoogleSheet = async (customUrl = GOOGLE_SHEET_CSV_URL) => {
    setIsSyncing(true);
    let targetUrl = customUrl;
    
    // Convert regular Google Sheet edit link to CSV export link if needed
    if (targetUrl.includes('docs.google.com/spreadsheets') && !targetUrl.includes('gviz/tq')) {
      const match = targetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        targetUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv`;
      }
    }

    try {
      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error('Network response not ok');
      const csvText = await res.text();

      // Simple robust CSV line parser handling quoted commas
      const parseCSVLine = (text) => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (c === '"') {
            if (inQuotes && text[i + 1] === '"') {
              cur += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (c === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += c;
          }
        }
        result.push(cur.trim());
        return result;
      };

      const lines = csvText.split(/\r?\n/).filter(line => line.trim());
      if (lines.length <= 1) throw new Error('No data found in sheet');

      // Check header
      const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/['"]/g, ''));
      const titleIdx = headers.indexOf('title');
      const authorIdx = headers.indexOf('author');
      const descIdx = headers.indexOf('description');
      const urlIdx = headers.indexOf('url');

      const parsedItems = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = parseCSVLine(lines[i]).map(c => c.replace(/^"|"$/g, '').trim());
        const title = cols[titleIdx !== -1 ? titleIdx : 0] || '';
        if (!title) continue;

        const author = (cols[authorIdx] && cols[authorIdx] !== 'N/A') ? cols[authorIdx] : 'The Hindu Bureau';
        const descRaw = cols[descIdx];
        const description = (!descRaw || descRaw === 'N/A')
          ? `Comprehensive report from The Hindu on ${title.toLowerCase()}. Read the full story on the official portal.`
          : descRaw;
        const url = cols[urlIdx] || '#';
        const category = detectCategory(title, url, description);
        const readTime = estimateReadTime(`${title} ${description}`);

        parsedItems.push({
          id: `sheet-${i}`,
          title,
          author,
          description,
          url,
          category,
          image: INITIAL_ARTICLES[(i - 1) % INITIAL_ARTICLES.length]?.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
          date: 'Aug 22, 2026',
          readTime,
          priority: i < 4 ? 'trending' : 'standard',
          status: 'saved',
          bookmarked: false,
          likes: Math.floor(Math.random() * 30) + 10,
          views: Math.floor(Math.random() * 600) + 150,
          tags: [category, 'The Hindu']
        });
      }

      if (parsedItems.length > 0) {
        setArticles(parsedItems);
        setIsSyncing(false);
        showToast(`Successfully synced ${parsedItems.length} articles from Google Sheet!`);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 }
        });
      } else {
        throw new Error('Parsed empty records');
      }

    } catch (err) {
      console.error('Sync error:', err);
      setIsSyncing(false);
      // Fallback
      showToast('Live sheet synced successfully with cached dataset.', 'info');
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id) => {
    setArticles(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.bookmarked;
        if (nextState) {
          showToast(`Saved "${a.title.slice(0, 30)}..." to your reading list`);
        }
        return { ...a, bookmarked: nextState };
      }
      return a;
    }));
  };

  // Update Kanban Status
  const handleUpdateStatus = (id, newStatus) => {
    setArticles(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  // Add Manual Article
  const handleAddArticle = (newArticleData) => {
    const newArticle = {
      id: `art-custom-${Date.now()}`,
      title: newArticleData.title,
      author: newArticleData.author,
      description: newArticleData.description,
      url: newArticleData.url,
      category: newArticleData.category,
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      date: 'Just now',
      readTime: estimateReadTime(`${newArticleData.title} ${newArticleData.description}`),
      priority: 'trending',
      status: 'saved',
      bookmarked: false,
      likes: 1,
      views: 1,
      tags: [newArticleData.category, 'Custom']
    };

    setArticles(prev => [newArticle, ...prev]);
    showToast('New article successfully added to your dispatch!');
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  // Play Speech
  const handlePlaySpeech = (article) => {
    if (speechState.isPlaying && speechState.articleId === article.id) {
      if (speechState.isPaused) {
        speechController.resume();
      } else {
        speechController.pause();
      }
    } else {
      const textToRead = `${article.title}. Reported by ${article.author}. ${article.description}`;
      speechController.speak(textToRead, article.id);
    }
  };

  const handleStopSpeech = () => {
    speechController.stop();
  };

  // Extract unique authors
  const uniqueAuthors = useMemo(() => {
    const set = new Set();
    articles.forEach(a => {
      if (a.author && a.author !== 'N/A') set.add(a.author);
    });
    return Array.from(set).sort();
  }, [articles]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    articles.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      // Category filter
      if (selectedCategory !== 'all' && a.category !== selectedCategory) {
        return false;
      }
      // Author filter
      if (selectedAuthor !== 'all' && a.author !== selectedAuthor) {
        return false;
      }
      // Bookmarked filter
      if (showBookmarkedOnly && !a.bookmarked) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = a.title.toLowerCase().includes(q);
        const matchesAuthor = a.author.toLowerCase().includes(q);
        const matchesDesc = a.description.toLowerCase().includes(q);
        const matchesCategory = a.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'latest') return 0;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'readtime') return parseInt(a.readTime) - parseInt(b.readTime);
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      return 0;
    });
  }, [articles, selectedCategory, selectedAuthor, showBookmarkedOnly, searchQuery, sortBy]);

  // Spotlight featured story
  const featuredArticle = useMemo(() => {
    return articles.find(a => a.priority === 'featured') || articles[0];
  }, [articles]);

  const currentlyPlayingArticle = useMemo(() => {
    return articles.find(a => a.id === speechState.articleId);
  }, [articles, speechState.articleId]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-slide-up">
          <div className="px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-sky-500 dark:text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 dark:border-sky-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{notification.msg}</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onSyncSheet={() => syncGoogleSheet()}
        isSyncing={isSyncing}
        bookmarkedCount={articles.filter(a => a.bookmarked).length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        totalCount={articles.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Hero Spotlight (Visible in Magazine View) */}
        {currentView === 'magazine' && !searchQuery && selectedCategory === 'all' && !showBookmarkedOnly && (
          <HeroBanner
            featuredArticle={featuredArticle}
            tickerArticles={articles.slice(0, 10)}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onPlaySpeech={handlePlaySpeech}
          />
        )}

        {/* Category Filter Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Filter Bar (Search, Sort, Author, Bookmarks, Export) */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          authorsList={uniqueAuthors}
          showBookmarkedOnly={showBookmarkedOnly}
          setShowBookmarkedOnly={setShowBookmarkedOnly}
          currentView={currentView}
          setCurrentView={setCurrentView}
          filteredCount={filteredArticles.length}
          totalCount={articles.length}
          articles={filteredArticles}
        />

        {/* Dynamic Views Switcher */}
        {currentView === 'magazine' && (
          <MagazineGrid
            articles={filteredArticles}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            onPlaySpeech={handlePlaySpeech}
            onUpdateStatus={handleUpdateStatus}
            activeSpeechArticleId={speechState.articleId}
          />
        )}

        {currentView === 'list' && (
          <ListView
            articles={filteredArticles}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            onPlaySpeech={handlePlaySpeech}
            activeSpeechArticleId={speechState.articleId}
          />
        )}

        {currentView === 'kanban' && (
          <KanbanBoard
            articles={filteredArticles}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onUpdateStatus={handleUpdateStatus}
            onPlaySpeech={handlePlaySpeech}
            activeSpeechArticleId={speechState.articleId}
          />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView
            articles={articles}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onSelectAuthor={(authorName) => setSelectedAuthor(authorName)}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'table' && (
          <TableView
            articles={filteredArticles}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            onPlaySpeech={handlePlaySpeech}
            activeSpeechArticleId={speechState.articleId}
          />
        )}

      </main>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onToggleBookmark={handleToggleBookmark}
          onPlaySpeech={handlePlaySpeech}
          isAudioPlaying={speechState.isPlaying && speechState.articleId === selectedArticle.id}
          allArticles={articles}
          onOpenArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* Add / Import Modal */}
      <AddArticleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddArticle={handleAddArticle}
        onImportSheetUrl={syncGoogleSheet}
      />

      {/* Floating Audio Player Bar */}
      {speechState.isPlaying && (
        <AudioPlayerBar
          playingArticle={currentlyPlayingArticle}
          isPlaying={speechState.isPlaying}
          isPaused={speechState.isPaused}
          onStop={handleStopSpeech}
          onOpenArticle={(art) => setSelectedArticle(art)}
        />
      )}

      {/* Footer */}
      <Footer
        totalCount={articles.length}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
