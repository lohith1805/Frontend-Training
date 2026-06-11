import React, { useState, useEffect } from 'react';
import './ApiUsers.css';

function ApiUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  // useEffect runs after render; [] means run once on mount
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array → runs once on component mount

  // Conditional Rendering: loading state
  if (loading) {
    return (
      <div className="api-loading">
        <div className="api-spinner" />
        <p>Fetching users from JSONPlaceholder API…</p>
        <code>useEffect(() =&gt; &#123; fetch(url)... &#125;, [])</code>
      </div>
    );
  }

  // Conditional Rendering: error state
  if (error) {
    return (
      <div className="api-error">
        ❌ Failed to load users: {error}
        <br />
        <small>Make sure you have an internet connection.</small>
      </div>
    );
  }

  return (
    <div>
      <p className="api-desc">
        The <code>10 users</code> below were fetched from{' '}
        <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noreferrer">
          jsonplaceholder.typicode.com/users
        </a>{' '}
        using <code>useEffect</code> + <code>fetch</code> on component mount.
      </p>

      <div className="api-grid">
        {/* Lists rendered with .map() — each has a unique key */}
        {users.map(user => (
          <div
            key={user.id}
            className={`api-card ${selected === user.id ? 'api-card--selected' : ''}`}
            onClick={() => setSelected(selected === user.id ? null : user.id)}
          >
            <div className="api-card__top">
              <div className="api-card__avatar">{user.name.charAt(0)}</div>
              <div>
                <p className="api-card__name">{user.name}</p>
                <p className="api-card__username">@{user.username}</p>
              </div>
            </div>

            {/* Conditional Rendering: expanded details */}
            {selected === user.id && (
              <div className="api-card__details">
                <p>📧 {user.email}</p>
                <p>📞 {user.phone}</p>
                <p>🌐 {user.website}</p>
                <p>🏢 {user.company.name}</p>
                <p>📍 {user.address.city}</p>
              </div>
            )}

            <p className="api-card__hint">
              {selected === user.id ? '▲ Click to collapse' : '▼ Click to expand'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiUsers;
