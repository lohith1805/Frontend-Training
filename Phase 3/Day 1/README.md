# NexCore Technologies — Responsive IT Company Homepage

## Project Overview

A fully responsive IT company homepage built using **Bootstrap 5** as part of Phase 3 Day 1 training task. The project demonstrates core Bootstrap concepts including the Grid System, Containers, Navbar, Utility Classes, and responsive design across all screen sizes.

---

## Project Structure

```
it-company-homepage/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles (overrides & enhancements)
├── js/
│   └── script.js       # Custom JavaScript (scroll effects, interactions)
└── README.md           # Project documentation
```

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.3 | Grid, layout, components |
| Bootstrap Icons | 1.11.3 | Icon library |
| Google Fonts | — | Space Grotesk, DM Mono |
| Vanilla JS | ES6+ | Scroll effects, animations |

---

## Sections

| # | Section | Bootstrap Components Used |
|---|---|---|
| 1 | **Navbar** | `navbar`, `navbar-expand-lg`, `navbar-collapse`, `navbar-toggler` |
| 2 | **Hero** | `container`, `row`, `col-lg-*`, `d-flex`, `btn` |
| 3 | **About** | `container`, `row`, `col-lg-*`, `col-sm-*`, `position-relative` |
| 4 | **Services Grid** | `container`, `row`, `col-md-6 col-lg-4`, `h-100`, `g-4` |
| 5 | **Why Us** | `container`, `row`, `col-sm-6 col-lg-3`, `text-center` |
| 6 | **Contact / CTA** | `container`, `form-control`, `btn`, `row g-3` |
| 7 | **Footer** | `container`, `row g-4`, `col-lg-*`, `col-md-*` |

---

## Bootstrap Concepts Demonstrated

### Grid System
- 12-column responsive grid used throughout all sections
- Breakpoints: `col-sm-*`, `col-md-*`, `col-lg-*`
- Gap utilities: `g-3`, `g-4`, `gy-5`

### Containers
- `container` wraps every section for consistent max-width and padding

### Navbar
- `navbar-expand-lg` — collapses to hamburger on mobile
- `navbar-toggler` + `data-bs-toggle="collapse"` for mobile menu
- `fixed-top` for sticky positioning
- `ms-auto` to right-align nav items

### Responsive Classes
- `d-none d-lg-flex` — hides hero visual on mobile
- `text-center text-md-start` — responsive text alignment in footer
- `flex-wrap` — allows flex items to wrap on small screens
- `col-*` classes create responsive multi-column layouts

### Utility Classes
| Class | Usage |
|---|---|
| `mb-*`, `mt-*`, `pb-*`, `pt-*` | Spacing (margin/padding) |
| `d-flex`, `align-items-center` | Flexbox layout |
| `gap-*` | Flex/grid gap |
| `text-center`, `text-md-start` | Text alignment |
| `fw-700`, `fs-*` | Font weight & size |
| `h-100` | Full height cards |
| `position-relative`, `z-1` | Positioning |
| `border-0` | Remove borders |
| `mx-auto` | Center block elements |

### Buttons
- `btn btn-accent` — custom CTA button (primary accent colour)
- `btn-outline-light` — secondary outline button
- `btn-lg` — large button size
- `px-4`, `px-5` — horizontal padding utilities

### Forms
- `form-control`, `form-control-lg` — styled inputs and textarea
- Input focus ring customised with CSS variables

---

## Responsive Breakpoints

| Breakpoint | Screen Width | Layout Behaviour |
|---|---|---|
| `xs` (default) | < 576px | Single column, stacked layout |
| `sm` | ≥ 576px | 2-column for cards |
| `md` | ≥ 768px | 2-column services, aligned footer |
| `lg` | ≥ 992px | Full 3-column services, side-by-side about/hero |

---

## Custom CSS Features

- CSS custom properties (variables) for consistent theming
- Glassmorphism navbar with `backdrop-filter`
- CSS grid-background pattern on hero section
- Floating hexagon animation (`@keyframes floatHex`)
- Pulsing dot animation (`@keyframes pulse`)
- Hover transitions on service cards and advantage cards

---

## Custom JavaScript Features

- **Navbar scroll effect** — adds `.scrolled` class after 40px scroll
- **Mobile nav auto-close** — collapses menu when a link is clicked
- **Scroll-reveal** — `IntersectionObserver` fades in cards on scroll
- **Active nav link** — highlights current section in the navbar

---

## How to Run

1. Unzip the project folder
2. Open `index.html` in any modern browser
3. No build tools or server required — works directly from the file system

> For best results use Chrome, Firefox, Edge, or Safari (latest versions).

---

## Deliverables Checklist

- [x] HTML Project Folder
- [x] Mobile Responsive Layout
- [x] Bootstrap Grid System
- [x] Bootstrap Utilities
- [x] Responsive Navigation (hamburger on mobile)
- [x] Professional UI Design
- [x] README Documentation
