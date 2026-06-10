// main.js — app entry point, wires all modules together

import { login, logout, isLoggedIn, getSession } from "./auth.js";
import { getTheme, saveTheme } from "./storage.js";
import {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
} from "./students.js";
import {
  showPage,
  showToast,
  renderStats,
  renderTable,
  openModal,
  closeModal,
} from "./ui.js";

// ── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getTheme());
  if (isLoggedIn()) {
    initDashboard();
  } else {
    showPage("login-page");
  }
  wireEvents();
});

// ── Auth ──────────────────────────────────────────────────────────────────────
function wireEvents() {
  // Login
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const result = login(username, password);
    if (result.success) {
      initDashboard();
    } else {
      document.getElementById("login-error").textContent = result.message;
    }
  });

  // Logout
  document.getElementById("btn-logout").addEventListener("click", () => {
    logout();
    showPage("login-page");
    document.getElementById("login-form").reset();
    document.getElementById("login-error").textContent = "";
  });

  // Theme toggle
  document.getElementById("btn-theme").addEventListener("click", () => {
    const next = getTheme() === "light" ? "dark" : "light";
    saveTheme(next);
    applyTheme(next);
  });

  // Add student
  document.getElementById("btn-add-student").addEventListener("click", () =>
    openModal()
  );

  // Modal form submit
  document.getElementById("student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: document.getElementById("field-name").value,
      email: document.getElementById("field-email").value,
      course: document.getElementById("field-course").value,
      grade: document.getElementById("field-grade").value,
    };
    if (form.dataset.editId) {
      updateStudent(form.dataset.editId, data);
      showToast("Student updated successfully.");
    } else {
      addStudent(data);
      showToast("Student added successfully.");
    }
    closeModal();
    refreshTable();
  });

  // Close modal
  document.getElementById("btn-modal-close").addEventListener("click", closeModal);
  document.getElementById("student-modal").addEventListener("click", (e) => {
    if (e.target.id === "student-modal") closeModal();
  });

  // Search
  document.getElementById("search-input").addEventListener("input", (e) => {
    const results = e.target.value.trim()
      ? searchStudents(e.target.value)
      : getAllStudents();
    renderTable(results, handleEdit, handleDelete);
  });
}

function initDashboard() {
  showPage("dashboard-page");
  const session = getSession();
  if (session) {
    document.getElementById("welcome-user").textContent = session.username;
  }
  refreshTable();
}

function refreshTable() {
  const students = getAllStudents();
  renderStats(students);
  renderTable(students, handleEdit, handleDelete);
}

function handleEdit(id) {
  const student = getAllStudents().find((s) => s.id === id);
  if (student) openModal(student);
}

function handleDelete(id) {
  if (confirm("Delete this student? This cannot be undone.")) {
    deleteStudent(id);
    showToast("Student deleted.", "error");
    refreshTable();
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("btn-theme");
  if (btn) btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}
