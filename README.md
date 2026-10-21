# ABHA — The Glow of New Trends
> **Premium Modest Men's Fashion & Artisanal Fragrances E-Commerce Platform**

[![React](https://img.shields.io/badge/React-18.x-61dafb.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

ABHA (আভা) is a high-fashion, minimalist luxury e-commerce platform tailored for contemporary modest men's apparel and artisanal oriental perfumery. Designed with high-fashion editorial aesthetics, refined Bengali typography, and seamless interactive user experiences.

---

## ✨ Key Highlights

- **Frameless Ambient Hero Carousel**:
  - 5-second smooth automatic cross-fading hero showcase.
  - Seamless edge gradient blending into the dark luxury backdrop without harsh bounding frames or borders.
  - Minimal slide indicators with responsive high-fashion typography.

- **Dynamic Right-to-Left (RTL) Product Showcase**:
  - Continuous smooth auto-scrolling marquee moving right to left in the *Trending Now* section.
  - Smart pause-on-hover mechanism allowing effortless product inspection, size selection, and cart addition.
  - Dual view modes: `▶ AUTO-SCROLL (RTL)` and `▦ GRID VIEW`, plus manual Play/Pause controls.

- **Dedicated Category Collections**:
  - **Panjabi & Kabli**: Traditional handloom, premium Egyptian jacquard, and royal embroidery.
  - **Arabian Jubbah & Thobe**: Wrinkle-free breathable silky matte Emirati fabrics.
  - **Artisanal Attar & Oud**: 100% alcohol-free pure Cambodian agarwood, royal white musk, and Taif rose.
  - **Minimal Streetwear**: 240 GSM heavy combed ring-spun cotton oversized tees.

- **Interactive Smart Features**:
  - **Size Advisor**: Calculates optimal garment size (M/L/XL/XXL) based on customer height (feet/inches) and weight (kg).
  - **Slide-over Cart**: Live subtotal calculations with dynamic free shipping progress bar (Free delivery on orders over ৳3,000).
  - **Product Quick View Modal**: High-resolution image preview, color swatches, size picker, and detailed Bengali descriptions.
  - **Wishlist & Cart Persistence**: Saved automatically to browser `localStorage`.
  - **Express Checkout Modal**: Cash on Delivery (COD) and Mobile Banking (bKash/Nagad) support with delivery area calculation (Inside Dhaka: ৳70, Outside Dhaka: ৳130).

---

## 📁 Project Structure

```text
├── index.html               # Classic HTML5 + Tailwind prototype
├── assets/                  # Original prototype assets & styles
│   ├── css/style.css
│   ├── js/app.js
│   ├── js/products.js
│   └── images/
├── react-app/               # React Application
│   ├── index.html           # Standalone zero-setup browser runnable React App
│   ├── package.json         # Node package configuration
│   ├── assets/              # High-res authentic imagery
│   │   └── images/
│   │       ├── panjabi.jpg
│   │       ├── jubbah.jpg
│   │       └── tshirt.jpg
│   └── src/                 # Modular React components
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── Categories.jsx
│       │   ├── ProductCard.jsx
│       │   ├── ProductModal.jsx
│       │   ├── CartDrawer.jsx
│       │   ├── CheckoutModal.jsx
│       │   ├── SizeAdvisorModal.jsx
│       │   ├── CategoryPage.jsx
│       │   └── Footer.jsx
│       └── data/
│           └── products.js
└── README.md
```

---

## 🚀 Getting Started

### Option 1: Instant Browser Launch (Zero Setup Required)
You can directly double-click or open `react-app/index.html` in any modern web browser (Chrome, Firefox, Safari, Edge). It runs via React 18 and Babel Standalone out of the box with zero npm install needed.

```bash
# On Linux
xdg-open react-app/index.html

# On macOS
open react-app/index.html

# On Windows
start react-app/index.html
```

### Option 2: Modern Node.js / Vite Development
```bash
cd react-app
npm install
npm run dev
```

---

## 🎨 Design Philosophy & Typography

- **Cormorant Garamond**: High-fashion serif luxury for brand presence and editorial statements.
- **Hind Siliguri**: Crisp, legible, modern Bengali typography for descriptions, titles, and localized checkout experience.
- **Plus Jakarta Sans**: Clean contemporary geometric sans-serif for UI elements, pricing, and system badges.
- **Color Palette**: Deep Charcoal/Pitch Black (`#090a0d`), Alabaster White (`#ffffff`), Stone Grey neutrals, and warm Amber-Gold accents (`#f59e0b`).

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
