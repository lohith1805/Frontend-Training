const sidebar = document.querySelector('.sidebar');
const backdrop = document.querySelector('.sidebar-backdrop');
const menuBtn = document.querySelector('.menu-btn');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    backdrop.classList.toggle('show');
  });
}

if (backdrop) {
  backdrop.addEventListener('click', () => {
    sidebar.classList.remove('show');
    backdrop.classList.remove('show');
  });
}

const employeeData = [
  { name: 'Arjun Sharma', role: 'Frontend Developer', dept: 'Engineering', status: 'Active', email: 'arjun@company.com', type: 'Full-time', initials: 'AS' },
  { name: 'Priya Patel', role: 'UI/UX Designer', dept: 'Design', status: 'Active', email: 'priya@company.com', type: 'Full-time', initials: 'PP' },
  { name: 'Rahul Kumar', role: 'Backend Engineer', dept: 'Engineering', status: 'Inactive', email: 'rahul@company.com', type: 'Contract', initials: 'RK' },
  { name: 'Sneha Reddy', role: 'Marketing Lead', dept: 'Marketing', status: 'Active', email: 'sneha@company.com', type: 'Full-time', initials: 'SR' },
  { name: 'Vikram Singh', role: 'Finance Analyst', dept: 'Finance', status: 'Active', email: 'vikram@company.com', type: 'Full-time', initials: 'VS' },
  { name: 'Neha Gupta', role: 'HR Executive', dept: 'HR', status: 'Inactive', email: 'neha@company.com', type: 'Part-time', initials: 'NG' }
];

function matchesFilters(emp, searchValue, deptValue, statusValue, typeValue) {
  const search = (searchValue || '').toLowerCase();
  const dept = (deptValue || '').toLowerCase();
  const status = (statusValue || '').toLowerCase();
  const type = (typeValue || '').toLowerCase();
  const text = `${emp.name} ${emp.role} ${emp.dept} ${emp.email}`.toLowerCase();
  return (!search || text.includes(search)) &&
         (!dept || emp.dept.toLowerCase() === dept) &&
         (!status || emp.status.toLowerCase() === status) &&
         (!type || emp.type.toLowerCase() === type);
}

function filterCards() {
  const search = document.getElementById('profileSearch')?.value || '';
  const dept = document.getElementById('profileDept')?.value || '';
  const status = document.getElementById('profileStatus')?.value || '';
  const type = document.getElementById('profileType')?.value || '';

  document.querySelectorAll('[data-employee-card]').forEach(card => {
    const emp = employeeData.find(item => item.email === card.dataset.email);
    card.style.display = emp && matchesFilters(emp, search, dept, status, type) ? '' : 'none';
  });
}

function filterTable() {
  const search = document.getElementById('tableSearch')?.value || '';
  const dept = document.getElementById('tableDept')?.value || '';
  const status = document.getElementById('tableStatus')?.value || '';
  const type = document.getElementById('tableType')?.value || '';

  document.querySelectorAll('[data-employee-row]').forEach(row => {
    const emp = employeeData.find(item => item.email === row.dataset.email);
    row.style.display = emp && matchesFilters(emp, search, dept, status, type) ? '' : 'none';
  });
}

['profileSearch', 'profileDept', 'profileStatus', 'profileType'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', filterCards);
});

['tableSearch', 'tableDept', 'tableStatus', 'tableType'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', filterTable);
});

const empForm = document.getElementById('empForm');
if (empForm) {
  empForm.addEventListener('submit', e => {
    e.preventDefault();
    const button = empForm.querySelector('button[type="submit"]');
    const oldText = button.innerHTML;
    button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Employee Registered';
    button.classList.add('bg-success');
    setTimeout(() => {
      button.innerHTML = oldText;
      button.classList.remove('bg-success');
      empForm.reset();
    }, 1600);
  });
}

document.querySelectorAll('.btn-action-del').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.closest('[data-employee-row]') || btn.closest('[data-employee-card]');
    if (target && confirm('Remove this employee?')) {
      target.style.opacity = '0';
      setTimeout(() => target.remove(), 250);
    }
  });
});

const selectAll = document.getElementById('selectAll');
if (selectAll) {
  selectAll.addEventListener('change', () => {
    document.querySelectorAll('.row-check').forEach(cb => cb.checked = selectAll.checked);
  });
}

function makeChart(id, type, labels, data, label) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof Chart === 'undefined') return;
  new Chart(canvas, {
    type,
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 2,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: type !== 'bar' } },
      scales: type === 'doughnut' || type === 'pie' ? {} : { y: { beginAtZero: true } }
    }
  });
}

makeChart('deptChart', 'doughnut', ['Engineering', 'Design', 'Marketing', 'Finance', 'HR'], [18, 8, 9, 6, 7], 'Employees');
makeChart('hiringChart', 'line', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [3, 5, 4, 8, 6, 9], 'New Hires');
makeChart('attendanceChart', 'bar', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], [42, 44, 41, 46, 43, 32], 'Present Employees');
makeChart('performanceChart', 'bar', ['Excellent', 'Good', 'Average', 'Needs Help'], [16, 22, 8, 2], 'Performance Count');

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

function openEditEmployeeModal(card) {
  const emailKey = card.dataset.email;
  const emp = employeeData.find(item => item.email === emailKey);
  if (!emp) return;

  document.getElementById('editEmailKey').value = emp.email;
  document.getElementById('editName').value = emp.name;
  document.getElementById('editRole').value = emp.role;
  document.getElementById('editEmail').value = emp.email;
  document.getElementById('editDept').value = emp.dept;
  document.getElementById('editStatus').value = emp.status;
  document.getElementById('editType').value = emp.type;
  document.getElementById('editEmployeeModalLabel').textContent = `Update ${emp.name}`;

  const modalElement = document.getElementById('editEmployeeModal');
  if (modalElement && typeof bootstrap !== 'undefined') {
    bootstrap.Modal.getOrCreateInstance(modalElement).show();
  }
}

function updateEmployeeCard(emp, oldEmail) {
  const card = document.querySelector(`[data-employee-card][data-email="${oldEmail}"]`);
  if (!card) return;

  card.dataset.email = emp.email;
  card.querySelector('.emp-avatar').textContent = emp.initials;
  card.querySelector('.emp-name').textContent = emp.name;
  card.querySelector('.emp-role').textContent = emp.role;
  card.querySelector('.emp-dept').innerHTML = `<i class="bi bi-building me-1"></i>${emp.dept}`;
  card.querySelector('.emp-contact').innerHTML = `<i class="bi bi-envelope me-1"></i>${emp.email}`;
  card.querySelector('.small-muted').innerHTML = `<i class="bi bi-briefcase me-1"></i>${emp.type}`;

  const statusBadge = card.querySelector('.badge-status');
  statusBadge.textContent = emp.status;
  statusBadge.classList.remove('active', 'inactive');
  statusBadge.classList.add(emp.status.toLowerCase());
}

document.querySelectorAll('[data-employee-card] .btn-action-edit').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('[data-employee-card]');
    if (card) openEditEmployeeModal(card);
  });
});

const editEmployeeForm = document.getElementById('editEmployeeForm');
if (editEmployeeForm) {
  editEmployeeForm.addEventListener('submit', e => {
    e.preventDefault();

    const oldEmail = document.getElementById('editEmailKey').value;
    const emp = employeeData.find(item => item.email === oldEmail);
    if (!emp) return;

    emp.name = document.getElementById('editName').value.trim();
    emp.role = document.getElementById('editRole').value.trim();
    emp.email = document.getElementById('editEmail').value.trim();
    emp.dept = document.getElementById('editDept').value;
    emp.status = document.getElementById('editStatus').value;
    emp.type = document.getElementById('editType').value;
    emp.initials = getInitials(emp.name);

    updateEmployeeCard(emp, oldEmail);
    filterCards();

    const modalElement = document.getElementById('editEmployeeModal');
    bootstrap.Modal.getOrCreateInstance(modalElement).hide();
  });
}
