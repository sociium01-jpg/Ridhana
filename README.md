# Ridhana Website

Premium, immersive 3D marketing website for **Ridhana** (ridhana.com) — an artisanal slow stone-milled flour brand from Vikhroli, Mumbai.

## Tech Stack
- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** with custom design token system
- **React Three Fiber + drei** for 3D chakki hero scene
- **Framer Motion** for scroll animations and page transitions
- **Lenis** for smooth scroll
- **GSAP** (optional, integrated via `useGSAP`)

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

---

## Vercel Deployment

1. Push this repository to GitHub / GitLab
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Framework Preset: **Next.js** (auto-detected)
4. No environment variables required for the base build
5. Click **Deploy**

The `vercel.json` handles redirects and security headers automatically.

---

## Asset Swap Instructions

### Swapping the 3D Chakki Model
The hero uses a **procedural** Three.js chakki (two cylinders with noise-based stone texture).  
To replace with a scanned model:

1. Place your `.glb` file at `public/models/chakki.glb`
2. Open `components/3d/ChakkiScene.tsx`
3. Find the comment `// TODO: swap with scanned model`
4. Replace `<ChakkiStones />` with `<ChakkiModel />` using `useGLTF`:

```tsx
import { useGLTF } from "@react-three/drei";

function ChakkiModel() {
  const { scene } = useGLTF("/models/chakki.glb");
  return <primitive object={scene} />;
}
```

### Replacing Product Photography
Product images are in `public/images/` with these filenames:
```
product-mp-sharbati.jpg
product-mh-khapli.jpg
product-bajra.jpg
product-jowar.jpg
product-makki.jpg
```
Replace any of these with higher-resolution photography (same filename). Recommended: **1200×900px** minimum, JPEG at 85% quality.

### Replacing Hero Background Photography
```
public/images/hero-bg.png     — Hero section background / blog teaser
public/images/hero-bg-2.png   — Brand section
public/images/hero-bg-3.png   — Process section
public/images/hero-bg-4.jpg   — Mill visit section
public/images/founder.png     — Founder photo (Rohit)
```

### Blog: Adding Full Article Content
Open `app/post/why-stone-ground-whole-wheat-flour-is-better/page.tsx`.  
Find the comment `// TODO: Paste the full article body here.`  
Add your paragraphs as `<p>` elements inside the `<div className="prose ...">` block.

---

## Performance Budget

| Metric        | Target      | Notes                                        |
|--------------|-------------|----------------------------------------------|
| LCP          | < 2.5s      | Hero image + 3D canvas lazy-loaded           |
| FCP          | < 1.2s      | Static HTML + CSS above fold                 |
| CLS          | < 0.1       | Image dimensions declared                    |
| TBT          | < 200ms     | Three.js loaded only in browser, code-split  |
| Lighthouse Perf | ≥ 85 mobile | Use `PerformanceGuard` fallback if below   |
| Lighthouse A11y | ≥ 95    | All interactive elements have labels         |
| Lighthouse SEO  | ≥ 95    | LocalBusiness + Product JSON-LD, meta tags  |

**3D Performance Tip:** On mobile, `PerformanceGuard` automatically falls back to the static image hero if:
- `hardwareConcurrency < 4` AND device is mobile, OR
- WebGL is unavailable, OR
- `prefers-reduced-motion` is enabled

---

## Color Reference

| Token       | Hex       | Usage                    |
|------------|-----------|--------------------------|
| `bone`     | `#F7F3EC` | Site background          |
| `espresso` | `#2B2118` | Headlines, dark sections |
| `gold`     | `#C9A24B` | Accent, CTAs, dividers   |
| `terracotta` | `#C4714A` | Muted accents           |
| `charcoal` | `#3D3530` | Body text                |
| `wheat`    | `#E8D5A3` | Light accents            |
| `stone`    | `#8B7355` | Mid-tone, subtext        |
| `cream`    | `#F0EAE0` | Section alt backgrounds  |

---

## Directory Structure

```
e:/Ridhana/
├── app/
│   ├── layout.tsx           # Root layout (fonts, JSON-LD, global components)
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Design tokens, base styles
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── who-we-are/page.tsx
│   ├── products/page.tsx
│   ├── products-1/page.tsx  # 301 redirect
│   ├── contact/page.tsx
│   ├── blog/page.tsx
│   └── post/
│       └── why-stone-ground-whole-wheat-flour-is-better/page.tsx
├── components/
│   ├── 3d/
│   │   ├── ChakkiScene.tsx       # Hero R3F 3D stone mill
│   │   ├── GrainParticles.tsx    # Ambient particle field
│   │   ├── GrainJourneyScene.tsx # Scroll-pinned 4-chapter journey
│   │   ├── ProductCard3D.tsx     # Tilt-on-hover product cards
│   │   └── PerformanceGuard.tsx  # GPU tier detection
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── PillarSection.tsx
│   │   ├── BrandSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── ProductsTeaser.tsx
│   │   ├── MillVisit.tsx
│   │   └── BlogTeaser.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx
│   └── ui/
│       ├── SmoothScroll.tsx
│       ├── GrainOverlay.tsx
│       ├── CustomCursor.tsx
│       ├── Preloader.tsx
│       ├── MagneticButton.tsx
│       └── MaskedTextReveal.tsx
├── public/
│   └── images/              # All self-hosted images
├── tailwind.config.ts       # Design token system
├── next.config.ts           # Next.js + MDX + redirects
└── vercel.json              # Vercel deployment config
```
