# Day 2 – Employee Management Dashboard

## 📌 Overview
An interactive **Employee Management Dashboard** built with React demonstrating **Props**, **State**, **Event Handling**, and the **useState Hook**.

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── EmployeeCard.js       # Displays one employee – uses Props
│   ├── EmployeeCard.css
│   ├── AddEmployeeModal.js   # Form modal to add employees – uses useState + events
│   ├── AddEmployeeModal.css
│   ├── Counter.js            # Standalone counter widget – pure useState demo
│   └── Counter.css
├── App.js                    # Root – holds all state, passes props down
├── App.css                   # Global styles, layout, sidebar
└── index.js                  # React DOM entry point
```

---

## 🧠 Concepts Used

| Concept | Where Used |
|---|---|
| **Props** | `EmployeeCard` receives `employee`, `onLike`, `onDelete`, `onToggleStatus` |
| **useState** | `employees`, `showModal`, `filter` in `App.js`; `count` in `Counter.js`; `form`, `errors` in `AddEmployeeModal.js` |
| **Event Handling** | `onClick` on Like, Delete, Toggle, Add buttons |
| **State Updates** | Immutable updates using `.map()`, `.filter()`, spread operator |
| **Conditional Rendering** | Modal shown/hidden with `{showModal && <Modal />}` |
| **Lifting State Up** | Child components call callback props to update parent state |

---

## ✨ Features

- ✅ **Employee Cards** — Name, Role, Salary, Department, Active/Inactive badge
- ✅ **Like Button** — Increments like count per employee (useState)
- ✅ **Toggle Status** — Switches Active ↔ Inactive per employee
- ✅ **Delete Employee** — Removes from list via filter
- ✅ **Add Employee Modal** — Form with validation to add new employees
- ✅ **Counter Widget** — Standalone `+` / `−` / `Reset` counter demo
- ✅ **Department Filter Tabs** — Filter grid by department
- ✅ **Live Stats** — Total, Active, Inactive counts update in real time
- ✅ **Responsive Layout** with sidebar

---

## ▶️ How to Run

### Prerequisites
- Node.js v16+ installed

### Steps

```bash
# 1. Enter the project directory
cd employee-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Opens at **http://localhost:3000**

---

## 📖 Key Learning Points

### Props
```jsx
// Parent passes data and handlers to child:
<EmployeeCard
  employee={emp}         // data (object)
  onLike={handleLike}    // event handler (function)
  onDelete={handleDelete}
/>

// Child receives via destructuring:
function EmployeeCard({ employee, onLike, onDelete }) { ... }
```

### useState
```jsx
const [employees, setEmployees] = useState(initialEmployees);
// Never mutate state directly!
// Wrong:  employees.push(newEmp)
// Right:  setEmployees(prev => [...prev, newEmp])
```

### Event Handling
```jsx
<button onClick={() => onLike(id)}>❤️ Like</button>
<button onClick={handleSubmit}>Add Employee</button>
```

### Conditional Rendering
```jsx
{showModal && <AddEmployeeModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
```

---

## 🔧 Customization
- Edit `initialEmployees` in `App.js` to change the starting data.
- Add more fields (email, joining date) in `AddEmployeeModal.js` and `EmployeeCard.js`.
- Change color scheme via CSS variables in `App.css`.
