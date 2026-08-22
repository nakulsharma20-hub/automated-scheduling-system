# 🌐 Chronicle Pulse — Modern News & Content Intelligence Hub

> A high-performance, visually stunning frontend application built for the **The Hindu Curated Google Sheets Dataset** (`https://docs.google.com/spreadsheets/d/1px6nE2KLE9NapM_YloQZ9Fvso1g5l0OCUS_0lrNlEoc/edit`).

---

## ✨ Key Highlights & Features

1. **🌟 5 Specialized Interactive Views**:
   - 📰 **Magazine Grid View**: Hero featured story spotlight, breaking news live ticker, category badges, author chips, view/read time counters, and quick actions.
   - 📋 **Feed / Compact Stream View**: Dense editorial timeline for rapid scanning.
   - 🗂️ **Interactive Kanban Reading Board**: Move articles across `Saved for Later` ➔ `Currently Reading` ➔ `Completed & Read`.
   - 📊 **Analytics & Intelligence Dashboard**: Interactive Recharts Donut distribution chart and Top Columnists Bar Chart, with key metrics and click-to-filter capability.
   - 🗃️ **Data Explorer Table**: Sortable columns, search filter, row multi-select, pagination, and one-click **CSV / JSON exports**.

2. **🔊 Built-in Web Speech AI Voice Reader**:
   - Listen to article headlines and executive summaries with natural text-to-speech voice narration.
   - Floating audio player docked at the bottom with play/pause, voice speed adjustment (0.75x to 1.5x), and live animated audio soundwaves.

3. **📖 Distraction-Free Reader Mode**:
   - Clean modal popup with adjustable typography size (`A-`, `A`, `A+`).
   - Direct deep-links to full original coverage on *The Hindu*.
   - Contextual related articles in the same category.

4. **⚡ Live Google Sheets Sync & Custom Ingestion**:
   - Re-syncs live with Google Sheets CSV export endpoint with celebratory confetti animations.
   - Modal to manually insert breaking stories or connect custom Google Sheets URLs.

5. **🎨 Dark / Light Mode & Theme Persistence**:
   - Seamless dark/light theme switching with instant localStorage persistence.

---

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   👉 **http://localhost:3000**

