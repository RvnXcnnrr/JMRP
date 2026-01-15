# Portfolio Website (BSIT • IT • IoT • Full-Stack)

Modern, professional, responsive portfolio built with React + TypeScript + Vite and Tailwind CSS.

## Design documentation

This project is intentionally designed to look professional and “production-ready” for internships and entry-level roles, with a focus on readability, accessibility, and performance.

### Design goals

- **Modern + minimal**: clean typography, strong spacing, no clutter.
- **Tech-inspired palette**: soft blues/indigo + slate/charcoal neutrals.
- **Glassmorphism**: translucent surfaces with subtle borders and blur.
- **Micro-interactions**: hover lift, soft glow accents, smooth transitions.
- **Mobile-first**: responsive grid + scalable typography.

### Visual system

- **Typography**: Inter (loaded in `index.html`).
- **Surfaces**:
	- Light: `bg-slate-50` with glass cards (`bg-white/70`, `backdrop-blur`).
	- Dark: `bg-slate-950` with glass cards (`bg-slate-950/35` or `bg-white/5`).
- **Borders**: subtle (`border-slate-200/70` in light, `border-white/10` in dark).
- **Accents**: gradients that blend **sky** + **indigo**.

### Layout & responsiveness

- **Max width**: content is centered with `max-w-6xl`.
- **Sections** use consistent vertical rhythm (`py-14 sm:py-18`).
- **Hero** uses a 12-column grid on desktop (`lg:grid-cols-12`) and stacks on mobile.

### Interaction design

- **Theme toggle**: light/dark with saved preference (no “flash” on load).
- **Smooth scrolling**: enabled globally.
- **Scroll reveal**: sections animate into view using IntersectionObserver.
- **Hover states**:
	- Cards: subtle lift + glow.
	- Skill chips: category-based color accents and hover highlights.

### Accessibility

- **Skip link**: keyboard users can jump to main content.
- **Focus rings**: `focus-visible:ring` used on interactive elements.
- **Reduced motion**: animations are disabled if `prefers-reduced-motion: reduce`.
- **Contrast**: uses Tailwind slate palette and avoids overly low-opacity text.

### Performance

- Minimal dependencies (React + Tailwind + Vite).
- Images are `loading="lazy"` by default.
- Hero avatar is marked `priority` (eager) to load immediately.

## Features

- Light/Dark mode toggle with saved preference
- Smooth scrolling navigation
- Scroll-reveal section animations (with reduced-motion support)
- Responsive layout (mobile-first)
- Projects with demo/GitHub links
- Accessible contact form (opens a prefilled email)

## Run locally

```bash
npm run dev
```

If you need to install dependencies:

```bash
npm install
```

## Build for production

```bash
npm run build
npm run preview
```

## Customize content

- Profile details and social links: `src/data/profile.ts`
- Skills, projects, and experience: `src/data/portfolio.ts`
- Approved testimonials (displayed on site): `src/data/testimonials.ts`

### Testimonials (approve/decline)

This portfolio supports client testimonial submissions + a simple approval flow.

- Submissions are stored via Netlify Functions + Netlify Blobs.
- Only approved testimonials are displayed.

Setup:

1. Deploy to Netlify (Functions + Blobs require a Netlify deploy).
2. In Netlify → Site configuration → Environment variables, set:
	- `TESTIMONIALS_ADMIN_TOKEN` (any long random string)
3. On your live site, open the Testimonials section and click **Admin: Approve/Decline**.
	- Enter your token and you’ll see pending items.
	- Click **Approve** to publish, **Decline** to discard.

## Site structure (sections)

- **Hero**: name, role, focus, CTA buttons, profile image.
- **About**: short professional summary (kept intentionally concise).
- **Skills**: grouped chips (IoT / Backend / SysAdmin / Tools / Minimal Frontend).
- **Projects**: cards with stack tags and links.
- **Testimonials**: approved testimonials + a Netlify-backed submission form (requires approval).
- **Certifications**: cards that support image-based certificates.
- **Experience**: technician experience + current “seeking OJT/internship” status.
- **Contact**: form opens a prefilled email (`mailto:`) + social links.
- **Footer**: quick links + copyright.

## File map (where things live)

- **Main page layout**: `src/App.tsx`
- **Theme**:
	- Theme state + persistence: `src/hooks/useTheme.ts`
	- Early theme set (prevents flash): `index.html`
- **Scroll animations**: `src/hooks/useScrollReveal.ts`
- **UI components**:
	- Navbar: `src/components/Navbar.tsx`
	- Card: `src/components/Card.tsx`
	- Chip: `src/components/Chip.tsx`
	- Avatar: `src/components/Avatar.tsx`
	- Certifications: `src/components/CertificationCard.tsx`

## Static files (images / resume)

- Profile photo: `public/assets/profile.png`
- Resume PDF: `public/assets/Javy-Rodillon-Resume.pdf` (or update `resumeSrc`)
- Certificates folder: `public/assets/certificates/` (update filenames/paths in `src/data/portfolio.ts`)

### Certificate images

Recommended: use PNG/JPG files for certificates so they open instantly in a new tab.

Example paths (configured in `src/data/portfolio.ts`):

- `public/assets/certificates/ncii-css.jpg`
- `public/assets/certificates/cyberops-associate.png`
- `public/assets/certificates/ccna-ensa.png`

## Notes

- Replace placeholder demo/GitHub links with your real URLs.
- The contact form uses `mailto:` by default. If you want a hosted form endpoint (Formspree/Netlify), say so and I can wire it in.
