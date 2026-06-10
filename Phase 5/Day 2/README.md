# 👔 Employee Management System
### Phase 5 · Day 2 — Error Handling, Authentication & CRUD Operations

---

## 📌 Project Overview

A complete **Employee Management System** with a login/authentication screen and a full CRUD dashboard to manage employee records. All data is stored in memory using JavaScript arrays and objects.

---

## 🎯 Learning Goals Covered

| Concept | How It's Used |
|---|---|
| `try...catch` | Wraps all login, CRUD, and delete operations to handle errors gracefully |
| `Validation` | Email format check, password strength check, required field checks |
| `CRUD` | Create, Read, Update, Delete employees from in-memory array |
| `Arrays & Objects` | `state.employees` array stores employee objects `{ id, name, role, email, salary }` |
| `Authentication` | Login form with email/password validation and credential matching |
| `DOM Manipulation` | Dynamic table rendering, modal control, alert messages |

---

## 🔐 Login Credentials

```
Email:    admin@company.com
Password: Admin@123
```

**Password rules enforced:**
- Minimum 6 characters
- At least one uppercase letter
- At least one number
- At least one special character

---

## 🚀 Features

### Authentication Module
- ✅ Login form with email and password fields
- ✅ Email format validation
- ✅ Password strength validation
- ✅ Field-level error messages
- ✅ Login success / error alert messages
- ✅ Show/hide password toggle
- ✅ Logout button

### Employee CRUD
- ✅ **Add** new employees with Name, Role, Salary, Email
- ✅ **View** all employees in a sortable table
- ✅ **Edit** any employee (pre-fills form, updates in place)
- ✅ **Delete** with a confirmation modal (prevents accidental deletes)

### Extra Features
- ✅ Live search — filter by name, role, or email
- ✅ Stats bar — Total Employees, Avg Salary, Unique Roles
- ✅ Duplicate email detection
- ✅ All errors caught with `try...catch` and shown as user-friendly messages
- ✅ Responsive layout (mobile + desktop)
- ✅ XSS-safe rendering with `escapeHtml()`

---

## 🗂️ File Structure

```
day2-employee-management/
├── index.html      ← Login screen + Dashboard layout
├── style.css       ← Full styling (light professional theme)
├── app.js          ← Auth logic, CRUD, validation, error handling
└── README.md       ← This file
```

---

## ▶️ How to Run

1. Open the project folder
2. Double-click `index.html` — opens directly in any browser
3. No server, no install, no internet needed!

---

## 🖥️ UI Components

| Component | Description |
|---|---|
| **Login Form** | Email + password with validation |
| **Alert Messages** | Success / error / info banners |
| **Employee Form** | Add or edit employees (shared form) |
| **Employee Table** | Lists all employees with Edit & Delete buttons |
| **Delete Modal** | Confirmation dialog before removing an employee |
| **Stats Bar** | Live count of employees, avg salary, unique roles |
| **Search Bar** | Real-time table filter |

---

## 💡 Key Code Concepts

### try...catch Error Handling
```js
function handleSaveEmployee() {
  try {
    // validation and save logic
  } catch (err) {
    console.error('Save employee error:', err);
    showAlert(formAlert, 'error', `❌ Error: ${err.message}`);
  }
}
```

### CRUD with Arrays & Objects
```js
// CREATE
state.employees.push({ id: state.nextId++, name, role, email, salary });

// READ
state.employees.find(emp => emp.id === id);

// UPDATE
state.employees[index] = { ...state.employees[index], name, role, email, salary };

// DELETE
state.employees.splice(index, 1);
```

### Email Validation
```js
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
```

---

*Phase 5 Day 2 — Submitted as part of training project*
