# Student Result Management System
### Phase 4 — Day 1 JavaScript Task

---

## 📌 About

A console-based **Student Result Management Program** built with pure JavaScript, demonstrating core programming concepts:

| Concept | How It's Used |
|---------|--------------|
| **Variables** | Store student name, marks, attendance, counters |
| **Data Types** | String (name), Number (marks), Boolean (attendance) |
| **Operators** | `+`, `/`, `*`, `>=`, `===`, `\|\|` for calculations & comparisons |
| **Conditions** | `if / else if / else` for grade and pass/fail logic |
| **Loops** | `for...of` and `for` loops to process and display all students |

---

## 🚀 How to Run

**Requirements:** Node.js installed on your machine.

```bash
node student_results.js
```

---

## 📂 File Structure

```
student-result-management/
├── PLAN.md              ← Planning document with flow and design decisions
├── README.md            ← This file
└── student_results.js   ← Main JavaScript program
```

---

## 🎓 Grade Logic

| Average Score | Grade |
|---------------|-------|
| 90 and above  | A     |
| 75 – 89       | B     |
| 50 – 74       | C     |
| Below 50      | Fail  |

> A student is also marked **FAIL** if their attendance is `false`, regardless of marks.

---

## 📊 Sample Output

```
═══════════════════════════════════════════════════════
       STUDENT RESULT MANAGEMENT SYSTEM
          Phase 4 — Day 1 JavaScript Task
═══════════════════════════════════════════════════════
───────────────────────────────────────────────────────
  Student : Riya Sharma
  Attendance : Present ✔

  Subject-wise Marks:
    Math        : 95
    Science     : 88
    English     : 92
    History     : 97
    Computer    : 90

  Total Marks  : 462 / 500
  Average      : 92.40%
  Grade        : A
  Result       : PASS
...
═══════════════════════════════════════════════════════
                    SUMMARY
═══════════════════════════════════════════════════════
  Total Students  : 5
  Total Passed    : 3
  Total Failed    : 2
  Pass Percentage : 60.0%
═══════════════════════════════════════════════════════
```

---

## 👩‍💻 Concepts Demonstrated

- **`const` / `let`** — variable declarations
- **Arrays** — storing marks for multiple subjects
- **Objects** — grouping student properties together
- **Functions** — reusable logic for total, average, grade, status
- **`for...of` loop** — iterating over the students array
- **`for` loop (index-based)** — iterating over marks by index
- **`if / else if / else`** — grade logic and pass/fail decision
- **Boolean** — attendance flag used in conditional check
- **String methods** — `.padEnd()`, `.toFixed()`, template literals

---

*Phase 4 — Day 1 | JavaScript Basics & Logic Building*
