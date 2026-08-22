export function exportToCSV(articles, filename = 'chronicle_pulse_articles.csv') {
  if (!articles || !articles.length) return;

  const headers = ['ID', 'Title', 'Author', 'Category', 'Description', 'URL', 'Date', 'ReadTime'];
  const rows = articles.map(a => [
    `"${a.id || ''}"`,
    `"${(a.title || '').replace(/"/g, '""')}"`,
    `"${(a.author || '').replace(/"/g, '""')}"`,
    `"${a.category || ''}"`,
    `"${(a.description || '').replace(/"/g, '""')}"`,
    `"${a.url || ''}"`,
    `"${a.date || ''}"`,
    `"${a.readTime || ''}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(articles, filename = 'chronicle_pulse_articles.json') {
  if (!articles || !articles.length) return;

  const dataStr = JSON.stringify(articles, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
