# PRD — Product Requirements Document
## Possible Machines 3D Website

**Version:** 1.0  
**Date:** April 2026  
**Owner:** Project Lead  
**Status:** Draft

---

## 1. Executive Summary

Possible Machines Private Limited (Igatpuri, Nashik) currently uses an IndiaMART-hosted listing page as their primary web presence. This PRD defines requirements for a **custom 3D website** that will establish a premium brand identity, generate qualified leads, and showcase the product range through immersive 3D visualizations and embedded product videos.

---

## 2. Problem Statement

| Problem | Impact |
|---|---|
| No standalone website | Company appears less credible to large buyers |
| IndiaMART listing is generic | No brand differentiation from competitors |
| No visual product demo inline | Buyers must contact for basic info |
| No SEO ownership | Google traffic goes to IndiaMART, not the company |
| No direct enquiry tracking | Leads lost or untracked |

---

## 3. Goals & Success Metrics

### Business Goals
- Generate 50+ qualified leads per month within 3 months of launch
- Establish Possible Machines as the premium brick/block machine brand in Maharashtra
- Reduce dependency on IndiaMART for discovery

### User Goals
- Buyers can quickly browse all products and understand specifications
- Buyers can request a quote in under 2 minutes
- Buyers feel confident in company credibility (videos, location, stats)

### Success Metrics (KPIs)

| KPI | Target (3 months post-launch) |
|---|---|
| Monthly website visitors | 2,000+ |
| Enquiry form submissions | 50+ / month |
| WhatsApp CTA clicks | 100+ / month |
| Avg. session duration | > 2 minutes |
| Bounce rate | < 55% |
| Google ranking (target keywords) | Top 10 |

---

## 4. User Personas

### Persona 1: Small Business Owner (Primary)
- **Name:** Ramesh, 38, Nashik
- **Goal:** Buy a fly ash brick machine for small-scale production
- **Device:** Android mobile
- **Behavior:** Searches Google, compares 2–3 vendors, contacts via WhatsApp
- **Pain:** Hard to evaluate quality without visiting factory

### Persona 2: Government Contractor (Secondary)
- **Name:** Suresh, 45, Pune
- **Goal:** M50 Grade Paver Block machine for government road project
- **Device:** Desktop PC
- **Behavior:** Needs specs, certifications, formal quote
- **Pain:** Needs to justify purchase to committee — needs credibility signals

### Persona 3: Export Buyer (Tertiary)
- **Name:** Ahmed, 52, Dubai
- **Goal:** CSEB / AAC machine for overseas project
- **Device:** Desktop / tablet
- **Behavior:** Research-heavy, needs detailed specs and videos

---

## 5. Feature Requirements

### 5.1 Must-Have (P0)

#### F-001: 3D Hero Section
- **Description:** Fullscreen animated 3D scene with industrial machinery
- **Acceptance Criteria:**
  - Renders in all modern browsers (Chrome, Firefox, Edge, Safari)
  - Load time < 3 seconds on 10 Mbps connection
  - Shows company name + tagline + 2 CTA buttons
  - Graceful fallback (CSS animation) on mobile if WebGL unavailable
  - Auto-animates without user interaction

#### F-002: Product Catalog
- **Description:** Browse all 25+ products by category
- **Acceptance Criteria:**
  - Category tabs for filtering
  - Each product card shows name, thumbnail, "Get Quote" CTA
  - Clicking opens product detail page
  - All products from current IndiaMART listing are included

#### F-003: Product Detail Page
- **Description:** Dedicated page per product
- **Acceptance Criteria:**
  - Product name, description, specifications table
  - Image gallery (min. 2 images per product)
  - Embedded YouTube video if available
  - "Get Quote" form pre-filled with product name
  - WhatsApp link with product pre-filled in message

#### F-004: Enquiry / Quote Form
- **Description:** Lead capture form
- **Acceptance Criteria:**
  - Fields: Name, Phone, Product Interest, Message
  - Phone validation for Indian numbers
  - reCAPTCHA spam protection
  - Submission triggers email to admin (sachin@possiblemachines.in)
  - Submission stored in database
  - Success/error feedback shown to user

#### F-005: YouTube Product Videos Section
- **Description:** Display product demo videos
- **Acceptance Criteria:**
  - Minimum 4 YouTube videos embedded on homepage
  - Videos must not auto-play
  - Privacy-enhanced YouTube embed mode used
  - Lazy-loaded (only loads iframe when visible)

#### F-006: Mobile Responsive
- **Description:** Full mobile usability
- **Acceptance Criteria:**
  - All pages usable on screens 320px–1920px wide
  - 3D hero simplified on mobile (reduced polygon count)
  - CTA buttons minimum 44×44px touch target
  - Forms usable with mobile keyboard

---

### 5.2 Should-Have (P1)

#### F-007: WhatsApp CTA
- Floating WhatsApp button visible on all pages
- Pre-filled message: "Hi, I'm interested in your machines. Please share details."

#### F-008: About Us Page
- Company history, managing director info, factory location
- Google Maps embed of Gut No 115, Igatpuri

#### F-009: SEO Optimization
- Page title + meta description per page
- Structured data (LocalBusiness schema)
- XML sitemap
- OG tags for social sharing

#### F-010: Company Stats Section
- Animated counters: "Est. 2014 | 25+ Products | 500+ Clients | Pan-India"

---

### 5.3 Nice-to-Have (P2)

#### F-011: 3D Product Viewer
- Interactive 360° view of selected machine models

#### F-012: Testimonials Section
- Customer quotes and location

#### F-013: Hindi Language Toggle
- Basic Hindi translation for key pages

#### F-014: Live WhatsApp Chat Widget
- Real-time chat fallback if form not preferred

---

## 6. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Performance | Lighthouse score ≥ 75 on desktop, ≥ 70 on mobile |
| Accessibility | WCAG 2.1 AA compliance on non-3D elements |
| SEO | All pages indexable by Google |
| Security | HTTPS enforced, form spam protection |
| Uptime | 99.9% (Vercel SLA) |
| Browser Support | Chrome 90+, Firefox 88+, Edge 90+, Safari 14+ |
| 3D Fallback | Non-WebGL devices get CSS fallback |

---

## 7. Out of Scope

- E-commerce / online payments
- Customer portal / login
- Product stock management
- CRM integration
- Multilingual beyond Hindi toggle
- AR product preview

---

## 8. Dependencies

| Dependency | Owner | Risk |
|---|---|---|
| 3D machine models (GLB files) | Design team / Sketchfab | Medium — may need modeling |
| Product photos (high quality) | Client (Possible Machines) | High — must get from client |
| YouTube video IDs | Client | Medium |
| Firebase project setup | Developer | Low |
| Domain & DNS access | Client | Low |

---

## 9. Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Client doesn't provide product photos | High | High | Use placeholder + scrape IndiaMART images for MVP |
| 3D models too heavy for mobile | Medium | Medium | Use procedural geometry, fallback CSS |
| Low Google ranking initially | High | Medium | Focus on local SEO, Google Business Profile |
| Form spam | Medium | Low | reCAPTCHA v3 |

---

## 10. Approval

| Role | Name | Sign-off |
|---|---|---|
| Client | Sachin Shitole, MD | Pending |
| Project Lead | — | Pending |
| Tech Lead | — | Pending |

---

*End of PRD.md*
