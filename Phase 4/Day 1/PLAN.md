# Phase 4 Day 1 — Student Result Management Program
## Plan Document

---

## 📋 Task Overview

Build a **Student Result Management Program** using core JavaScript concepts:
- Variables
- Data Types
- Operators
- Conditions
- Loops

---

## 🎯 Goals

| Goal | Description |
|------|-------------|
| Variables | Store student name, marks, attendance |
| Data Types | Strings (name), Numbers (marks), Booleans (attendance) |
| Operators | Arithmetic to calculate totals and averages |
| Conditions | if/else to determine pass/fail and assign grades |
| Loops | Iterate over multiple student records and print results |

---

## 🧩 Features to Implement

1. **Store Student Details** — using variables and arrays of objects
2. **Calculate Total Marks** — using arithmetic operators
3. **Check Pass/Fail Condition** — using if/else conditions
4. **Display Grades** — using grade logic (A/B/C/Fail)
5. **Print Results via Loops** — using `for...of` loop over student array

---

## 📐 Grade Logic

| Score Range | Grade |
|-------------|-------|
| 90 and above | A |
| 75 – 89 | B |
| 50 – 74 | C |
| Below 50 | Fail |

---

## 🗂️ Data Structure Plan

Each student record will hold:
- `name` → String
- `marks` → Array of Numbers (5 subjects)
- `attendance` → Boolean (true = present, false = absent)

Computed fields (derived during processing):
- `total` → sum of all marks
- `average` → total / number of subjects
- `grade` → computed from average using grade logic
- `status` → "Pass" or "Fail"

---

## 🏗️ Program Structure

```
student-result-management/
├── PLAN.md              ← This file
├── README.md            ← Project documentation
├── student_results.js   ← Main JavaScript program
```

---

## 🔄 Program Flow

```
START
  │
  ├── Define student data array (5 students)
  │
  ├── Loop through each student
  │     ├── Calculate total marks (reduce/loop)
  │     ├── Calculate average
  │     ├── Determine grade (if/else chain)
  │     ├── Determine pass/fail status
  │     └── Print formatted result to console
  │
  └── Print summary statistics
        ├── Total students
        ├── How many passed
        └── How many failed
END
```

---

## 🧪 Sample Students

| Name | Marks (5 subjects) | Attendance |
|------|-------------------|------------|
| Riya Sharma | 95, 88, 92, 97, 90 | true |
| Arjun Mehta | 78, 82, 74, 80, 76 | true |
| Priya Nair | 60, 55, 65, 58, 62 | false |
| Karan Patel | 40, 45, 38, 42, 48 | true |
| Sneha Reddy | 85, 90, 88, 87, 91 | true |

---

## ✅ Deliverables Checklist

- [x] `PLAN.md` — This planning document
- [x] `student_results.js` — JavaScript program
- [x] `README.md` — Project documentation
- [ ] Console Output Screenshot — To be taken after running the program
- [ ] GitHub Repository Link — To be created and submitted
