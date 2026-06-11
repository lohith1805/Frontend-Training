import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import ApiUsers from './components/ApiUsers';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Patel', email: 'aarav@example.com', course: 'React Development', mobile: '9876543210' },
    { id: 2, name: 'Divya Nair', email: 'divya@example.com', course: 'Python & Django', mobile: '9123456789' },
    { id: 3, name: 'Kiran Reddy', email: 'kiran@example.com', course: 'Data Science', mobile: '9988776655' },
  ]);

  // Track which student is being edited (null = add mode)
  const [editingStudent, setEditingStudent] = useState(null);

  const addStudent = (student) => {
    setStudents(prev => [...prev, { ...student, id: Date.now() }]);
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    // If the deleted student was being edited, cancel edit mode
    if (editingStudent && editingStudent.id === id) {
      setEditingStudent(null);
    }
  };

  const startEdit = (student) => {
    setEditingStudent(student);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateStudent = (updatedData) => {
    setStudents(prev =>
      prev.map(s => s.id === editingStudent.id ? { ...updatedData, id: editingStudent.id } : s)
    );
    setEditingStudent(null);
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="app">
      {/* Top bar */}
      <div className="app-topbar">
        <div>
          <p className="app-topbar__logo">Student<span>Hub</span></p>
          <p className="app-topbar__subtitle">Phase 6 · Day 3 · Student Management System</p>
        </div>
        <div className="concept-pills">
          {['useState', 'useEffect', 'Forms', 'Lists & Keys', 'Conditional Rendering', 'API Fetch'].map(c => (
            <span key={c} className="concept-pill">{c}</span>
          ))}
        </div>
      </div>

      {/* Top grid: Form + Table */}
      <div className="app-grid">
        {/* Registration / Edit Form */}
        <div className="panel">
          <div className="panel__header">
            <p className="panel__title">
              {editingStudent ? '✏️ Edit Student' : '📝 Student Registration'}
              <span className="panel__badge">Forms</span>
            </p>
            {editingStudent && (
              <button className="cancel-edit-btn" onClick={cancelEdit}>✕ Cancel</button>
            )}
          </div>
          <div className="panel__body">
            <StudentForm
              onAdd={addStudent}
              onUpdate={updateStudent}
              editingStudent={editingStudent}
            />
          </div>
        </div>

        {/* Student Table */}
        <div className="panel">
          <div className="panel__header">
            <p className="panel__title">
              👨‍🎓 Enrolled Students
              <span className="panel__badge">Lists & Keys</span>
            </p>
            <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
              {students.length} students
            </span>
          </div>
          <div className="panel__body" style={{ padding: 0 }}>
            <StudentTable
              students={students}
              onDelete={deleteStudent}
              onEdit={startEdit}
              editingId={editingStudent?.id}
            />
          </div>
        </div>
      </div>

      {/* API Section */}
      <div className="panel">
        <div className="panel__header">
          <p className="panel__title">
            🌐 API Users from JSONPlaceholder
            <span className="panel__badge">useEffect</span>
          </p>
        </div>
        <div className="panel__body">
          <ApiUsers />
        </div>
      </div>
    </div>
  );
}

export default App;
