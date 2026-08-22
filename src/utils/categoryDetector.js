export const CATEGORIES = [
  { id: 'all', label: 'All Stories', icon: 'Sparkles', color: 'sky' },
  { id: 'heritage', label: 'Madras Heritage', icon: 'Landmark', color: 'amber' },
  { id: 'politics', label: 'Politics & Governance', icon: 'Scale', color: 'red' },
  { id: 'opinion', label: 'Opinion & Editorial', icon: 'Feather', color: 'emerald' },
  { id: 'cinema', label: 'Cinema & Reviews', icon: 'Film', color: 'purple' },
  { id: 'podcasts', label: 'Podcasts & In Focus', icon: 'Mic', color: 'pink' },
  { id: 'lifestyle', label: 'Living & Design', icon: 'Home', color: 'orange' },
  { id: 'sports', label: 'Sports', icon: 'Trophy', color: 'lime' },
  { id: 'tech-health', label: 'Tech, Science & Health', icon: 'Cpu', color: 'cyan' },
  { id: 'culture-food', label: 'Culture & Dining', icon: 'Utensils', color: 'yellow' },
  { id: 'education', label: 'Education & Books', icon: 'BookOpen', color: 'indigo' },
];

export function detectCategory(title = '', url = '', description = '') {
  const text = `${title} ${url} ${description}`.toLowerCase();

  if (text.includes('madras') || text.includes('chennai') || text.includes('dare house') || text.includes('safire') || text.includes('siddhavatam')) {
    return 'heritage';
  }
  if (text.includes('movie review') || text.includes('trailer') || text.includes('cinema') || text.includes('films') || text.includes('sowcar') || text.includes('chiranjeevi') || text.includes('statham') || text.includes('insidious') || text.includes('irumudi') || text.includes('netflix') || text.includes('hbo')) {
    return 'cinema';
  }
  if (text.includes('podcast') || text.includes('in focus')) {
    return 'podcasts';
  }
  if (text.includes('editorial') || text.includes('op-ed') || text.includes('lead') || text.includes('verdict') || text.includes('protest be dialogue') || text.includes('byline') || text.includes('opinion')) {
    return 'opinion';
  }
  if (text.includes('bathroom') || text.includes('kitchen') || text.includes('luxury home') || text.includes('dubai') || text.includes('homes-and-gardens') || text.includes('onam')) {
    return 'lifestyle';
  }
  if (text.includes('sport') || text.includes('badminton') || text.includes('fitness') || text.includes('mayank') || text.includes('treesa')) {
    return 'sports';
  }
  if (text.includes('chatgpt') || text.includes('vaccine') || text.includes('gaganyaan') || text.includes('ebola') || text.includes('tech') || text.includes('coffee and health') || text.includes('fdcs') || text.includes('brics')) {
    return 'tech-health';
  }
  if (text.includes('mittai') || text.includes('cocktails') || text.includes('restaurant') || text.includes('food') || text.includes('dining')) {
    return 'culture-food';
  }
  if (text.includes('ugc-net') || text.includes('engineering season') || text.includes('books') || text.includes('comic') || text.includes('education') || text.includes('symbiosis') || text.includes('ncert') || text.includes('colleges')) {
    return 'education';
  }
  if (text.includes('rahul') || text.includes('bjp') || text.includes('dmk') || text.includes('mha') || text.includes('fir') || text.includes('minister') || text.includes('fdi') || text.includes('court') || text.includes('parliament') || text.includes('national') || text.includes('assam')) {
    return 'politics';
  }

  return 'politics';
}

export function estimateReadTime(text = '') {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(Math.max(words, 150) / 120);
  return `${minutes} min read`;
}

export const CATEGORY_GRADIENTS = {
  heritage: 'from-amber-500/20 via-amber-500/5 to-transparent border-amber-500/30 text-amber-500',
  politics: 'from-rose-500/20 via-rose-500/5 to-transparent border-rose-500/30 text-rose-500',
  opinion: 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30 text-emerald-500',
  cinema: 'from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/30 text-purple-500',
  podcasts: 'from-pink-500/20 via-pink-500/5 to-transparent border-pink-500/30 text-pink-500',
  lifestyle: 'from-orange-500/20 via-orange-500/5 to-transparent border-orange-500/30 text-orange-500',
  sports: 'from-lime-500/20 via-lime-500/5 to-transparent border-lime-500/30 text-lime-500',
  'tech-health': 'from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-500/30 text-cyan-500',
  'culture-food': 'from-yellow-500/20 via-yellow-500/5 to-transparent border-yellow-500/30 text-yellow-500',
  education: 'from-indigo-500/20 via-indigo-500/5 to-transparent border-indigo-500/30 text-indigo-500',
};

export const CATEGORY_BADGES = {
  heritage: { bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', label: 'Madras Heritage' },
  politics: { bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', label: 'Politics & National' },
  opinion: { bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', label: 'Editorial & Opinion' },
  cinema: { bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', label: 'Cinema & Entertainment' },
  podcasts: { bg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20', label: 'Podcast & Audio' },
  lifestyle: { bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', label: 'Homes & Living' },
  sports: { bg: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20', label: 'Sports Spotlight' },
  'tech-health': { bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20', label: 'Sci-Tech & Health' },
  'culture-food': { bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20', label: 'Culture & Food' },
  education: { bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20', label: 'Education & Reads' },
};
