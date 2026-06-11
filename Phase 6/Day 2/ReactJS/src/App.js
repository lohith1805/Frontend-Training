import React, { useState } from 'react';
import EmployeeCard from './components/EmployeeCard';
import AddEmployeeModal from './components/AddEmployeeModal';
import Counter from './components/Counter';
import './App.css';

const initialEmployees = [
  { id: 1, name: 'Arjun Mehta', role: 'Frontend Engineer', salary: 85000, department: 'Engineering', active: true, likes: 4, avatar: 'AM', color: '#6c63ff' },
  { id: 2, name: 'Priya Sharma', role: 'UI/UX Designer', salary: 75000, department: 'Design', active: true, likes: 7, avatar: 'PS', color: '#00d4aa' },
  { id: 3, name: 'Rohan Das', role: 'Backend Engineer', salary: 90000, department: 'Engineering', active: false, likes: 2, avatar: 'RD', color: '#f97316' },
  { id: 4, name: 'Sneha Iyer', role: 'Product Manager', salary: 95000, department: 'Product', active: true, likes: 5, avatar: 'SI', color: '#e91e8c' },
  { id: 5, name: 'Vikram Rao', role: 'DevOps Engineer', salary: 88000, department: 'Engineering', active: true, likes: 3, avatar: 'VR', color: '#3b82f6' },
  { id: 6, name: 'Ananya Gupta', role: 'Data Analyst', salary: 72000, department: 'Analytics', active: false, likes: 6, avatar: 'AG', color: '#8b5cf6' },
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');

  // Toggle active status
  const toggleStatus = (id) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, active: !emp.active } : emp)
    );
  };

  // Like an employee
  const handleLike = (id) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, likes: emp.likes + 1 } : emp)
    );
  };

  // Delete an employee
  const handleDelete = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // Add new employee
  const handleAdd = (newEmp) => {
    const colors = ['#6c63ff','#00d4aa','#f97316','#e91e8c','#3b82f6','#8b5cf6','#ec4899'];
    const initials = newEmp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
    setEmployees(prev => [
      ...prev,
      {
        ...newEmp,
        id: Date.now(),
        likes: 0,
        active: true,
        avatar: initials,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    ]);
    setShowModal(false);
  };

  const departments = ['All', ...new Set(initialEmployees.map(e => e.department))];
  const filtered = filter === 'All' ? employees : employees.filter(e => e.department === filter);

  const activeCount = employees.filter(e => e.active).length;

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__logo">Staff<span>Hub</span></div>
        <nav className="sidebar__nav">
          {[
            { icon: '🏠', label: 'Dashboard', active: true },
            { icon: '👥', label: 'Employees', active: false },
            { icon: '📊', label: 'Reports', active: false },
            { icon: '⚙️', label: 'Settings', active: false },
          ].map(item => (
            <div key={item.label} className={`sidebar__nav-item ${item.active ? 'active' : ''}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>Employee Dashboard</h1>
            <p>Manage your team members</p>
          </div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            + Add Employee
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-card__label">Total Employees</p>
            <p className="stat-card__value">{employees.length}</p>
            <p className="stat-card__sub">↑ Team members</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Active</p>
            <p className="stat-card__value" style={{color:'var(--success)'}}>{activeCount}</p>
            <p className="stat-card__sub">Currently active</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Inactive</p>
            <p className="stat-card__value" style={{color:'var(--danger)'}}>{employees.length - activeCount}</p>
            <p className="stat-card__sub">On leave / inactive</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Avg. Salary</p>
            <p className="stat-card__value">
              ₹{employees.length > 0
                ? Math.round(employees.reduce((a,e) => a + e.salary, 0) / employees.length / 1000)
                : 0}K
            </p>
            <p className="stat-card__sub">Per annum</p>
          </div>
        </div>

        {/* Counter Feature */}
        <Counter />

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {departments.map(dept => (
            <button
              key={dept}
              className={`filter-tab ${filter === dept ? 'active' : ''}`}
              onClick={() => setFilter(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Employee Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>🙈</p>
            <p>No employees found. Add some!</p>
          </div>
        ) : (
          <div className="employee-grid">
            {filtered.map(emp => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onLike={handleLike}
                onDelete={handleDelete}
                onToggleStatus={toggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddEmployeeModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
