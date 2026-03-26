# Interactive Frontend Portfolio

A high-performance, motion-engineered developer portfolio architected with **Next.js 15**, **TypeScript**, and **Framer Motion**. This project serves as a technical showcase for bridging high-fidelity interaction design with scalable, resilient frontend infrastructure.

## 🚀 Architectural Overview

This portfolio is designed to be a "Living Document." It implements an automated synchronization engine that interfaces with the GitHub API to dynamically inject new projects into the UI based on repository metadata and custom schemas.

### Core Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Runtime**: [React 19](https://react.dev/)
- **Logic**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Motion Engine**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Assets**: [Three.js](https://threejs.org/) / [Lucide](https://lucide.dev/)

## 🛠️ Key Engine Features

### 1. Automated Project Synchronization
The application features a custom synchronization layer (`src/lib/github.ts`) that:
- Fetches real-time repository data from the GitHub REST API.
- Filters for production-ready projects via specific topics (`portfolio`) or deployment links.
- Implements an **Incremental Static Regeneration (ISR)** model to revalidate project data every hour.
- Supports a **Custom Case Study Schema** via `case_study.json` in repository roots.

### 2. Motion Engineering
- **Physics-based Interactions**: Tilt-cards and light-followers utilize mouse-velocity-aware transformations.
- **Glassmorphic UI**: High-density blur filters and translucent layers to maintain context across deep layouts.
- **Scrollytelling**: High-RPS performance during deep-scroll interactions through main-thread isolation of expensive 3D logic.

### 3. Case Study Convention
To automate high-fidelity case studies for new repositories, include a `case_study.json` in your repository root:
```json
{
  "title": "Project Title",
  "category": "Architecture / Stack / Vibe",
  "image": "https://cdn.link/banner.png",
  "description": "Technical narrative of the project.",
  "challenge": "Specific technical hurdle and its resolution.",
  "features": ["Feature A", "Feature B"],
  "tech": ["Next.js", "Redis", "WebSockets"]
}
```

## 🔒 Security & Code Health

- **Zero-Secret Architecture**: Publicly accessible data is fetched without exposing client-side tokens.
- **Strict Typing**: All dynamic data is validated against the `Project` interface to prevent runtime failures and hydration mismatches.
- **Asset Optimization**: Implements Next.js `RemotePatterns` for secure cross-origin image delivery and lazy-loading of heavy components.

## 📦 Local Deployment

1. Clone the repository
2. Install dependencies: `npm install`
3. Launch development server: `npm run dev`
4. Deploy to Vercel/Netlify for automated CI/CD.

---
**Architected & Engineered by withhumanrevenge-cyber.**
