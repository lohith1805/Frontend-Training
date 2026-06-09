/**
 * EduPortal — Student Registration System
 * Phase 4 · Day 3 · DOM Manipulation & Interactive Web Applications
 *
 * Concepts used:
 *  - DOM Manipulation      → querySelector, innerHTML, createElement
 *  - Event Handling        → addEventListener, submit, click, input
 *  - Form Validation       → Custom regex validators, live feedback
 *  - Local Storage         → getItem, setItem, removeItem, JSON.parse/stringify
 *  - ES6 Features          → const/let, Arrow Functions, Template Literals,
 *                            Destructuring, Spread Operator, Array methods
 */

'use strict';

// ─── DOM References ───────────────────────────────────────────────────────────
const form           = document.getElementById('registrationForm');
const nameInput      = document.getElementById('name');
const emailInput     = document.getElementById('email');
const passwordInput  = document.getElementById('password');
const mobileInput    = document.getElementById('mobile');
const togglePassword = document.getElementById('togglePassword');
const strengthFill   = document.getElementById('strengthFill');
const strengthLabel  = document.getElementById('strengthLabel');
const studentsBody   = document.getElementById('studentsBody');
const tableWrapper   = document.getElementById('tableWrapper');
const emptyState     = document.getElementById('emptyState');
const studentCount   = document.getElementById('studentCount');
const clearAllBtn    = document.getElementById('clearAllBtn');
const toast          = document.getElementById('toast');
const toastMessage   = document.getElementById('toastMessage');

// Local Storage key constant
const STORAGE_KEY = 'eduportal_students';


// ─── Validation Rules (ES6 Arrow Functions + Regex) ──────────────────────────

const validators = {
  name:     (val) => val.trim().length > 0,
  email:    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  password: (val) => val.length >= 6,
  mobile:   (val) => /^\d{10}$/.test(val.trim()),
};

const errorMessages = {
  name:     '⚠ Full name cannot be empty.',
  email:    '⚠ Please enter a valid email address.',
  password: '⚠ Password must be at least 6 characters.',
  mobile:   '⚠ Mobile number must be exactly 10 digits.',
};


// ─── Utility: Show / Hide Error ───────────────────────────────────────────────

const showError = (fieldId, message) => {
  const group = document.getElementById(`${fieldId}Group`);
  const errEl = document.getElementById(`${fieldId}Error`);
  group.classList.remove('valid');
  group.classList.add('invalid');
  errEl.textContent = message;
  errEl.classList.add('visible');
};

const clearError = (fieldId) => {
  const group = document.getElementById(`${fieldId}Group`);
  const errEl = document.getElementById(`${fieldId}Error`);
  group.classList.remove('invalid');
  group.classList.add('valid');
  errEl.textContent = '';
  errEl.classList.remove('visible');
};

const resetFieldState = (fieldId) => {
  const group = document.getElementById(`${fieldId}Group`);
  const errEl = document.getElementById(`${fieldId}Error`);
  group.classList.remove('valid', 'invalid');
  errEl.textContent = '';
  errEl.classList.remove('visible');
};


// ─── Password Strength Meter ──────────────────────────────────────────────────

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6)  score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const updateStrengthMeter = (password) => {
  if (!password) {
    strengthFill.style.width = '0%';
    strengthFill.style.backgroundColor = 'transparent';
    strengthLabel.textContent = '';
    return;
  }

  const score = getPasswordStrength(password);

  // ES6 Destructuring to get label + color
  const levels = [
    { label: 'Weak',      color: '#f87171', width: '20%'  },
    { label: 'Weak',      color: '#f87171', width: '20%'  },
    { label: 'Fair',      color: '#fbbf24', width: '50%'  },
    { label: 'Good',      color: '#60a5fa', width: '75%'  },
    { label: 'Strong',    color: '#34d399', width: '90%'  },
    { label: 'Very Strong', color: '#34d399', width: '100%' },
  ];

  const { label, color, width } = levels[score];
  strengthFill.style.width = width;
  strengthFill.style.backgroundColor = color;
  strengthLabel.textContent = label;
  strengthLabel.style.color = color;
};


// ─── Validate All Fields → Returns Boolean ────────────────────────────────────

const validateForm = () => {
  const fields = ['name', 'email', 'password', 'mobile'];
  let isValid = true;

  // Use forEach (ES6 Array Method) to validate each field
  fields.forEach((field) => {
    const inputEl = document.getElementById(field);
    const value = inputEl.value;

    if (!validators[field](value)) {
      showError(field, errorMessages[field]);
      isValid = false;
    } else {
      clearError(field);
    }
  });

  return isValid;
};


// ─── Local Storage Helpers ────────────────────────────────────────────────────

const getStudents = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveStudents = (students) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};


// ─── Format Date Utility ──────────────────────────────────────────────────────

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};


// ─── Create Table Row (Template Literals + Destructuring) ─────────────────────

const createStudentRow = (student, index, isNew = false) => {
  const { id, name, email, mobile, registeredAt } = student;
  const row = document.createElement('tr');
  if (isNew) row.classList.add('row-new');

  // Template Literal for inner HTML
  row.innerHTML = `
    <td class="row-num">${index + 1}</td>
    <td class="cell-name">${escapeHtml(name)}</td>
    <td class="cell-email">${escapeHtml(email)}</td>
    <td class="cell-mobile">${escapeHtml(mobile)}</td>
    <td class="cell-date">${formatDate(registeredAt)}</td>
    <td>
      <button class="btn-delete" data-id="${id}" aria-label="Delete ${escapeHtml(name)}">
        Delete
      </button>
    </td>
  `;

  return row;
};

// XSS protection helper
const escapeHtml = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// ─── Render Table ─────────────────────────────────────────────────────────────

const renderTable = (highlightNewId = null) => {
  const students = getStudents();

  // Update count badge using Template Literal
  studentCount.textContent = `${students.length} student${students.length !== 1 ? 's' : ''}`;

  if (students.length === 0) {
    tableWrapper.style.display = 'none';
    emptyState.style.display   = 'flex';
    return;
  }

  tableWrapper.style.display = 'block';
  emptyState.style.display   = 'none';

  // Clear and rebuild rows using map (ES6 Array Method)
  studentsBody.innerHTML = '';
  students.forEach((student, index) => {
    const isNew = student.id === highlightNewId;
    const row = createStudentRow(student, index, isNew);
    studentsBody.appendChild(row);
  });
};


// ─── Show Toast Notification ──────────────────────────────────────────────────

let toastTimer = null;

const showToast = (message = 'Action completed!', type = 'success') => {
  toastMessage.textContent = message;
  toast.style.background = type === 'success' ? 'var(--success)' : 'var(--error)';
  toast.style.color = type === 'success' ? '#0a2e20' : '#fff';
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};


// ─── Register Student ─────────────────────────────────────────────────────────

const registerStudent = () => {
  if (!validateForm()) return;

  // ES6 Object with shorthand properties
  const newStudent = {
    id:           `stu_${Date.now()}`,
    name:         nameInput.value.trim(),
    email:        emailInput.value.trim().toLowerCase(),
    mobile:       mobileInput.value.trim(),
    registeredAt: new Date().toISOString(),
  };

  // Spread Operator: create new array without mutating original
  const existing = getStudents();
  const updated  = [...existing, newStudent];

  saveStudents(updated);
  renderTable(newStudent.id);

  // Reset form and field states
  form.reset();
  ['name', 'email', 'password', 'mobile'].forEach(resetFieldState);
  updateStrengthMeter('');

  showToast(`${newStudent.name} registered successfully!`);
};


// ─── Delete Single Student ────────────────────────────────────────────────────

const deleteStudent = (id) => {
  const students = getStudents();

  // Array .filter() — ES6 method
  const updated = students.filter((s) => s.id !== id);
  saveStudents(updated);
  renderTable();
  showToast('Student record removed.', 'error');
};


// ─── Clear All Students ───────────────────────────────────────────────────────

const clearAllStudents = () => {
  if (getStudents().length === 0) return;
  const confirmed = window.confirm('Are you sure you want to delete all student records?');
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  renderTable();
  showToast('All records cleared.', 'error');
};


// ─── Live Validation on Input (Event Listeners) ───────────────────────────────

const attachLiveValidation = (inputEl, fieldId) => {
  inputEl.addEventListener('input', () => {
    const value = inputEl.value;
    if (value.trim() === '') {
      resetFieldState(fieldId);
    } else if (validators[fieldId](value)) {
      clearError(fieldId);
    } else {
      showError(fieldId, errorMessages[fieldId]);
    }
  });
};

attachLiveValidation(nameInput,     'name');
attachLiveValidation(emailInput,    'email');
attachLiveValidation(mobileInput,   'mobile');

// Password has additional strength meter
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  updateStrengthMeter(val);
  if (val === '') {
    resetFieldState('password');
  } else if (validators.password(val)) {
    clearError('password');
  } else {
    showError('password', errorMessages.password);
  }
});

// Only allow numeric input for mobile
mobileInput.addEventListener('keypress', (e) => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});


// ─── Toggle Password Visibility ───────────────────────────────────────────────

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.textContent = isPassword ? '🙈' : '👁';
});


// ─── Form Submit Event ────────────────────────────────────────────────────────

form.addEventListener('submit', (e) => {
  e.preventDefault();
  registerStudent();
});


// ─── Delegated Click Event for Delete Buttons ─────────────────────────────────
// Event Delegation: one listener on tbody handles all delete clicks

studentsBody.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-delete');
  if (!btn) return;

  const { id } = btn.dataset;  // ES6 Destructuring from dataset
  deleteStudent(id);
});


// ─── Clear All Button ─────────────────────────────────────────────────────────

clearAllBtn.addEventListener('click', clearAllStudents);


// ─── Init: Load Data on Page Load ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
});
