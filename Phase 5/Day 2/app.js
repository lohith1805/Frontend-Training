// ══════════════════════════════════════════════
//  Employee Management System — app.js
//  Covers: Authentication, CRUD, Validation,
//          Error Handling (try...catch), Arrays & Objects
// ══════════════════════════════════════════════

// ─── App State ────────────────────────────────
const state = {
  employees:   [],       // Array of employee objects
  nextId:      1,        // Auto-increment ID
  editingId:   null,     // ID of employee being edited (null = add mode)
  deleteTarget: null,    // ID of employee pending deletion
  currentUser: null,     // Logged-in user info
};

// ─── Demo credentials ─────────────────────────
const VALID_CREDENTIALS = {
  email:    'admin@company.com',
  password: 'Admin@123',
};

// ─── DOM refs ─────────────────────────────────
const loginScreen     = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');

const loginEmail    = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn      = document.getElementById('loginBtn');
const togglePw      = document.getElementById('togglePw');
const loginAlert    = document.getElementById('loginAlert');
const emailError    = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const logoutBtn     = document.getElementById('logoutBtn');
const welcomeUser   = document.getElementById('welcomeUser');

const empName       = document.getElementById('empName');
const empRole       = document.getElementById('empRole');
const empSalary     = document.getElementById('empSalary');
const empEmail      = document.getElementById('empEmail');
const formTitle     = document.getElementById('formTitle');
const formAlert     = document.getElementById('formAlert');
const saveEmpBtn    = document.getElementById('saveEmpBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const nameError     = document.getElementById('nameError');
const roleError     = document.getElementById('roleError');
const salaryError   = document.getElementById('salaryError');
const empEmailError = document.getElementById('empEmailError');

const empTableBody  = document.getElementById('empTableBody');
const noEmployees   = document.getElementById('noEmployees');
const tableSearch   = document.getElementById('tableSearch');

const statTotal     = document.getElementById('statTotal');
const statAvgSalary = document.getElementById('statAvgSalary');
const statRoles     = document.getElementById('statRoles');

const deleteModal     = document.getElementById('deleteModal');
const deleteEmpName   = document.getElementById('deleteEmpName');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn  = document.getElementById('cancelDeleteBtn');


// ══════════════════════════════════════════════
//  VALIDATION HELPERS
// ══════════════════════════════════════════════

function isValidEmail(email) {
  // Basic email format check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function isStrongPassword(pw) {
  // At least 6 chars, 1 uppercase, 1 number, 1 special char
  return pw.length >= 6 &&
    /[A-Z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^a-zA-Z0-9]/.test(pw);
}

function clearFieldErrors() {
  [emailError, passwordError].forEach(el => el.textContent = '');
  [loginEmail, loginPassword].forEach(el => el.classList.remove('input-error'));
}

function clearEmpFieldErrors() {
  [nameError, roleError, salaryError, empEmailError].forEach(el => el.textContent = '');
  [empName, empRole, empSalary, empEmail].forEach(el => el.classList.remove('input-error'));
}


// ══════════════════════════════════════════════
//  AUTHENTICATION
// ══════════════════════════════════════════════

function handleLogin() {
  try {
    clearFieldErrors();
    hideAlert(loginAlert);

    const email    = loginEmail.value.trim();
    const password = loginPassword.value;
    let hasError   = false;

    // Validate email field
    if (!email) {
      showFieldError(emailError, loginEmail, 'Email is required.');
      hasError = true;
    } else if (!isValidEmail(email)) {
      showFieldError(emailError, loginEmail, 'Please enter a valid email address.');
      hasError = true;
    }

    // Validate password field
    if (!password) {
      showFieldError(passwordError, loginPassword, 'Password is required.');
      hasError = true;
    } else if (!isStrongPassword(password)) {
      showFieldError(passwordError, loginPassword,
        'Password must be ≥6 chars with uppercase, number & special character.');
      hasError = true;
    }

    if (hasError) return;

    // Check credentials
    if (email !== VALID_CREDENTIALS.email || password !== VALID_CREDENTIALS.password) {
      showAlert(loginAlert, 'error', '❌ Incorrect email or password. Please try again.');
      return;
    }

    // Login success
    state.currentUser = { email };
    showAlert(loginAlert, 'success', '✅ Login successful! Redirecting...');

    setTimeout(() => {
      showScreen('dashboard');
      welcomeUser.textContent = `Logged in as ${email}`;
    }, 700);

  } catch (err) {
    console.error('Login error:', err);
    showAlert(loginAlert, 'error', 'An unexpected error occurred. Please try again.');
  }
}

function handleLogout() {
  state.currentUser = null;
  loginEmail.value = '';
  loginPassword.value = '';
  clearFieldErrors();
  hideAlert(loginAlert);
  showScreen('login');
}

togglePw.addEventListener('click', () => {
  const isText = loginPassword.type === 'text';
  loginPassword.type = isText ? 'password' : 'text';
  togglePw.textContent = isText ? '👁' : '🙈';
});


// ══════════════════════════════════════════════
//  CRUD — EMPLOYEE OPERATIONS
// ══════════════════════════════════════════════

// ── CREATE / UPDATE ─────────────────────────
function handleSaveEmployee() {
  try {
    clearEmpFieldErrors();
    hideAlert(formAlert);

    const name   = empName.value.trim();
    const role   = empRole.value.trim();
    const salary = empSalary.value.trim();
    const email  = empEmail.value.trim();
    let hasError = false;

    // Validate all fields
    if (!name) {
      showFieldError(nameError, empName, 'Name is required.');
      hasError = true;
    } else if (name.length < 2) {
      showFieldError(nameError, empName, 'Name must be at least 2 characters.');
      hasError = true;
    }

    if (!role) {
      showFieldError(roleError, empRole, 'Role is required.');
      hasError = true;
    }

    if (!salary) {
      showFieldError(salaryError, empSalary, 'Salary is required.');
      hasError = true;
    } else if (isNaN(salary) || Number(salary) < 0) {
      showFieldError(salaryError, empSalary, 'Salary must be a valid positive number.');
      hasError = true;
    }

    if (!email) {
      showFieldError(empEmailError, empEmail, 'Email is required.');
      hasError = true;
    } else if (!isValidEmail(email)) {
      showFieldError(empEmailError, empEmail, 'Please enter a valid email address.');
      hasError = true;
    } else {
      // Check for duplicate email (excluding current employee in edit mode)
      const duplicate = state.employees.find(
        emp => emp.email.toLowerCase() === email.toLowerCase() && emp.id !== state.editingId
      );
      if (duplicate) {
        showFieldError(empEmailError, empEmail, 'This email is already used by another employee.');
        hasError = true;
      }
    }

    if (hasError) return;

    if (state.editingId !== null) {
      // UPDATE existing employee
      const index = state.employees.findIndex(emp => emp.id === state.editingId);
      if (index === -1) throw new Error('Employee not found for editing.');

      state.employees[index] = {
        ...state.employees[index],
        name, role, email,
        salary: Number(salary),
      };

      showAlert(formAlert, 'success', `✅ "${name}" updated successfully.`);
      cancelEdit();

    } else {
      // CREATE new employee
      const newEmployee = {
        id:     state.nextId++,
        name, role, email,
        salary: Number(salary),
      };
      state.employees.push(newEmployee);

      showAlert(formAlert, 'success', `✅ "${name}" added to the team!`);
      clearEmpForm();
    }

    renderTable(state.employees);
    updateStats();

  } catch (err) {
    console.error('Save employee error:', err);
    showAlert(formAlert, 'error', `❌ Error saving employee: ${err.message}`);
  }
}

// ── READ / RENDER ────────────────────────────
function renderTable(list) {
  empTableBody.innerHTML = '';

  if (list.length === 0) {
    noEmployees.classList.remove('hidden');
    document.querySelector('.table-wrap').style.display = 'none';
    return;
  }

  noEmployees.classList.add('hidden');
  document.querySelector('.table-wrap').style.display = '';

  list.forEach((emp, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="index-cell">${index + 1}</td>
      <td><strong>${escapeHtml(emp.name)}</strong></td>
      <td>${escapeHtml(emp.role)}</td>
      <td>${escapeHtml(emp.email)}</td>
      <td class="salary-cell">₹${Number(emp.salary).toLocaleString('en-IN')}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-outline btn-sm" onclick="startEdit(${emp.id})">✏️ Edit</button>
          <button class="btn btn-danger  btn-sm" onclick="confirmDelete(${emp.id})">🗑 Delete</button>
        </div>
      </td>
    `;
    empTableBody.appendChild(tr);
  });
}

// ── UPDATE — populate form for edit ─────────
function startEdit(id) {
  try {
    const emp = state.employees.find(e => e.id === id);
    if (!emp) throw new Error(`Employee with ID ${id} not found.`);

    state.editingId = id;

    empName.value   = emp.name;
    empRole.value   = emp.role;
    empSalary.value = emp.salary;
    empEmail.value  = emp.email;

    formTitle.textContent  = '✏️ Edit Employee';
    saveEmpBtn.textContent = 'Update Employee';
    cancelEditBtn.style.display = 'inline-flex';

    hideAlert(formAlert);
    clearEmpFieldErrors();

    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });

  } catch (err) {
    console.error('Edit error:', err);
    showAlert(formAlert, 'error', `❌ ${err.message}`);
  }
}

function cancelEdit() {
  state.editingId = null;
  clearEmpForm();
  formTitle.textContent  = '➕ Add New Employee';
  saveEmpBtn.textContent = 'Save Employee';
  cancelEditBtn.style.display = 'none';
}

// ── DELETE ───────────────────────────────────
function confirmDelete(id) {
  const emp = state.employees.find(e => e.id === id);
  if (!emp) return;

  state.deleteTarget = id;
  deleteEmpName.textContent = emp.name;
  deleteModal.classList.remove('hidden');
}

function handleConfirmDelete() {
  try {
    if (state.deleteTarget === null) throw new Error('No employee selected for deletion.');

    const index = state.employees.findIndex(emp => emp.id === state.deleteTarget);
    if (index === -1) throw new Error('Employee not found.');

    const deletedName = state.employees[index].name;
    state.employees.splice(index, 1);

    // If we were editing this employee, cancel edit mode
    if (state.editingId === state.deleteTarget) cancelEdit();

    closeDeleteModal();
    renderTable(state.employees);
    updateStats();

    showAlert(formAlert, 'info', `🗑 "${deletedName}" has been removed.`);

  } catch (err) {
    console.error('Delete error:', err);
    closeDeleteModal();
    showAlert(formAlert, 'error', `❌ Delete failed: ${err.message}`);
  }
}

function closeDeleteModal() {
  state.deleteTarget = null;
  deleteModal.classList.add('hidden');
}


// ══════════════════════════════════════════════
//  SEARCH / FILTER
// ══════════════════════════════════════════════
function handleTableSearch() {
  const q = tableSearch.value.toLowerCase().trim();
  if (!q) {
    renderTable(state.employees);
    return;
  }
  const filtered = state.employees.filter(emp =>
    emp.name.toLowerCase().includes(q)  ||
    emp.role.toLowerCase().includes(q)  ||
    emp.email.toLowerCase().includes(q)
  );
  renderTable(filtered);
}


// ══════════════════════════════════════════════
//  STATS
// ══════════════════════════════════════════════
function updateStats() {
  const total = state.employees.length;
  const avgSalary = total > 0
    ? Math.round(state.employees.reduce((sum, e) => sum + e.salary, 0) / total)
    : 0;
  const uniqueRoles = new Set(state.employees.map(e => e.role.toLowerCase())).size;

  statTotal.textContent     = total;
  statAvgSalary.textContent = `₹${avgSalary.toLocaleString('en-IN')}`;
  statRoles.textContent     = uniqueRoles;
}


// ══════════════════════════════════════════════
//  UI HELPERS
// ══════════════════════════════════════════════

function showScreen(screen) {
  loginScreen.classList.remove('active');
  dashboardScreen.classList.remove('active');

  if (screen === 'login') {
    loginScreen.classList.add('active');
  } else {
    dashboardScreen.classList.add('active');
  }
}

function showAlert(el, type, message) {
  el.className = `alert ${type}`;
  el.textContent = message;
  el.classList.remove('hidden');
  // Auto-hide after 4s
  setTimeout(() => hideAlert(el), 4000);
}

function hideAlert(el) {
  el.classList.add('hidden');
  el.textContent = '';
}

function showFieldError(errorEl, inputEl, message) {
  errorEl.textContent = message;
  inputEl.classList.add('input-error');
}

function clearEmpForm() {
  empName.value = empRole.value = empSalary.value = empEmail.value = '';
  clearEmpFieldErrors();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ══════════════════════════════════════════════
//  EVENT LISTENERS
// ══════════════════════════════════════════════

loginBtn.addEventListener('click', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
saveEmpBtn.addEventListener('click', handleSaveEmployee);
cancelEditBtn.addEventListener('click', cancelEdit);
confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
cancelDeleteBtn.addEventListener('click', closeDeleteModal);
tableSearch.addEventListener('input', handleTableSearch);

// Allow Enter key to login
loginPassword.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});

// Close modal on overlay click
deleteModal.addEventListener('click', e => {
  if (e.target === deleteModal) closeDeleteModal();
});


// ══════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════
function init() {
  showScreen('login');
  renderTable([]);
  updateStats();
}

init();
