// ============================================================
//   PHASE 4 — DAY 1 TASK
//   Student Result Management Program
//   Concepts: Variables, Data Types, Operators, Conditions, Loops
// ============================================================

// ─────────────────────────────────────────────
// SECTION 1: Student Data (Variables + Data Types)
// ─────────────────────────────────────────────

// Each student object stores:
//   name       → String  (Data Type: String)
//   marks      → Array of Numbers (Data Type: Number)
//   attendance → Boolean (Data Type: Boolean)

const students = [
  {
    name: "Riya Sharma",
    marks: [95, 88, 92, 97, 90],   // 5 subjects
    attendance: true,
  },
  {
    name: "Arjun Mehta",
    marks: [78, 82, 74, 80, 76],
    attendance: true,
  },
  {
    name: "Priya Nair",
    marks: [60, 55, 65, 58, 62],
    attendance: false,
  },
  {
    name: "Karan Patel",
    marks: [40, 45, 38, 42, 48],
    attendance: true,
  },
  {
    name: "Sneha Reddy",
    marks: [85, 90, 88, 87, 91],
    attendance: true,
  },
];

// Subject names (for display)
const subjects = ["Math", "Science", "English", "History", "Computer"];

// ─────────────────────────────────────────────
// SECTION 2: Helper Functions
// ─────────────────────────────────────────────

// Function to calculate total marks (Operators: +, loop)
function calculateTotal(marksArray) {
  let total = 0;                          // Variable: Number
  for (let i = 0; i < marksArray.length; i++) {
    total = total + marksArray[i];        // Operator: +
  }
  return total;
}

// Function to calculate average (Operators: /, +)
function calculateAverage(total, count) {
  return total / count;                   // Operator: /
}

// Function to determine grade (Conditions: if/else)
function getGrade(average) {
  let grade;                              // Variable: String

  if (average >= 90) {                    // Condition: >=
    grade = "A";
  } else if (average >= 75) {            // Condition: else if
    grade = "B";
  } else if (average >= 50) {
    grade = "C";
  } else {                               // Condition: else (below 50)
    grade = "Fail";
  }

  return grade;
}

// Function to determine pass/fail status (Condition + Boolean)
function getStatus(grade, attendance) {
  // A student fails if grade is "Fail" OR attendance is false
  if (grade === "Fail" || attendance === false) {
    return "FAIL";
  } else {
    return "PASS";
  }
}

// Utility: print a divider line
function printDivider(char = "─", length = 55) {
  console.log(char.repeat(length));
}

// ─────────────────────────────────────────────
// SECTION 3: Print Header
// ─────────────────────────────────────────────

console.log("\n");
printDivider("═");
console.log("       STUDENT RESULT MANAGEMENT SYSTEM");
console.log("          Phase 4 — Day 1 JavaScript Task");
printDivider("═");

// ─────────────────────────────────────────────
// SECTION 4: Process & Display Each Student
//            Using LOOP (for...of)
// ─────────────────────────────────────────────

let totalPassed = 0;    // Variable: Number (counter)
let totalFailed = 0;    // Variable: Number (counter)

// LOOP — iterate over each student
for (const student of students) {

  // ── Calculate Results ──
  const total   = calculateTotal(student.marks);          // Operator usage
  const average = calculateAverage(total, student.marks.length);
  const grade   = getGrade(average);                      // Condition usage
  const status  = getStatus(grade, student.attendance);   // Condition usage

  // ── Update counters ──
  if (status === "PASS") {
    totalPassed = totalPassed + 1;   // Operator: +
  } else {
    totalFailed = totalFailed + 1;   // Operator: +
  }

  // ── Display Student Card ──
  printDivider();
  console.log(`  Student : ${student.name}`);
  console.log(`  Attendance : ${student.attendance ? "Present ✔" : "Absent ✘"}`);
  console.log("");

  // Print each subject mark using a nested loop
  console.log("  Subject-wise Marks:");
  for (let i = 0; i < subjects.length; i++) {
    console.log(`    ${subjects[i].padEnd(12)}: ${student.marks[i]}`);
  }

  console.log("");
  console.log(`  Total Marks  : ${total} / ${student.marks.length * 100}`);
  console.log(`  Average      : ${average.toFixed(2)}%`);
  console.log(`  Grade        : ${grade}`);
  console.log(`  Result       : ${status}`);

  // Attendance warning (Condition)
  if (student.attendance === false) {
    console.log("  ⚠  Note: Marked FAIL due to low attendance.");
  }
}

// ─────────────────────────────────────────────
// SECTION 5: Summary Report
// ─────────────────────────────────────────────

printDivider("═");
console.log("                    SUMMARY");
printDivider("═");
console.log(`  Total Students  : ${students.length}`);
console.log(`  Total Passed    : ${totalPassed}`);
console.log(`  Total Failed    : ${totalFailed}`);

// Percentage calculation (Operators: *, /)
const passPercentage = (totalPassed / students.length) * 100;
console.log(`  Pass Percentage : ${passPercentage.toFixed(1)}%`);
printDivider("═");
console.log("");

// ─────────────────────────────────────────────
// SECTION 6: Grade Distribution (Loop + Condition)
// ─────────────────────────────────────────────

console.log("  GRADE DISTRIBUTION:");
printDivider();

// Counters for each grade (Variables: Number)
let countA    = 0;
let countB    = 0;
let countC    = 0;
let countFail = 0;

// Loop through students again to count grades
for (const student of students) {
  const total   = calculateTotal(student.marks);
  const average = calculateAverage(total, student.marks.length);
  const grade   = getGrade(average);

  // Conditions to count grade buckets
  if (grade === "A") {
    countA = countA + 1;
  } else if (grade === "B") {
    countB = countB + 1;
  } else if (grade === "C") {
    countC = countC + 1;
  } else {
    countFail = countFail + 1;
  }
}

console.log(`  Grade A (90+)    : ${countA} student(s)`);
console.log(`  Grade B (75-89)  : ${countB} student(s)`);
console.log(`  Grade C (50-74)  : ${countC} student(s)`);
console.log(`  Fail   (<50)     : ${countFail} student(s)`);
printDivider("═");
console.log("\n  Program Complete! All results processed.\n");
