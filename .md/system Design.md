# System Design.md — Possible Machines 3D Website

---

## 1. Overview

This document covers the end-to-end system design for the Possible Machines 3D website, including frontend rendering pipeline, backend services, data flows, and infrastructure.

---

## 2. System Components

```
┌────────────────────────────────────────────────────────────────┐
│                        POSSIBLE MACHINES                       │
│                        3D WEBSITE SYSTEM                       │
└────────────────────────────────────────────────────────────────┘

     [USER BROWSER]
           │
           │ HTTPS Request
           ▼
     [CDN / VERCEL EDGE]
           │
           │ Serve static bundle (JS/CSS/HTML)
           ▼
     [REACT SPA]
      ├── React Router (client-side navigation)
      ├── Three.js / R3F Canvas (3D rendering)
      ├── UI Components (Tailwind)
      └── API Client (Firebase SDK / Axios)
           │
           │ API Calls
           ▼
     [FIREBASE BACKEND]
      ├── Firestore (NoSQL DB — leads, products)
      ├── Cloud Functions (email triggers, API)
      └── Firebase Auth (admin only)
           │
           │ Email
           ▼
     [SENDGRID]
           │ Delivered
           ▼
     [ADMIN EMAIL]
```

---

## 3. Data Flow Diagrams

### 3.1 Enquiry Form Submission Flow

```
User fills form
      │
      ▼
Client-side validation
  - Phone: /^[6-9]\d{9}$/ (Indian mobile)
  - Name: required, min 2 chars
  - Product: selected from dropdown
      │
      ▼
reCAPTCHA v3 token generated
      │
      ▼ HTTP POST
Firebase Cloud Function: /submitEnquiry
      │
      ├── Verify reCAPTCHA token (score > 0.5)
      │
      ├── Write to Firestore:
      │     Collection: "leads"
      │     Document: {
      │       name, phone, email,
      │       product, message,
      │       timestamp, source: "website"
      │     }
      │
      └── SendGrid email:
            To: sachin@possiblemachines.in
            Subject: "New Enquiry – [ProductName]"
            Body: Full form data
      │
      ▼
Return { success: true } to client
      │
      ▼
UI shows: "Thank you! We'll call you shortly."
```

### 3.2 Product Data Load Flow

```
User navigates to /products
      │
      ▼
React Router renders <ProductsPage />
      │
      ▼
useEffect → fetch products
  Option A (Static JSON):
    import products from '/data/products.json'
    → Instant, no network call
  Option B (Firestore):
    getDocs(collection(db, "products"))
    → Async load with skeleton UI
      │
      ▼
Products rendered in grid
User clicks category tab → filter by category (client-side)
User clicks product → navigate to /products/:id
```

### 3.3 3D Scene Load Flow

```
Browser requests /
      │
      ▼
React app boots, <Canvas /> mounts
      │
      ▼
drei <Suspense> + <Preload /> kicks in
      │
      ├── Load HDR environment map (lazy, ~500KB)
      │
      └── useGLTF() loads machine.glb
              │ Draco-compressed
              │ ~1.5MB over network
              ▼
          GLB decoded in worker thread
              │
              ▼
          Model placed in scene
          Lighting applied
          Animation loop starts (requestAnimationFrame)
              │
              ▼
          3D hero visible to user
```

---

## 4. Database Schema (Firestore)

### Collection: `leads`

```json
{
  "id": "auto-generated",
  "name": "string (required)",
  "phone": "string (required)",
  "email": "string (optional)",
  "product": "string",
  "message": "string",
  "timestamp": "Timestamp",
  "source": "website | whatsapp | phone",
  "status": "new | contacted | converted",
  "ipAddress": "string (hashed)"
}
```

### Collection: `products`

```json
{
  "id": "pm24-fly-ash-brick",
  "name": "PM24 Fly Ash Brick Making Machine",
  "slug": "pm24-fly-ash-brick-making-machine",
  "category": "fly-ash-bricks-making-machine",
  "categoryLabel": "Fly Ash Bricks Making Machine",
  "description": "string",
  "shortDescription": "string (max 160 chars)",
  "specifications": {
    "key": "value"
  },
  "images": ["url1", "url2"],
  "youtubeVideoId": "string or null",
  "featured": "boolean",
  "order": "number",
  "createdAt": "Timestamp"
}
```

### Collection: `settings`

```json
{
  "id": "contact",
  "phone": "08047549587",
  "whatsapp": "919XXXXXXXXX",
  "email": "info@possiblemachines.in",
  "address": "Gut No 115, Wadivarhe, Igatpuri - 422403",
  "gmapEmbedUrl": "string"
}
```

---

## 5. Component Architecture (Frontend)

```
App
├── Router
│   ├── / → <HomePage />
│   │   ├── <HeroSection3D />       ← Three.js Canvas
│   │   ├── <StatsSection />
│   │   ├── <FeaturedProducts />
│   │   ├── <VideoSection />        ← YouTube iFrames
│   │   ├── <WhyChooseUs />
│   │   └── <ContactCTA />
│   │
│   ├── /products → <ProductsPage />
│   │   ├── <CategoryTabs />
│   │   └── <ProductGrid />
│   │       └── <ProductCard /> (×n)
│   │
│   ├── /products/:id → <ProductDetailPage />
│   │   ├── <ImageGallery />
│   │   ├── <SpecsTable />
│   │   ├── <VideoEmbed />
│   │   └── <EnquiryForm />
│   │
│   ├── /about → <AboutPage />
│   │   ├── <CompanyTimeline />
│   │   ├── <FounderCard />
│   │   └── <MapEmbed />
│   │
│   └── /contact → <ContactPage />
│       ├── <EnquiryForm />
│       ├── <ContactInfo />
│       └── <MapEmbed />
│
├── <Navbar />
├── <Footer />
└── <WhatsAppFAB />               ← Floating Action Button
```

---

## 6. State Management

```
Zustand Store Structure:

{
  products: {
    list: Product[],
    selectedCategory: string,
    loading: boolean,
    error: string | null,
  },
  
  enquiry: {
    submitting: boolean,
    submitted: boolean,
    error: string | null,
  },
  
  ui: {
    navOpen: boolean,
    theme: "dark" | "light",
  }
}
```

---

## 7. SEO System Design

### Per-Page Meta Tags (React Helmet Async)

```jsx
// Home
<title>Possible Machines - Paver Block & Fly Ash Brick Machine Manufacturer | Nashik</title>
<meta name="description" content="Possible Machines, Igatpuri Nashik. Manufacturer of Fly Ash Brick Making Machine, Paver Block Machine, CSEB Machine & AAC Block Plant since 2014." />

// Products
<title>Paver Block Making Machine | Fly Ash Brick Machine | Possible Machines</title>

// Product Detail
<title>{product.name} | Possible Machines Nashik</title>
```

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Possible Machines Private Limited",
  "description": "Manufacturer of Paver Block Making Machine, Fly Ash Brick Machine, CSEB Block Machine",
  "url": "https://www.possiblemachines.in",
  "telephone": "+91-8047549587",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gut No 115, Wadivarhe",
    "addressLocality": "Igatpuri",
    "addressRegion": "Maharashtra",
    "postalCode": "422403",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.6962,
    "longitude": 73.5612
  },
  "foundingDate": "2014",
  "numberOfEmployees": "26-50"
}
```

---

## 8. 3D Rendering Pipeline

```
Asset Pipeline:
  Blender (.blend)
      │ Export
      ▼
  GLTF/GLB
      │ Draco compress (gltf-transform)
      ▼
  Optimized .glb (~1-2 MB)
      │ Upload to CDN
      ▼
  useGLTF() hook in React Three Fiber
      │ Cache via drei's asset cache
      ▼
  <MachineModel /> component
      │
      ▼
  Three.js Scene Graph → WebGL Renderer → Canvas
```

### Lighting Setup

```
AmbientLight: intensity 0.4, color #ffffff
DirectionalLight 1: intensity 1.0, position [10, 10, 5], castShadow
DirectionalLight 2: intensity 0.5, position [-10, -5, -5]
PointLight: intensity 0.8, position [0, 5, 0], color #FFD700 (warm industrial)
Environment: HDR warehouse or studio preset
```

---

## 9. CI/CD Pipeline

```
Developer pushes to GitHub (main branch)
      │
      ▼
GitHub Actions triggered
      │
      ├── npm install
      ├── npm run lint
      ├── npm run build (Vite)
      └── Lighthouse CI (score checks)
      │
      ▼ (if all pass)
Vercel auto-deploys
      │
      ├── Edge Network CDN
      ├── SSL auto-provisioned
      └── Preview URL for QA
      │
      ▼
Production: https://possiblemachines.in
```

---

## 10. Monitoring & Analytics

| Tool | Purpose |
|---|---|
| Google Analytics 4 | Page views, sessions, conversions |
| Firebase Analytics | Form submission events |
| Vercel Analytics | Core Web Vitals per page |
| Sentry (optional) | JavaScript error tracking |

### GA4 Custom Events

```javascript
// Track enquiry form submission
gtag('event', 'enquiry_submit', {
  product_name: productName,
  source: 'product_detail_page'
});

// Track WhatsApp click
gtag('event', 'whatsapp_click', {
  location: 'floating_button'
});

// Track YouTube play
gtag('event', 'video_play', {
  video_title: videoTitle,
  section: 'homepage_videos'
});
```

---

*End of System Design.md*
