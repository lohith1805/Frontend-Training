# Bookly Store — eCommerce Bookstore Website

Bookly Store is a responsive multi-page bookstore eCommerce project built with HTML5, CSS3 and Vanilla JavaScript. It extends the Bookly bookstore template into a functional shopping experience with cart, wishlist, login popup, product details, related books, reviews and delivery address flow.

## Live Demo

Add your deployed URL here.

## Pages

- `index.html` — Home page with hero carousel, featured books, recently viewed, about and trust sections
- `product.html` — Book details, gallery, format selector, quantity, related books and reviews
- `wishlist.html` — Saved books with move-to-cart and remove actions
- `cart.html` — Cart items, price summary and delivery address dropdown form

## Features

- Animated hero carousel
- Book product cards with hover Add to Cart and Wishlist actions
- Cart and wishlist powered by localStorage
- Navbar badge counters and bounce feedback
- Login popup with name and mobile number
- Recently viewed books
- Product detail page with gallery, zoom and specs table
- Related books horizontal carousel row
- Star rating review form
- Delivery address dropdown and saved address summary
- Responsive design for mobile, tablet and desktop
- SEO files: `robots.txt`, `sitemap.xml`, meta tags and JSON-LD product schema
- Accessibility basics: semantic layout, labels, ARIA labels and visible focus states

## Tech Stack

- HTML5
- CSS3, custom CSS, no framework
- Vanilla JavaScript
- localStorage

## Folder Structure

```text
bookly-store/
├── index.html
├── product.html
├── cart.html
├── wishlist.html
├── README.md
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
```

## How to Run Locally

Open `index.html` directly in your browser, or use VS Code Live Server.

## Deployment

You can deploy using Netlify, Vercel or GitHub Pages.

## Lighthouse Targets

| Metric | Target |
|---|---:|
| SEO | 90+ |
| Accessibility | 90+ |
| Performance | 80+ |
| Best Practices | 85+ |

## Credits

- Base design assets: Bookly free bookstore template
- Font: System sans-serif font stack
