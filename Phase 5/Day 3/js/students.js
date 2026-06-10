// students.js — CRUD logic for student records

import { getStudents, saveStudents } from "./storage.js";

export function getAllStudents() {
  return getStudents();
}

export function addStudent(student) {
  const students = getStudents();
  const newStudent = {
    id: Date.now().toString(),
    name: student.name.trim(),
    email: student.email.trim(),
    grade: student.grade,
    course: student.course.trim(),
    enrolledDate: new Date().toLocaleDateString("en-IN"),
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
}

export function updateStudent(id, updatedData) {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return null;
  students[index] = { ...students[index], ...updatedData };
  saveStudents(students);
  return students[index];
}

export function deleteStudent(id) {
  const students = getStudents().filter((s) => s.id !== id);
  saveStudents(students);
}

export function searchStudents(query) {
  const q = query.toLowerCase();
  return getStudents().filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q)
  );
}
