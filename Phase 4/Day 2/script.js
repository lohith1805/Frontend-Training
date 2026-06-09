// ─────────────────────────────────────────────
//  Employee Management System — script.js
//  ES6 Concepts: arrow functions, template
//  literals, const/let, array methods, objects
// ─────────────────────────────────────────────

// ── State ──────────────────────────────────
let employees = [];
let nextId = 1;

// ── Helper: Generate unique ID ──────────────
const generateId = () => `EMP-${String(nextId++).padStart(3, '0')}`;

// ── Add Employee ────────────────────────────
const addEmployee = (name, role, salary) => {
  const employee = {
    id: generateId(),
    name,
    role,
    salary: Number(salary),
  };
  employees.push(employee);
  console.log(`✅ Added: `, employee);
  console.log(`📋 Current Employee List:`, employees);
  return employee;
};

// ── Remove Employee ─────────────────────────
const removeEmployee = (id) => {
  const before = employees.length;
  employees = employees.filter(emp => emp.id !== id);
  if (employees.length < before) {
    console.log(`🗑️  Removed employee with ID: ${id}`);
    console.log(`📋 Updated Employee List:`, employees);
  }
};

// ── Display Employees (DOM) ─────────────────
const displayEmployees = () => {
  const list = document.getElementById('empList');
  const badge = document.getElementById('empCount');

  badge.textContent = `${employees.length} Employee${employees.length !== 1 ? 's' : ''}`;

  if (employees.length === 0) {
    list.innerHTML = `<p class="empty-msg">No employees added yet.</p>`;
    return;
  }

  list.innerHTML = employees.map(({ id, name, role, salary }) => `
    <div class="emp-card">
      <span class="emp-id">${id}</span>
      <span class="emp-name">${name}</span>
      <span class="emp-role">${role}</span>
      <span class="emp-salary">₹${salary.toLocaleString('en-IN')}</span>
      <button class="delete-btn" onclick="handleDelete('${id}')">🗑 Remove</button>
    </div>
  `).join('');
};

// ── Validation ──────────────────────────────
const validateInputs = (name, role, salary) => {
  let valid = true;

  const nameErr   = document.getElementById('nameError');
  const roleErr   = document.getElementById('roleError');
  const salaryErr = document.getElementById('salaryError');
  const nameIn    = document.getElementById('empName');
  const roleIn    = document.getElementById('empRole');
  const salaryIn  = document.getElementById('empSalary');

  // Reset
  [nameErr, roleErr, salaryErr].forEach(el => el.textContent = '');
  [nameIn, roleIn, salaryIn].forEach(el => el.classList.remove('invalid'));

  if (!name.trim()) {
    nameErr.textContent = 'Name is required.';
    nameIn.classList.add('invalid');
    valid = false;
  }

  if (!role.trim()) {
    roleErr.textContent = 'Role is required.';
    roleIn.classList.add('invalid');
    valid = false;
  }

  if (!salary || isNaN(salary) || Number(salary) <= 0) {
    salaryErr.textContent = 'Enter a valid positive salary.';
    salaryIn.classList.add('invalid');
    valid = false;
  }

  return valid;
};

// ── Event Handlers ──────────────────────────
const handleAdd = () => {
  const name   = document.getElementById('empName').value;
  const role   = document.getElementById('empRole').value;
  const salary = document.getElementById('empSalary').value;

  if (!validateInputs(name, role, salary)) return;

  addEmployee(name.trim(), role.trim(), salary);
  displayEmployees();

  // Clear inputs
  ['empName', 'empRole', 'empSalary'].forEach(id => {
    document.getElementById(id).value = '';
  });
};

const handleDelete = (id) => {
  removeEmployee(id);
  displayEmployees();
};

const clearAll = () => {
  employees = [];
  nextId = 1;
  console.log('🧹 All employees cleared.');
  displayEmployees();
};

// ── Init ────────────────────────────────────
// Pre-load sample data so the list isn't empty on first open
const sampleData = [
  { name: 'John Smith',   role: 'Frontend Developer', salary: 50000 },
  { name: 'Priya Mehta',  role: 'Backend Developer',  salary: 60000 },
  { name: 'Arjun Rao',    role: 'UI/UX Designer',     salary: 45000 },
];

sampleData.forEach(({ name, role, salary }) => addEmployee(name, role, salary));
displayEmployees();
