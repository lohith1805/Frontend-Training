// ui.js — DOM rendering and UI helpers

export function showPage(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const page = document.getElementById(pageId);
  if (page) page.classList.add("active");
}

export function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast toast--${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

export function renderStats(students) {
  document.getElementById("stat-total").textContent = students.length;
  const grades = students.map((s) => parseFloat(s.grade)).filter(Boolean);
  const avg = grades.length
    ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1)
    : "—";
  document.getElementById("stat-avg").textContent = avg;
  const courses = new Set(students.map((s) => s.course)).size;
  document.getElementById("stat-courses").textContent = courses;
}

export function renderTable(students, onEdit, onDelete) {
  const tbody = document.getElementById("students-tbody");
  if (!students.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-row">No students found. Add one above!</td></tr>`;
    return;
  }
  tbody.innerHTML = students
    .map(
      (s) => `
    <tr>
      <td>${escapeHtml(s.name)}</td>
      <td>${escapeHtml(s.email)}</td>
      <td>${escapeHtml(s.course)}</td>
      <td><span class="grade-badge grade-${gradeClass(s.grade)}">${s.grade}</span></td>
      <td>${s.enrolledDate}</td>
      <td class="action-cell">
        <button class="btn-icon btn-edit" data-id="${s.id}" title="Edit">✏️</button>
        <button class="btn-icon btn-delete" data-id="${s.id}" title="Delete">🗑️</button>
      </td>
    </tr>`
    )
    .join("");

  tbody.querySelectorAll(".btn-edit").forEach((btn) =>
    btn.addEventListener("click", () => onEdit(btn.dataset.id))
  );
  tbody.querySelectorAll(".btn-delete").forEach((btn) =>
    btn.addEventListener("click", () => onDelete(btn.dataset.id))
  );
}

export function openModal(student = null) {
  const modal = document.getElementById("student-modal");
  const title = document.getElementById("modal-title");
  const form = document.getElementById("student-form");
  form.reset();
  if (student) {
    title.textContent = "Edit Student";
    document.getElementById("field-name").value = student.name;
    document.getElementById("field-email").value = student.email;
    document.getElementById("field-course").value = student.course;
    document.getElementById("field-grade").value = student.grade;
    form.dataset.editId = student.id;
  } else {
    title.textContent = "Add Student";
    delete form.dataset.editId;
  }
  modal.classList.add("open");
}

export function closeModal() {
  document.getElementById("student-modal").classList.remove("open");
}

function gradeClass(grade) {
  const g = parseFloat(grade);
  if (g >= 90) return "a";
  if (g >= 80) return "b";
  if (g >= 70) return "c";
  return "d";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
