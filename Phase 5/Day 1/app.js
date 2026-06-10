// ─── State ───────────────────────────────────────────────
let allUsers = [];

// ─── DOM refs ────────────────────────────────────────────
const loadingMsg  = document.getElementById('loadingMessage');
const errorMsg    = document.getElementById('errorMessage');
const userGrid    = document.getElementById('userGrid');
const searchInput = document.getElementById('searchInput');

// ─── Fetch Users ─────────────────────────────────────────
async function fetchUsers() {
  try {
    showLoading(true);

    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    allUsers = data;

    showLoading(false);
    renderUsers(allUsers);

  } catch (error) {
    showLoading(false);
    showError(true);
    console.error('Fetch error:', error.message);
  }
}

// ─── Render ───────────────────────────────────────────────
function renderUsers(users) {
  userGrid.innerHTML = '';

  if (users.length === 0) {
    userGrid.innerHTML = '<p class="no-results">No users match your search.</p>';
    return;
  }

  users.forEach((user, index) => {
    const initials = user.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('');

    const card = document.createElement('div');
    card.className = 'user-card';
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <div class="card-header">
        <div class="avatar">${initials}</div>
        <div>
          <div class="card-name">${user.name}</div>
          <div class="card-username">@${user.username}</div>
        </div>
      </div>

      <div class="card-details">
        <div class="detail-row">
          <span class="detail-icon">✉</span>
          <div>
            <span class="detail-label">Email</span>
            <span class="detail-value">${user.email}</span>
          </div>
        </div>
        <div class="detail-row">
          <span class="detail-icon">☎</span>
          <div>
            <span class="detail-label">Phone</span>
            <span class="detail-value">${user.phone}</span>
          </div>
        </div>
        <div class="detail-row">
          <span class="detail-icon">🌐</span>
          <div>
            <span class="detail-label">Website</span>
            <span class="detail-value">${user.website}</span>
          </div>
        </div>
        <div class="detail-row">
          <span class="detail-icon">📍</span>
          <div>
            <span class="detail-label">City</span>
            <span class="detail-value">${user.address.city}</span>
          </div>
        </div>
      </div>

      <div class="company-badge">🏢 ${user.company.name}</div>
    `;

    userGrid.appendChild(card);
  });
}

// ─── Search ───────────────────────────────────────────────
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = allUsers.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.company.name.toLowerCase().includes(query)
  );

  renderUsers(filtered);
}

// ─── UI Helpers ───────────────────────────────────────────
function showLoading(visible) {
  loadingMsg.classList.toggle('hidden', !visible);
}

function showError(visible) {
  errorMsg.classList.toggle('hidden', !visible);
}

// ─── Event Listeners ──────────────────────────────────────
searchInput.addEventListener('input', handleSearch);

// ─── Init ─────────────────────────────────────────────────
fetchUsers();
