# Day 3 – Student Management System

## 📌 Overview
A full-featured **Student Management React Application** demonstrating **Conditional Rendering**, **Lists & Keys**, **Forms in React**, and the **useEffect Hook** with real API data fetching.

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── StudentForm.js     # Registration form with validation – useState + forms
│   ├── StudentForm.css
│   ├── StudentTable.js    # Student list with search – lists, keys, conditional rendering
│   ├── StudentTable.css
│   ├── ApiUsers.js        # Fetches users from JSONPlaceholder – useEffect + fetch
│   └── ApiUsers.css
├── App.js                 # Root component – holds students state, composes panels
├── App.css                # Global styles, layout tokens
└── index.js               # React DOM entry point
```

---

## 🧠 Concepts Used

| Concept | Where Used |
|---|---|
| **Forms in React** | `StudentForm.js` — controlled inputs with `onChange` handlers |
| **Form Validation** | `StudentForm.js` — validate() function checks name, email, mobile |
| **useState** | `form`, `errors`, `submitted` in StudentForm; `search` in StudentTable |
| **Lists & Keys** | `StudentTable.js` — `students.map(s => <tr key={s.id}>...)` |
| **Conditional Rendering** | Empty states, success banner, loading/error/data in ApiUsers |
| **useEffect** | `ApiUsers.js` — fetches from JSONPlaceholder on mount |
| **API Fetch** | `fetch('https://jsonplaceholder.typicode.com/users')` |

---

## ✨ Features

### Student Registration Form
- ✅ Controlled inputs for Name, Email, Course, Mobile
- ✅ Form validation with inline error messages
- ✅ Success banner after submission (auto-hides after 3s)
- ✅ Dropdown for 8 available courses

### Student Table
- ✅ Dynamic table rendered with `array.map()` + `key` prop
- ✅ Live search filter (name or course)
- ✅ Delete button per student
- ✅ Empty state messages (no students / no search results)

### API Data Section
- ✅ Fetches 10 users from `jsonplaceholder.typicode.com/users`
- ✅ Loading spinner while fetching
- ✅ Error handling if fetch fails
- ✅ Click to expand/collapse user details (conditional rendering)

---

## ▶️ How to Run

### Prerequisites
- Node.js v16+ installed
- Internet connection (for the API fetch)

### Steps

```bash
# 1. Enter the project directory
cd student-management

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Opens at **http://localhost:3000**

---

## 📖 Key Learning Points

### Forms in React (Controlled Components)
```jsx
// State drives the input value
const [form, setForm] = useState({ name: '', email: '' });

// onChange updates state on every keystroke
const handleChange = (e) => {
  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

// Input is "controlled" — its value is always form.name
<input name="name" value={form.name} onChange={handleChange} />
```

### Lists & Keys
```jsx
// Render a list dynamically using .map()
// Always provide a stable, unique key prop!
{students.map(student => (
  <tr key={student.id}>       {/* key must be unique */}
    <td>{student.name}</td>
    <td>{student.email}</td>
  </tr>
))}
```

### Conditional Rendering
```jsx
// Method 1: Short-circuit &&
{isLoading && <Spinner />}

// Method 2: Ternary
{students.length === 0 ? <EmptyState /> : <Table />}

// Method 3: if/else before return
if (loading) return <Loading />;
if (error) return <Error />;
return <Data />;
```

### useEffect for API Fetch
```jsx
useEffect(() => {
  // Code here runs after the component renders
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => setError(err.message));
}, []); // [] = run only ONCE on mount (not on every re-render)
```

---

## 🔧 Customization
- Edit `COURSES` array in `StudentForm.js` to add more course options.
- Change the API URL in `ApiUsers.js` to fetch posts, todos, etc. from JSONPlaceholder.
- Style colors via CSS variables in `App.css` (`:root`).

---

## 🌐 API Reference
This app uses **JSONPlaceholder** — a free fake REST API for testing:
- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts`
- Todos: `https://jsonplaceholder.typicode.com/todos`
