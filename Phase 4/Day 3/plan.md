# Phase 4 Day 3 — Student Registration Web Application
## Project Plan

---

## 1. Project Overview

Build a **Student Registration Web Application** that demonstrates:
- DOM Manipulation
- Event Handling
- Form Validation
- Local Storage
- Modern ES6 JavaScript

---

## 2. File Structure

```
student-registration-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── app.js              # JavaScript logic
└── README.md           # Project documentation
```

---

## 3. UI Components

| Component | Description |
|---|---|
| Registration Form | Input fields for Name, Email, Password, Mobile |
| Submit Button | Triggers validation and data save |
| Error Messages | Field-level validation feedback |
| Success Message | Confirmation after successful registration |
| Student Table | Dynamically rendered list of registered students |
| Clear / Delete Buttons | Remove individual or all records |

---

## 4. Form Fields

| Field | Validation Rule |
|---|---|
| Full Name | Must not be empty |
| Email | Must match valid email format (regex) |
| Password | Minimum 6 characters |
| Mobile Number | Must be exactly 10 digits, numbers only |

---

## 5. JavaScript Features to Implement

### ES6 Concepts Used
- `const` / `let` (no `var`)
- Arrow Functions `() => {}`
- Template Literals `` `Hello ${name}` ``
- Destructuring
- Spread Operator
- Array methods: `.map()`, `.filter()`, `.forEach()`

### DOM Manipulation
- `document.getElementById()`
- `document.querySelector()`
- `innerHTML` / `textContent`
- Dynamic table row creation

### Event Handling
- `addEventListener()` on form submit
- Click events for delete buttons
- Input events for live validation feedback

### Local Storage
- `localStorage.setItem()` — save student array as JSON
- `localStorage.getItem()` — retrieve on page load
- `localStorage.removeItem()` — clear all records
- `JSON.stringify()` / `JSON.parse()`

---

## 6. Validation Logic

```
validateName(name)    → name.trim().length > 0
validateEmail(email)  → /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
validatePassword(pw)  → pw.length >= 6
validateMobile(mob)   → /^\d{10}$/.test(mob)
```

---

## 7. Application Flow

```
User fills form
      ↓
Submit button clicked
      ↓
Validate all fields
      ↓
 [Invalid] → Show error messages under respective fields
      ↓
 [Valid]   → Create student object (ES6)
              → Retrieve existing array from localStorage
              → Push new student
              → Save updated array to localStorage
              → Display success message
              → Render updated table
              → Reset form
```

---

## 8. Design Approach

- **Color Palette:** Deep navy (#1a1f36) background, white cards, accent electric blue (#4f8ef7)
- **Typography:** Clean sans-serif (Inter / system-ui)
- **Layout:** Two-panel — form on left, registered students table on right (responsive stacks on mobile)
- **Signature Element:** Animated success toast notification that slides in on registration

---

## 9. Deliverables Checklist

- [x] `index.html` — Semantic HTML5 structure
- [x] `style.css` — Responsive CSS with validation states
- [x] `app.js` — Full ES6 JavaScript with all features
- [x] `README.md` — Setup and usage instructions
- [x] Form Validation with error messages
- [x] Local Storage persistence (data survives page refresh)
- [x] Dynamic student table rendering
- [x] Delete individual / clear all functionality
