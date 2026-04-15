# Architecture.md — Possible Machines 3D Website

---

## 1. Overview

This document defines the technical architecture for the **Possible Machines 3D Website** — a modern, immersive web experience for Possible Machines Private Limited (Igatpuri, Nashik). The architecture is designed for performance, scalability, and maintainability.

---

## 2. High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                     │
│                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌────────────────┐  │
│   │  React.js   │   │  Three.js   │   │  Tailwind CSS  │  │
│   │  (UI Layer) │   │  (3D Layer) │   │  (Styling)     │  │
│   └──────┬──────┘   └──────┬──────┘   └───────┬────────┘  │
│          └─────────────────┼───────────────────┘           │
│                            │                               │
│                    ┌───────▼───────┐                       │
│                    │  Vite Bundler │                       │
│                    └───────┬───────┘                       │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────┐
│                        CDN / HOSTING                        │
│              (Vercel / Netlify / AWS CloudFront)            │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      BACKEND (Optional)                     │
│                                                             │
│   ┌─────────────────┐        ┌──────────────────────────┐  │
│   │  Node.js / Express│      │  Firebase / Supabase     │  │
│   │  (API Server)   │        │  (Form Submissions / DB) │  │
│   └────────┬────────┘        └──────────────────────────┘  │
│            │                                                │
│   ┌────────▼────────┐                                       │
│   │  Email Service  │                                       │
│   │  (NodeMailer /  │                                       │
│   │   SendGrid)     │                                       │
│   └─────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React.js 18+ | Component-based UI |
| 3D Engine | Three.js + React Three Fiber | 3D rendering & animations |
| 3D Helpers | @react-three/drei | Orbit controls, loaders, helpers |
| Animation | GSAP / Framer Motion | Scroll animations, transitions |
| Routing | React Router v6 | SPA navigation |
| Styling | Tailwind CSS + CSS Modules | Responsive styling |
| Bundler | Vite | Fast build & dev server |
| State | Zustand | Global state management |

### 3.2 Folder Structure

```
possible-machines-3d/
├── public/
│   ├── models/              # .glb / .gltf 3D machine models
│   ├── textures/            # Material textures
│   ├── images/              # Static images
│   └── videos/              # Local product videos
├── src/
│   ├── components/
│   │   ├── 3d/              # Three.js scene components
│   │   │   ├── Scene.jsx
│   │   │   ├── MachineModel.jsx
│   │   │   ├── Particles.jsx
│   │   │   └── Lighting.jsx
│   │   ├── ui/              # UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── VideoEmbed.jsx
│   │   │   └── ContactForm.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   └── useModelLoader.js
│   ├── store/               # Zustand state
│   ├── utils/
│   └── assets/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 4. Backend Architecture (MVP)

### 4.1 Services

| Service | Purpose | Tool |
|---|---|---|
| Enquiry / Quote Form | Capture lead forms | Firebase Firestore |
| Email Notification | Alert admin on new enquiry | SendGrid / NodeMailer |
| Product Data | Store product catalog | JSON / Headless CMS |
| Analytics | Track user behavior | Google Analytics 4 |

### 4.2 API Endpoints (if custom backend)

```
POST /api/enquiry        → Submit enquiry form
GET  /api/products       → Fetch product list
GET  /api/products/:id   → Fetch single product details
```

---

## 5. 3D Rendering Architecture

### 5.1 Scene Graph

```
Canvas (React Three Fiber)
├── PerspectiveCamera
├── OrbitControls
├── AmbientLight
├── DirectionalLight (x2)
├── HeroScene
│   ├── FactoryFloor (geometry)
│   ├── MachineModel (GLB)
│   └── ParticleSystem
└── ProductScene
    ├── ProductModel (GLB on demand)
    └── EnvironmentMap
```

### 5.2 3D Performance Strategy

- Use **LOD (Level of Detail)** for machine models
- **Lazy-load** 3D models only when section is in viewport
- Compress all `.glb` models using **Draco compression**
- Use **KTX2** format for compressed textures
- Enable **frustum culling** on all meshes
- Target: 60 FPS on desktop, 30 FPS on mobile

---

## 6. Hosting & Deployment

```
GitHub Repo
    │
    ▼ (Push to main)
GitHub Actions CI/CD
    │
    ▼
Build: vite build
    │
    ├──▶ Vercel (Frontend — Static)
    │
    └──▶ Firebase / Supabase (Backend / DB)
```

### 6.1 CDN Strategy
- Static assets (images, models, textures) served from CDN edge nodes
- YouTube videos embedded via `<iframe>` (no hosting cost)

---

## 7. Security Architecture

| Concern | Solution |
|---|---|
| Form spam | reCAPTCHA v3 |
| API abuse | Rate limiting (express-rate-limit) |
| XSS | React's built-in escaping + CSP headers |
| HTTPS | SSL via Vercel / Let's Encrypt |
| Env secrets | `.env` + Vercel env variables |

---

## 8. Browser & Device Support

| Platform | Target |
|---|---|
| Desktop Chrome/Firefox/Edge | Full 3D experience |
| Mobile Chrome (Android) | Simplified 3D / fallback |
| Mobile Safari (iOS) | CSS-based fallback for heavy 3D |
| Minimum WebGL | WebGL 2.0 required |

---

*End of Architecture.md*
