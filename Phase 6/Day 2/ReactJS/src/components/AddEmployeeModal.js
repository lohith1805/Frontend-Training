import React, { useState } from 'react';
import './AddEmployeeModal.css';

const departments = ['Engineering', 'Design', 'Product', 'Analytics', 'Marketing', 'HR'];

function AddEmployeeModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: '', role: '', salary: '', department: departments[0],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.role.trim()) errs.role = 'Role is required';
    if (!form.salary || isNaN(form.salary) || Number(form.salary) <= 0)
      errs.salary = 'Enter a valid salary';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onAdd({ ...form, salary: Number(form.salary) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Add New Employee</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Arjun Mehta"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Role *</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Engineer"
              className={errors.role ? 'input-error' : ''}
            />
            {errors.role && <span className="error-msg">{errors.role}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Annual Salary (₹) *</label>
              <input
                name="salary"
                type="number"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 85000"
                className={errors.salary ? 'input-error' : ''}
              />
              {errors.salary && <span className="error-msg">{errors.salary}</span>}
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange}>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="modal__actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
