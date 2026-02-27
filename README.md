# PT Cipta Metalindo Persada — Corporate Website

![CMP Logo](https://img.shields.io/badge/CMP-Cipta%20Metalindo%20Persada-0B2A59?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> Production-ready corporate manufacturing website for **PT Cipta Metalindo Persada**, a leading Indonesian manufacturer of premium metal components and industrial solutions.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Internationalization (i18n)](#-internationalization-i18n)
- [CMS Abstraction Layer](#-cms-abstraction-layer)
- [Cloudinary Integration](#-cloudinary-integration)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [SEO Strategy](#-seo-strategy)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏭 Overview

A fully responsive, multi-page corporate website designed for a manufacturing company specializing in automotive, household, and industrial metal components. The website features:

- **4 main pages**: Home, About, Products, Contact
- **Full bilingual support**: English (EN) and Indonesian (ID)
- **CMS-agnostic data layer**: Ready for Strapi, Contentful, Sanity, or any headless CMS
- **Cloudinary-ready image optimization**: Auto-format, auto-quality, responsive
- **Production-grade architecture**: Type-safe, component-driven, performance-optimized

---

## ✨ Features

### Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, client logos, featured product grid (3×3), CTA |
| **About** | Company overview, stats section, vision & mission, vertical timeline |
| **Products** | Category tabs (2 Wheel, 4 Wheel, Rumah Tangga, Screen Oil, Rubber, Others), 3-column filterable grid |
| **Contact** | Centered CMP logo, contact form with validation, Google Maps, address cards |

### Core Features

- 🌍 **Internationalization** — EN/ID with locale switcher and persistent preference
- 📱 **Fully Responsive** — Mobile-first design with hamburger menu
- 🎨 **Design System** — Consistent dark blue (#0B2A59) branding with Tailwind utilities
- 🔍 **Product Filtering** — Category-based tab filtering with smooth transitions
- 📅 **Interactive Timeline** — Vertical left-line timeline with year badges
- 📝 **Contact Form** — Full validation with success state feedback
- ⚡ **Performance Optimized** — Lazy loading, optimized images, minimal bundle
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation

---

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 19.2 |
| **TypeScript** | Type Safety | 5.9 |
| **Vite** | Build Tool | 7.2 |
| **Tailwind CSS** | Styling | 4.1 |
| **React Router DOM** | Routing | 7.x |
| **Lucide React** | Icons | Latest |
| **clsx + tailwind-merge** | Class Utilities | Latest |

---

## 🏗 Architecture

### Rendering Strategy

This application uses a **Single Page Application (SPA)** architecture with hash-based routing for maximum compatibility. The architecture is designed to be easily migrated to Next.js 15 App Router with Server Components.

### Design Principles

1. **Component-Driven** — Reusable, composable UI components
2. **Feature-Based Separation** — Components, pages, CMS, i18n, types in dedicated directories
3. **Type-Safe Throughout** — TypeScript DTOs for all data structures
4. **CMS-Agnostic** — Data layer abstracted behind typed service functions
5. **Locale-Aware** — All content flows through the i18n context

### Component Architecture

```
App (Root)
├── LocaleProvider (Context)
│   └── AppContent (Router)
│       ├── Header (Fixed, with locale switcher)
│       ├── Pages
│       │   ├── HomePage
│       │   │   ├── HeroSection
│       │   │   ├── ClientLogos
│       │   │   ├── ProductCard[] (Featured)
│       │   │   └── CTA Section
│       │   ├── AboutPage
│       │   │   ├── HeroSection
│       │   │   ├── CompanyDescription
│       │   │   ├── Stats Grid
│       │   │   ├── Vision & Mission
│       │   │   └── Timeline
│       │   ├── ProductsPage
│       │   │   ├── HeroSection
│       │   │   ├── ProductTabs
│       │   │   └── ProductCard[] (Filtered)
│       │   └── ContactPage
│       │       ├── CMP Logo Section
│       │       ├── ContactForm
│       │       ├── Google Maps
│       │       └── Office Info Cards
│       └── Footer
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x (see `.nvmrc`)
- **npm** ≥ 10.x (or **pnpm** / **yarn**)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/cmp-corporate-website.git
cd cmp-corporate-website

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

### Quick Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

## 📁 Project Structure

```
cmp-corporate-website/
├── .editorconfig              # Editor configuration
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── .npmrc                     # npm configuration
├── .nvmrc                     # Node.js version
├── .prettierrc                # Prettier configuration
├── .prettierignore            # Prettier ignore rules
├── .vscode/                   # VS Code settings
│   ├── extensions.json        # Recommended extensions
│   └── settings.json          # Workspace settings
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # MIT License
├── README.md                  # This file
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
│
└── src/
    ├── main.tsx               # Application entry point
    ├── App.tsx                # Root component + routing
    ├── index.css              # Global styles + Tailwind imports
    │
    ├── i18n/                  # 🌍 Internationalization
    │   ├── index.ts           # Translation loader & types
    │   ├── LocaleContext.tsx   # React Context provider
    │   ├── en.json            # English translations (100+ keys)
    │   └── id.json            # Indonesian translations (100+ keys)
    │
    ├── types/                 # 📐 TypeScript type definitions
    │   └── index.ts           # Product, Timeline, Stat, Contact DTOs
    │
    ├── cms/                   # 🗄️ CMS abstraction layer
    │   ├── homepage.ts        # Client logos data
    │   ├── about.ts           # Stats, timeline data (localized)
    │   ├── products.ts        # 15 products, 6 categories
    │   └── contact.ts         # Contact info with localized fields
    │
    ├── components/            # 🧩 Reusable UI components
    │   ├── Header.tsx         # Fixed header + locale switcher + mobile menu
    │   ├── Footer.tsx         # Dark blue footer with map + contact
    │   ├── HeroSection.tsx    # Reusable hero with overlay, sizes, CTA
    │   ├── ProductCard.tsx    # Square card with hover effects
    │   ├── ProductTabs.tsx    # Category filter tab pills
    │   ├── Timeline.tsx       # Vertical timeline with left line
    │   └── ContactForm.tsx    # Form with validation + success state
    │
    ├── pages/                 # 📄 Page components
    │   ├── HomePage.tsx       # Hero + clients + featured grid + CTA
    │   ├── AboutPage.tsx      # Hero + description + stats + V&M + timeline
    │   ├── ProductsPage.tsx   # Hero + tabs + 3-column filterable grid
    │   └── ContactPage.tsx    # Logo + form + map + address cards
    │
    └── utils/                 # 🔧 Utility functions
        └── cn.ts              # Tailwind class merge utility
```

---

## 🌍 Internationalization (i18n)

### Supported Languages

| Code | Language | URL Pattern |
|------|----------|-------------|
| `en` | English | `/#home` |
| `id` | Indonesian | `/#home` |

### How It Works

1. **LocaleContext** wraps the entire app with current locale + translation access
2. **Translation JSON files** (`en.json`, `id.json`) contain all UI strings (100+ keys each)
3. **Locale switcher** in the header toggles between EN/ID
4. **Persistent preference** stored in `localStorage`
5. **Localized CMS data** uses `LocalizedField` type (`{ en: string; id: string }`)

### Usage in Components

```tsx
import { useLocale } from '@/i18n/LocaleContext';

function MyComponent() {
  const { locale, t } = useLocale();

  return (
    <h1>{t.hero.title}</h1>              // Static translations
    <p>{product.name[locale]}</p>         // CMS localized fields
  );
}
```

### Adding a New Language

1. Create `src/i18n/ja.json` (copy from `en.json`)
2. Add `'ja'` to the `Locale` type in `src/i18n/index.ts`
3. Import and register in the translations map
4. Add localized fields to CMS data

---

## 🗄️ CMS Abstraction Layer

The CMS layer is designed to be **provider-agnostic**. Currently uses static TypeScript files, but can be swapped for any headless CMS.

### Structure

```
src/cms/
├── homepage.ts     # clientLogos: ClientLogo[]
├── about.ts        # stats: Stat[], timeline: TimelineEvent[]
├── products.ts     # products: Product[], getProductsByCategory(), etc.
└── contact.ts      # contactInfo: ContactInfo
```

### Typed DTOs

```typescript
interface Product {
  id: string;
  name: LocalizedField;        // { en: string; id: string }
  description: LocalizedField;
  category: ProductCategory;
  image: string;
  featured: boolean;
}

interface TimelineEvent {
  year: string;
  title: LocalizedField;
  description: LocalizedField;
}
```

### Migration to Headless CMS

To migrate to Strapi/Contentful/Sanity:

1. Replace static data in `src/cms/*.ts` with API fetch functions
2. Keep the same TypeScript interfaces
3. Add API URL + keys to `.env.local`
4. Components remain unchanged — they only consume typed data

---

## ☁️ Cloudinary Integration

### Setup (When Ready)

```bash
# .env.local
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Reusable Component Pattern

```tsx
// Replace <img> tags with Cloudinary-optimized URLs:
const cloudinaryUrl = (publicId: string, options: {w?: number; h?: number}) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${options.w}/v1/${publicId}`;
```

### Current Image Strategy

- Images use direct URLs with `w` and `q` parameters
- `loading="lazy"` for below-fold images
- `loading="eager"` for hero/above-fold images
- Responsive via CSS `object-cover` + `aspect-square`

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name |
| `VITE_CMS_API_URL` | No | Headless CMS API endpoint |
| `VITE_CMS_API_KEY` | No | CMS authentication key |
| `VITE_GOOGLE_MAPS_API_KEY` | No | Google Maps API key |
| `VITE_CONTACT_FORM_ENDPOINT` | No | Form submission endpoint |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics ID |
| `VITE_SITE_URL` | No | Production site URL |
| `VITE_DEFAULT_LOCALE` | No | Default locale (`en` or `id`) |

See `.env.example` for the full template.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview the production build locally |

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Vercel Configuration

The project is zero-config for Vercel. It will auto-detect Vite and configure the build pipeline.

### Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Static Hosting

The build output (`dist/`) can be deployed to any static hosting:
- **Vercel** — Zero config
- **Netlify** — Zero config
- **AWS S3 + CloudFront**
- **Firebase Hosting**
- **GitHub Pages**

---

## ⚡ Performance

### Optimization Strategies

| Strategy | Implementation |
|----------|---------------|
| **Code Splitting** | Vite automatic chunk splitting |
| **Image Optimization** | Lazy loading, responsive sizes, Cloudinary-ready |
| **CSS Purging** | Tailwind CSS tree-shaking |
| **Font Loading** | System font stack (no external font requests) |
| **Bundle Size** | Single-file output via `vite-plugin-singlefile` |
| **Caching** | Immutable asset hashing |

### Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 90+ |

---

## 🔍 SEO Strategy

| Feature | Implementation |
|---------|---------------|
| **Meta Tags** | Dynamic `<title>` per page |
| **Semantic HTML** | `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>` |
| **Heading Hierarchy** | Proper H1 → H2 → H3 structure |
| **Alt Text** | All images have descriptive alt attributes |
| **Structured Data** | Ready for JSON-LD Organization schema |
| **Language Tags** | `lang` attribute on `<html>` |
| **Open Graph** | Meta tags ready for social sharing |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start

```bash
# Fork & clone
git clone https://github.com/your-username/cmp-corporate-website.git
cd cmp-corporate-website

# Install & run
npm install
npm run dev

# Create a branch
git checkout -b feature/your-feature

# Make changes, then submit a PR
```

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 📞 Contact

**PT Cipta Metalindo Persada**
- 📧 Email: info@ciptametalindo.com
- 📱 Phone: +62 21 5555 1234
- 📍 Address: Jl. Industri Raya No. 45, Kawasan Industri Jababeka, Cikarang, Bekasi 17530, Indonesia

---

<p align="center">
  <strong>Built with ❤️ by PT Cipta Metalindo Persada Engineering Team</strong>
</p>
