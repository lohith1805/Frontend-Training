# 🎓 EduPortal — Student Registration System

**Phase 4 · Day 3 · DOM Manipulation & Interactive Web Applications**

---

## Overview

A fully functional Student Registration Web Application built with vanilla HTML, CSS, and JavaScript (ES6). No frameworks or libraries — pure DOM manipulation and browser APIs.

---

## Features

- **Registration Form** with 4 fields: Name, Email, Password, Mobile
- **Real-time Validation** — feedback appears as you type
- **Password Strength Meter** — visual strength indicator
- **Local Storage Persistence** — data survives page refresh/close
- **Dynamic Student Table** — auto-updates on every registration
- **Delete Individual** records or **Clear All** at once
- **Toast Notifications** — animated feedback on actions
- **Responsive Design** — works on mobile and desktop

---

## How to Run

1. **Download or clone** this project folder.
2. Open `index.html` in any modern web browser.
3. No server or build step required.

---

## File Structure

```
student-registration-app/
├── index.html   → HTML structure and layout
├── style.css    → Styling, animations, responsive design
├── app.js       → All JavaScript logic
└── README.md    → This file
```

---

## Validation Rules

| Field | Rule |
|-------|------|
| Full Name | Cannot be empty |
| Email | Must be valid format (user@domain.ext) |
| Password | Minimum 6 characters |
| Mobile | Exactly 10 digits, numbers only |

---

## JavaScript Concepts Used

| Concept | Where Used |
|---------|------------|
| `const` / `let` | All variable declarations |
| Arrow Functions `() => {}` | Validators, event handlers, utilities |
| Template Literals | Table row HTML, toast messages, count badge |
| Destructuring | Student object fields, DOM dataset |
| Spread Operator `...` | Creating updated students array |
| `Array.forEach()` | Rendering rows, field validation loop |
| `Array.filter()` | Deleting a student by ID |
| `addEventListener()` | Form submit, input, click, DOMContentLoaded |
| `localStorage` | Save, load, remove student data |
| `JSON.stringify/parse` | Serialize/deserialize student array |
| Event Delegation | Single listener on tbody for delete buttons |

---

## Screenshots

Open `index.html` in your browser to see:
1. The registration form with live validation
2. The student table populated after registration
3. Toast notification on success
4. Password strength meter updating as you type

---

## Author Notes

- All data is stored client-side in `localStorage` under the key `eduportal_students`.
- The application requires no internet connection.
- XSS protection is implemented via `escapeHtml()` before rendering user data.
