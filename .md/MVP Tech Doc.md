# MVP Tech Doc.md — Possible Machines 3D Website

---

## 1. Purpose

This document defines the **Minimum Viable Product (MVP)** scope, tech decisions, and implementation plan for the Possible Machines 3D website. The MVP is designed to be launched within 4–6 weeks with core features only, then iterated upon.

---

## 2. MVP Scope Definition

### ✅ IN SCOPE (MVP)

| Feature | Priority | Notes |
|---|---|---|
| 3D Hero Section | P0 | Animated machine / industrial scene |
| Product Listing Page | P0 | All categories displayed |
| Product Detail Page | P0 | Name, description, specs, image |
| YouTube Video Embeds | P0 | Product video section |
| Enquiry / Quote Form | P0 | Basic lead capture |
| Mobile Responsive Design | P0 | Essential for Indian market |
| About Us Page | P1 | Company story, location, stats |
| Google Maps Embed | P1 | Factory location in Igatpuri |
| SEO Basics | P1 | Meta tags, OG tags, sitemap |
| WhatsApp CTA Button | P1 | Common in Indian B2B sites |

### ❌ OUT OF SCOPE (Post-MVP)

- Admin CMS dashboard
- E-commerce / payment gateway
- User accounts / login
- Product 3D model viewer per product
- Multilingual support (Hindi / Marathi)
- Live chat widget
- Blog / news section

---

## 3. Tech Stack (MVP)

```
Frontend:
  - React 18 + Vite
  - React Three Fiber + Three.js (r3f)
  - @react-three/drei (helpers)
  - Tailwind CSS
  - React Router v6
  - Framer Motion (page transitions)

Backend:
  - Firebase Firestore (enquiry storage)
  - Firebase Functions (email trigger)
  - SendGrid (email delivery)

Hosting:
  - Vercel (frontend)
  - Firebase (backend services)

Tools:
  - Blender (3D model prep)
  - gltfjsx (convert .glb to React components)
  - Draco (model compression)
```

---

## 4. Key MVP Pages & Components

### 4.1 Page: Home (/)

```
Section 1: HeroSection
  - Fullscreen Three.js canvas
  - Animated factory/machine 3D scene
  - Overlay: Company name, tagline, CTA buttons
  - Scroll indicator arrow

Section 2: CompanyStats
  - Est. 2014 | 25+ Products | 26-50 Employees
  - Animated counters on scroll

Section 3: ProductHighlights
  - 6 featured product cards (3D flip cards)
  - "View All" CTA

Section 4: VideoSection
  - 3 YouTube embeds (product demos)
  - Grid layout

Section 5: WhyChooseUs
  - Key differentiators (quality, experience, price)

Section 6: ContactCTA
  - Enquiry form + WhatsApp button
```

### 4.2 Page: Products (/products)

```
- Category filter tabs
- Product grid cards (image, name, "Get Quote" CTA)
- Each card links to /products/:id
```

### 4.3 Page: Product Detail (/products/:id)

```
- Product images gallery
- Specifications table
- YouTube video embed (if available)
- Enquiry form (pre-filled with product name)
```

### 4.4 Page: About (/about)

```
- Company story timeline
- MD Sachin Shitole profile
- Factory photos
- Google Maps embed
- Company stats
```

### 4.5 Page: Contact (/contact)

```
- Enquiry form
- Phone / WhatsApp
- Address
- Google Maps
```

---

## 5. 3D Hero — Technical Implementation

```jsx
// Tech: React Three Fiber + drei
// File: src/components/3d/HeroScene.jsx

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

// Scene: Industrial machine on factory floor
// - Animated rotating machine model
// - Particle dust effect
// - HDR environment lighting
// - Auto-rotate camera on load

// Fallback: CSS-animated industrial illustration for mobile
```

**3D Model Sources (MVP):**
- Use free industrial machinery GLB from Sketchfab (licensed)
- OR procedural geometry built in Three.js (no external model needed)
- Draco-compressed, under 2MB per model

---

## 6. Enquiry Form — Technical Flow

```
User fills form
    │
    ▼
React state validation
    │
    ▼ POST
Firebase Cloud Function
    │
    ├──▶ Store in Firestore (leads collection)
    │
    └──▶ SendGrid email to admin
              Subject: "New Enquiry from [Name] - [Product]"
              Body: Name, Phone, Email, Message, Product
```

**Form Fields:**
- Name (required)
- Phone (required, Indian format validation)
- Email (optional)
- Product of Interest (dropdown)
- Message (optional)
- reCAPTCHA v3

---

## 7. Product Data Structure (JSON)

```json
{
  "id": "pm24-fly-ash-brick",
  "name": "PM24 Fly Ash Brick Making Machine",
  "category": "fly-ash-bricks-making-machine",
  "description": "Used for paver block, brick and hollow concrete block making...",
  "specifications": {
    "productionCapacity": "8000-10000 bricks/shift",
    "gradeAvailable": "Standard",
    "automation": "Semi-Automatic"
  },
  "images": ["pm24-1.jpg", "pm24-2.jpg"],
  "youtubeVideoId": "YOUTUBE_VIDEO_ID",
  "featured": true
}
```

---

## 8. MVP Timeline

| Week | Milestone |
|---|---|
| Week 1 | Project setup, design system, Tailwind config, routing |
| Week 2 | 3D Hero section, Home page layout |
| Week 3 | Products page, Product detail page |
| Week 4 | About, Contact, Enquiry form + Firebase |
| Week 5 | YouTube embeds, SEO, WhatsApp CTA, testing |
| Week 6 | QA, performance optimization, deployment to Vercel |

---

## 9. Performance Targets (MVP)

| Metric | Target |
|---|---|
| Lighthouse Performance Score | ≥ 75 |
| First Contentful Paint | < 2.5s |
| Time to Interactive | < 4s |
| 3D Scene Load Time | < 3s |
| Mobile Score | ≥ 70 |

---

## 10. Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_SENDGRID_API_KEY=          # Server-side only
VITE_RECAPTCHA_SITE_KEY=
VITE_GOOGLE_MAPS_API_KEY=
VITE_WHATSAPP_NUMBER=91XXXXXXXXXX
```

---

*End of MVP Tech Doc.md*
