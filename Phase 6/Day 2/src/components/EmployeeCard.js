import React from 'react';
import './EmployeeCard.css';

function EmployeeCard({ employee, onLike, onDelete, onToggleStatus }) {
  const { id, name, role, salary, department, active, likes, avatar, color } = employee;

  return (
    <div className={`emp-card ${active ? '' : 'emp-card--inactive'}`}>
      <div className="emp-card__header">
        <div
          className="emp-card__avatar"
          style={{ background: `${color}22`, color, border: `2px solid ${color}55` }}
        >
          {avatar}
        </div>
        <div className="emp-card__status-wrap">
          <span className={`emp-card__badge ${active ? 'badge--active' : 'badge--inactive'}`}>
            {active ? '● Active' : '○ Inactive'}
          </span>
          <span className="emp-card__dept">{department}</span>
        </div>
      </div>

      <div className="emp-card__body">
        <h3 className="emp-card__name">{name}</h3>
        <p className="emp-card__role">{role}</p>
        <p className="emp-card__salary">
          <span>💰</span>
          ₹{salary.toLocaleString('en-IN')} / year
        </p>
      </div>

      <div className="emp-card__actions">
        {/* Like Button */}
        <button className="emp-btn emp-btn--like" onClick={() => onLike(id)}>
          ❤️ {likes}
        </button>

        {/* Toggle Status Button */}
        <button
          className={`emp-btn ${active ? 'emp-btn--deactivate' : 'emp-btn--activate'}`}
          onClick={() => onToggleStatus(id)}
        >
          {active ? 'Deactivate' : 'Activate'}
        </button>

        {/* Delete Button */}
        <button className="emp-btn emp-btn--delete" onClick={() => onDelete(id)}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
