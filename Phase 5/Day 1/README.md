# 📁 User Directory Application
### Phase 5 · Day 1 — API Calls, Fetch API & JSON

---

## 📌 Project Overview

A responsive **User Directory** that fetches live data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) and displays user profiles in a clean card-based layout.

---

## 🎯 Learning Goals Covered

| Concept | How It's Used |
|---|---|
| `Fetch API` | `fetch('https://jsonplaceholder.typicode.com/users')` to get user data |
| `JSON` | `response.json()` to parse the API response |
| `Async / Await` | `async fetchUsers()` with `await` for clean async handling |
| `DOM Manipulation` | Dynamically creating and appending user cards to the grid |
| `Error Handling` | `try...catch` block shows an error message if the fetch fails |

---

## 🚀 Features

- ✅ Fetches 10 real users from JSONPlaceholder API
- ✅ Displays Name, Email, Phone, Website, City and Company per user
- ✅ Avatar with user initials generated automatically
- ✅ Live search — filter by name, email or company
- ✅ Loading spinner shown while data loads
- ✅ Error message shown if API call fails
- ✅ Responsive grid layout (works on mobile & desktop)
- ✅ Smooth card hover animations

---

## 🗂️ File Structure

```
day1-user-directory/
├── index.html      ← App structure & layout
├── style.css       ← All styling (dark theme, grid, cards)
├── app.js          ← Fetch logic, DOM rendering, search
└── README.md       ← This file
```

---

## ▶️ How to Run

1. Open the project folder
2. Double-click `index.html` — it opens directly in any browser
3. No server or install needed!

> **Note:** An active internet connection is required to fetch data from the JSONPlaceholder API.

---

## 🔗 API Used

**JSONPlaceholder** — `https://jsonplaceholder.typicode.com/users`
- Free, public REST API for testing
- Returns 10 mock users with realistic data
- No authentication required

---

## 🖥️ UI Components

| Component | Description |
|---|---|
| **Header** | App title with gradient logo |
| **Search Bar** | Real-time filter across name, email, company |
| **Loading Spinner** | Shown while API call is in progress |
| **Error Message** | Shown if fetch fails |
| **User Cards** | One card per user with all details |

---

## 💡 Key Code Concepts

### Fetch with Async/Await
```js
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    renderUsers(data);
  } catch (error) {
    showError(true);
  }
}
```

### DOM Manipulation
```js
const card = document.createElement('div');
card.className = 'user-card';
card.innerHTML = `...`;
userGrid.appendChild(card);
```

---

*Phase 5 Day 1 — Submitted as part of training project*
