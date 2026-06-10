# 🎓 Student Dashboard

A modular JavaScript single-page application for managing student records, built as part of Phase 5 Day 3 — JavaScript Modules & Web Storage.

---

## 📸 Features

- **Login System** — username/password auth stored in `sessionStorage`
- **Dashboard Stats** — total students, average grade, number of courses
- **Add / Edit / Delete Students** — full CRUD via modal form
- **Search / Filter** — live search across name, email, and course
- **Dark Mode** — theme preference saved in `localStorage`
- **Persistent Data** — all student records survive page reloads via `localStorage`
- **Responsive** — works on mobile and desktop

---

## 🗂️ Project Structure

```
student-dashboard/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── auth.js       ← login / logout / session checks
    ├── storage.js    ← localStorage & sessionStorage helpers
    ├── students.js   ← CRUD logic (add, edit, delete, search)
    ├── ui.js         ← DOM rendering (table, modal, stats, toast)
    └── main.js       ← entry point, wires everything together
```

---

## 🧩 Modules & Concepts Used

| File | Concept | Usage |
|------|---------|-------|
| `auth.js` | sessionStorage | Stores login session |
| `storage.js` | localStorage | Saves students + theme |
| `students.js` | ES Modules | Business logic (CRUD) |
| `ui.js` | DOM + Import/Export | Renders HTML dynamically |
| `main.js` | Import/Export | Wires all modules |

---

## 🚀 How to Run

### Option 1 — VS Code Live Server (recommended)
1. Open the project folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 2 — Python HTTP Server
```bash
cd student-dashboard
python -m http.server 5500
```
Then open `http://localhost:5500` in your browser.

> ⚠️ **Note:** ES Modules (`import`/`export`) require a server. Opening `index.html` directly with `file://` will NOT work.

---

## 🔑 Demo Login

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## 💾 Storage Details

| Data | Storage Type | Key |
|------|-------------|-----|
| Student records | `localStorage` | `students_data` |
| App theme | `localStorage` | `app_theme` |
| Login session | `sessionStorage` | `session` |

---

## 📚 Learning Outcomes

- Organizing a project with **ES Modules** (`import` / `export`)
- Using **localStorage** for persistent client-side storage
- Using **sessionStorage** for temporary session data
- Building a **CRUD interface** with vanilla JavaScript
- Dynamic DOM rendering without a framework

---

## 👨‍💻 Author

Built for Phase 5 Day 3 — JavaScript Modules & Web Storage training task.
