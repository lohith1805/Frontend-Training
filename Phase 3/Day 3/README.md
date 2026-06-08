# Phase 3 – Day 3: SaaS Product Landing Page

## Overview
A complete, production-grade SaaS landing page for **NexaFlow** built with **Bootstrap 5**, featuring a hero carousel, features grid, pricing section with toggle, testimonials carousel, contact modal, and footer.

## Sections
1. **Navbar** — Fixed top, transparent → frosted-glass on scroll, CTA button opens modal
2. **Hero Banner Carousel** — 3-slide full-screen carousel with unique gradient backgrounds, stats, and CTA buttons
3. **Logo Bar** — Trusted companies section
4. **Features Cards** — 6 feature cards with icon gradients, hover animations
5. **Pricing Section** — 3-tier cards (Starter/Pro/Enterprise) with Monthly ↔ Annual toggle
6. **Testimonials Carousel** — 2-slide carousel, 3-per-slide responsive grid
7. **CTA Banner** — Dark section with action buttons
8. **Contact Form Modal** — Full-featured modal form (triggered by multiple CTAs)
9. **Footer** — 5-column responsive footer with social links

## Bootstrap Components Used
| Component | Usage |
|-----------|-------|
| `Carousel` | Hero banner slider (3 slides, fade effect) |
| `Carousel` | Testimonials slider (multi-card per slide) |
| `Modal` | Contact Form popup |
| `Cards` | Feature cards, testimonial cards, pricing cards |
| `Navbar` | Fixed-top responsive navigation |
| `Buttons` | CTA, ghost, outline, hero variants |
| `Grid (col-*)` | All responsive layouts |
| `Form` | Contact modal form (inputs, select, textarea) |
| `Form Switch` | Pricing billing toggle |
| `Utilities` | flex, gap, text, d-none, py, mt, mb, etc. |

## How to Run
1. Open `index.html` in any modern browser — **no build step needed**.
2. All assets load from CDN (Bootstrap 5, Bootstrap Icons, Google Fonts).

## Interactive Features
- **Hero Carousel** — Auto-plays every 4.5s with indicator dots and prev/next controls
- **Testimonials Carousel** — 5s interval, manual prev/next controls with custom buttons
- **Pricing Toggle** — Switch between monthly and annual pricing in real time
- **Navbar Scroll** — Transparent on top, frosted dark glass when scrolled
- **Contact Modal** — Opens from multiple CTA buttons, form submits with success state
- **Scroll Animations** — Cards fade in via IntersectionObserver as they enter viewport
- **Smooth Scroll** — All anchor links scroll smoothly to sections

## File Structure
```
day3-saas-landing/
├── index.html   — Complete page HTML
├── style.css    — Custom CSS (CSS variables, all components, responsive)
├── script.js    — JS (navbar, carousels, pricing toggle, modal, scroll animations)
└── README.md    — This file
```

## Tech Stack
- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
- Google Fonts: Plus Jakarta Sans
- Vanilla JavaScript (Intersection Observer, Bootstrap JS API)
