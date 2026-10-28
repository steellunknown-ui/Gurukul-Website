<div align="center">

# 🏛️ Gurukul Vidyapeeth English High School & Jr. College
### Official Institutional Web Portal & Academic Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.6-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://turbo.build/)

<p align="center">
  <b>Cultivating Character, Scholarly Rigour & Ambitious Minds (Jr. KG to Std XII)</b><br />
  A flagship digital presence for <i>Bhagwat Prasad Gurukul Educational Trust</i> under the Maharashtra State Board of Secondary & Higher Secondary Education.
</p>

[Explore Live Demo](https://github.com/steellunknown-ui/Gurukul-Website) • [Report Issue](https://github.com/steellunknown-ui/Gurukul-Website/issues) • [Request Feature](https://github.com/steellunknown-ui/Gurukul-Website/issues)

</div>

---

## 📌 Executive Summary

**Gurukul Vidyapeeth Web Platform** is an enterprise-grade, high-performance institutional portal designed and engineered to modernize school and junior college administration, student recruitment, academic transparency, and statutory compliance. 

Built with the bleeding-edge **Next.js 16 (App Router)** and **React 19**, the platform replaces conventional static academic websites with an interactive, lightning-fast digital campus featuring dynamic stream exploration, merit ranker archives, gated fee calculation engines, and statutory anti-ragging helplines.

### 🏛️ Institutional Credentials
* **Governing Body:** Bhagwat Prasad Gurukul Educational Trust
* **Founder:** Hon. Shri Bhagwat Prasad
* **Chairman:** Shri Biswajit Dibyalochan Mohanty
* **Maharashtra State Board Index:** `J-15.14.086`
* **Government Registration Reference:** `28903-97/DI-15/11/2016`
* **Academic Spectrum:** Jr. KG to Class XII (Maharashtra State Board SSC & HSC Science, Commerce, Arts)
* **Board Track Record:** Verified 99.9% Passing Track Record across Divisional Board Examinations

---

## ✨ Key Architectural Features & Engineering Highlights

### 1. 🎓 Board Toppers & Merit Hall of Fame (`/toppers`)
* **Interactive Lightbox Modal Engine:** Clicking on student portraits launches a customized, accessible modal with backdrop blur (`z-[9999]`), full merit credentials, key subject breakdown, and keyboard `Escape` dismissal with dual scroll locking.
* **Stream & Board Filtering:** Instant, client-side zero-latency categorization across HSC Science, HSC Commerce, HSC Arts, and SSC Class X.
* **Proportional Responsive Architecture:** Ergonomically designed compact cards balancing high information density with elegant luxury whitespace.

### 2. 💳 Standard-Wise Fee Engine & Printable Voucher System
* **Standard-Specific Modal Engine:** Covers Nursery to Std XII with itemized fee breakdowns (Tuition, Term, Science Laboratory, Computer IT, Library, Sports & Activity).
* **Payment Installment Calculations:** Real-time calculation of term-wise installments versus upfront one-time discount savings.
* **Print-Optimized Voucher CSS:** Dedicated `@media print` stylesheets enabling parents to generate and print formatted admission vouchers on demand.

### 3. 🎨 Bespoke Collegiate Design System
* **Curated Color Tokens:** Tailored royal academic palette featuring Deep Royal Maroon (`#9E1B32`), Royal Gold (`#DDA743`), Warm Linen (`#FCFAF7`), and Midnight Obsidian (`#180509`).
* **High-End Typography Hierarchy:** Intertwining Google Fonts *Cinzel* (institutional majesty), *Cormorant Garamond* (classical editorial headings), and *Plus Jakarta Sans* (crisp, modern digital legibility).
* **Hardware-Accelerated Micro-Interactions:** Smooth Framer Motion viewport triggers with custom Cubic-Bezier timing curves (`[0.21, 0.47, 0.32, 0.98]`).

### 4. 📱 Mobile-First Institutional Experience
* **Marquee Accreditation Bar:** Continuous CSS-hardware ticker showcasing government recognition, index numbers, and emergency desks with hover/touch pause.
* **Waterfall Cascading Navigation:** Multi-level desktop dropdown menus and full-screen accessible off-canvas mobile navigation drawer.
* **Mobile Quick-Action Dock:** Persistent bottom navigation bar with instant triggers for Admissions, Fee Structure, Notice Drawer, and WhatsApp Admissions Desk.

### 5. ⚡ Enterprise Performance & SEO Optimization
* **Hybrid Rendering:** Pre-rendered Static Site Generation (SSG) combined with streaming Server Components for sub-50ms Time To First Byte (TTFB).
* **Next-Gen Asset Pipeline:** Automated responsive `next/image` optimization with custom WebP/AVIF delivery.
* **Full Semantic SEO:** Open Graph tags, Twitter Card cards, canonical URLs, and structured JSON-LD educational schemas.

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale & Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16.4.3 (App Router)** | State-of-the-art server components, partial prefetching, and routing |
| **Runtime & Library** | **React 19.3.0** | Concurrent rendering, latest hooks, and optimized hydration |
| **Language** | **TypeScript 5.x** | End-to-end type safety, strict interface contracts, and maintainability |
| **Styling** | **Tailwind CSS v4.0** | Utility-first, zero-runtime CSS engine with custom design tokens |
| **Animation Engine** | **Framer Motion 14.6** | Viewport reveal triggers, smooth springs, and hover micro-interactions |
| **Icons** | **Lucide React** | Clean, accessible, lightweight vector iconography |
| **Bundler** | **Turbopack** | Next-generation ultra-fast incremental development bundler |
| **Deployment Target** | **Vercel Global Edge** | Distributed global CDN with automated edge image optimization |

---

## 📂 Repository Structure

```tree
gurukul-website/
├── public/
│   ├── favicon.ico
│   ├── logo.png                     # High-res official collegiate emblem
│   └── images/
│       ├── hero/                    # Hero slider carousel photography
│       └── toppers/                 # Verified topper portraits & convocation assets
├── src/
│   ├── app/
│   │   ├── globals.css              # Custom design tokens, scrollbars & keyframes
│   │   ├── layout.tsx               # Root layout, metadata & Google Font loaders
│   │   ├── not-found.tsx            # Custom 404 collegiate error page
│   │   ├── page.tsx                 # Dynamic institutional homepage
│   │   └── toppers/
│   │       └── page.tsx             # Board Toppers & Merit Hall of Fame
│   ├── components/
│   │   ├── home/                    # Homepage section components
│   │   │   ├── hero.tsx             # 5s interval continuous carousel
│   │   │   ├── highlights.tsx       # Institutional statutory credentials
│   │   │   ├── sections-explorer.tsx# 5-tier schooling structure (Jr. KG - Std X)
│   │   │   ├── streams-explorer.tsx # HSC Junior College (Science, Commerce, Arts)
│   │   │   ├── academic-track-record.tsx
│   │   │   ├── principal-message.tsx# Founder & Chairman's Desk
│   │   │   ├── campus-showcase.tsx  # Science labs & digital library
│   │   │   ├── fee-structure-modal.tsx
│   │   │   ├── enquiry-modal.tsx    # Interactive admission enquiry flow
│   │   │   └── notice-drawer.tsx    # Off-canvas circulars & updates
│   │   ├── layout/                  # Structural global components
│   │   │   ├── header.tsx           # Sticky responsive waterfall navigation
│   │   │   ├── footer.tsx           # Comprehensive institutional directory
│   │   │   ├── utility-bar.tsx      # Top statutory marquee & phone helpline
│   │   │   ├── mobile-nav.tsx       # Off-canvas drawer
│   │   │   └── mobile-dock.tsx      # Sticky thumb-friendly mobile dock
│   │   └── ui/                      # Reusable design system primitives
│   │       ├── animated-counter.tsx # Smooth number interpolation
│   │       ├── badge.tsx            # Academic tag badges
│   │       ├── button.tsx           # Accessible ripple button variants
│   │       ├── crest-logo.tsx       # Institution seal & collegiate typography
│   │       ├── motion-reveal.tsx    # Viewport animation wrapper
│   │       └── whatsapp-button.tsx  # Direct admissions desk communication
│   ├── config/
│   │   ├── college-config.ts        # Single source of truth for college metadata
│   │   └── toppers-data.ts          # Verified board merit archives & scores
│   ├── lib/
│   │   └── utils.ts                 # Classname merging utilities (clsx + twMerge)
│   └── types/
│       └── index.ts                 # TypeScript type definitions & interfaces
├── next.config.ts                   # Turbopack & Next.js production configurations
├── package.json                     # Project dependencies & scripts
├── tsconfig.json                    # Strict TypeScript compilation options
└── README.md                        # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or `v22.x` (LTS recommended)
* **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`
* **Git**: `v2.x+`

### 1. Clone the Repository
```bash
git clone https://github.com/steellunknown-ui/Gurukul-Website.git
cd Gurukul-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to view the live local instance.

### 4. Production Build & Validation
```bash
# Type check and build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 🛡️ Statutory Compliance & Student Safety

Gurukul Vidyapeeth maintains strict adherence to educational guidelines issued by the **Directorate of Education, Government of Maharashtra**:
* **Anti-Ragging Act Compliance:** Zero-tolerance enforcement under the *Maharashtra Prohibition of Ragging Act, 1999 (Act No. XXXIII of 1999)*.
* **National Anti-Ragging Helpline:** `1800-180-5522` (24x7 Toll-Free)
* **Women's Grievance & POCSO Committees:** Dedicated safety councils ensuring student welfare.
* **Institutional Code & Index:** Maharashtra State Board Index `J-15.14.086`.

---

## 👨‍💻 Developer & Maintainer

Engineered with passion for high-impact educational technology by **[steellunknown-ui](https://github.com/steellunknown-ui)**.

* **GitHub:** [@steellunknown-ui](https://github.com/steellunknown-ui)
* **Email:** [steellunknown@gmail.com](mailto:steellunknown@gmail.com)
* **Project Repository:** [Gurukul-Website](https://github.com/steellunknown-ui/Gurukul-Website)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for educational and institutional reference.

<div align="center">
  <b>॥ विद्या ददाति विनयं विनयाद् याति पात्रताम् ॥</b><br />
  <i>"Knowledge bestows humility; from humility comes worthiness."</i>
</div>
