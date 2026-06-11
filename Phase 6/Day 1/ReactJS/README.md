# Day 1 – Company Portfolio React App

## 📌 Overview
A professional Company Portfolio website built with **React** using **JSX** and **Reusable Components** — covering all Day 1 concepts.

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.js       # Fixed navigation with scroll effect & mobile menu
│   ├── Navbar.css
│   ├── Hero.js         # Landing hero with stats
│   ├── Hero.css
│   ├── About.js        # Team + company values
│   ├── About.css
│   ├── Services.js     # Service cards using .map()
│   ├── Services.css
│   ├── Footer.js       # Footer with contact & links
│   └── Footer.css
├── App.js              # Root component – assembles all sections
├── App.css             # Global variables, reset, shared utilities
└── index.js            # React DOM entry point
```

---

## 🧠 Concepts Used

| Concept | Where Used |
|---|---|
| **JSX** | All components use JSX syntax for UI |
| **Components** | 5 separate reusable components |
| **Props** | Data passed into team/service cards via array.map() |
| **CSS Variables** | Design tokens in `App.css` (`:root`) |
| **React Structure** | `App.js` composes all components cleanly |

---

## ✨ Features
- ✅ Sticky Navbar that changes style on scroll
- ✅ Mobile hamburger menu (responsive)
- ✅ Hero section with animated grid background
- ✅ About section with team members & values
- ✅ Services grid with hover effects
- ✅ Footer with contact info
- ✅ Fully responsive (mobile, tablet, desktop)

---

## ▶️ How to Run

### Prerequisites
- Node.js v16+ installed
- npm or yarn

### Steps

```bash
# 1. Navigate into the project folder
cd company-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens at **http://localhost:3000** automatically.

### Build for Production
```bash
npm run build
```
This creates a `build/` folder with the optimized app.

---

## 📖 Key Learning Points

1. **JSX** is just JavaScript that looks like HTML. Every component returns JSX.
2. **Components** are functions that return UI. Keep them small and focused.
3. **App.js** is the root – it imports and renders all child components.
4. **CSS Variables** (`--accent`, `--bg`) make theming easy and consistent.
5. **array.map()** is used to render lists of cards from data arrays (services, team).

---

## 🔧 Customization
- Edit the `team` array in `About.js` to change team members.
- Edit the `services` array in `Services.js` to update service cards.
- Change colors in `App.css` under `:root` to retheme the entire app.
