import React, { useState } from 'react';
import './StudentTable.css';

function StudentTable({ students, onDelete, onEdit, editingId }) {
  const [search, setSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    onDelete(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="student-table-wrap">
      {/* Search bar */}
      <div className="st-search-wrap">
        <input
          className="st-search"
          placeholder="🔍 Search by name or course..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Delete Confirmation Modal — Conditional Rendering */}
      {confirmDeleteId && (
        <div className="st-confirm-overlay">
          <div className="st-confirm-box">
            <p className="st-confirm-title">🗑️ Delete Student?</p>
            <p className="st-confirm-msg">
              Are you sure you want to remove <strong>
                {students.find(s => s.id === confirmDeleteId)?.name}
              </strong>? This cannot be undone.
            </p>
            <div className="st-confirm-actions">
              <button className="st-confirm-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="st-confirm-delete" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Rendering: empty state */}
      {filtered.length === 0 ? (
        <div className="st-empty">
          {students.length === 0
            ? <><p>📋</p><p>No students yet. Register the first one!</p></>
            : <><p>🔍</p><p>No students match your search.</p></>
          }
        </div>
      ) : (
        <div className="st-table-scroll">
        <table className="st-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Lists rendered with .map() + unique key prop */}
          <tbody>
            {filtered.map((student, index) => (
              <tr
                key={student.id}
                className={editingId === student.id ? 'st-row--editing' : ''}
              >
                <td className="st-idx">{index + 1}</td>
                <td>
                  <div className="st-name-cell">
                    <div className="st-avatar">{student.name.charAt(0).toUpperCase()}</div>
                    <span>{student.name}</span>
                  </div>
                </td>
                <td className="st-email">{student.email}</td>
                <td>
                  <span className="st-course-tag">{student.course}</span>
                </td>
                <td className="st-mono">{student.mobile}</td>
                <td>
                  <div className="st-actions">
                    <button
                      className={`st-edit ${editingId === student.id ? 'st-edit--active' : ''}`}
                      onClick={() => onEdit(student)}
                      title="Edit student"
                    >
                      ✏️
                    </button>
                    <button
                      className="st-delete"
                      onClick={() => handleDeleteClick(student.id)}
                      title="Delete student"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default StudentTable;