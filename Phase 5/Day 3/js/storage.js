// storage.js — localStorage helpers for students and theme

const STUDENTS_KEY = "students_data";
const THEME_KEY = "app_theme";

export function getStudents() {
  try {
    const data = localStorage.getItem(STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function clearAll() {
  localStorage.removeItem(STUDENTS_KEY);
}
