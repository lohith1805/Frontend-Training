import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const COURSES = [
  'React Development',
  'Python & Django',
  'Data Science',
  'Node.js Backend',
  'UI/UX Design',
  'DevOps & Cloud',
  'Android Development',
  'Machine Learning',
];

const initialForm = { name: '', email: '', course: COURSES[0], mobile: '' };

function StudentForm({ onAdd, onUpdate, editingStudent }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // When editingStudent changes, populate the form with that student's data
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
        mobile: editingStudent.mobile,
      });
      setErrors({});
      setSubmitted(false);
    } else {
      setForm(initialForm);
      setErrors({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Student name is required';
    else if (form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters';

    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';

    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile.trim())) errs.mobile = 'Enter a valid 10-digit number';

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const cleanData = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
    };

    if (editingStudent) {
      // Edit mode — call onUpdate
      onUpdate(cleanData);
    } else {
      // Add mode — call onAdd
      onAdd(cleanData);
      setForm(initialForm);
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const isEditing = !!editingStudent;

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      {/* Success Banner — Conditional Rendering */}
      {submitted && !isEditing && (
        <div className="sf-success">
          ✅ Student registered successfully!
        </div>
      )}

      {/* Edit mode banner */}
      {isEditing && (
        <div className="sf-edit-banner">
          ✏️ Editing: <strong>{editingStudent.name}</strong>
        </div>
      )}

      <div className="sf-group">
        <label className="sf-label" htmlFor="name">Full Name *</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Aarav Patel"
          className={`sf-input ${errors.name ? 'sf-input--error' : ''}`}
        />
        {errors.name && <span className="sf-error">{errors.name}</span>}
      </div>

      <div className="sf-group">
        <label className="sf-label" htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="e.g. aarav@example.com"
          className={`sf-input ${errors.email ? 'sf-input--error' : ''}`}
        />
        {errors.email && <span className="sf-error">{errors.email}</span>}
      </div>

      <div className="sf-group">
        <label className="sf-label" htmlFor="course">Course</label>
        <select
          id="course"
          name="course"
          value={form.course}
          onChange={handleChange}
          className="sf-input"
        >
          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="sf-group">
        <label className="sf-label" htmlFor="mobile">Mobile Number *</label>
        <input
          id="mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="10-digit number"
          maxLength="10"
          className={`sf-input ${errors.mobile ? 'sf-input--error' : ''}`}
        />
        {errors.mobile && <span className="sf-error">{errors.mobile}</span>}
      </div>

      <button type="submit" className={`sf-submit ${isEditing ? 'sf-submit--edit' : ''}`}>
        {isEditing ? '💾 Save Changes' : '+ Register Student'}
      </button>

      {/* Code hint box */}
      <div className="sf-hint">
        {isEditing
          ? <><code>useEffect</code> populates form when editing · <code>onUpdate</code> saves changes</>
          : <><code>useState</code> manages form data · <code>onChange</code> updates state · validation runs on submit</>
        }
      </div>
    </form>
  );
}

export default StudentForm;
