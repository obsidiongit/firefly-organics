# Firefly site

One-page marketing template for **Firefly**, scaffolded from [`helios-site`](../helios-site): Next.js 16, React 19, Tailwind 4, Framer Motion, and the same design tokens (`globals.css`).

## Scripts

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Age verification uses the key `firefly-age-verified` in `localStorage` (separate from Helios).

```bash
npm run build
npm start
```

## What’s included

- **Navbar** — anchor links (`#story`, `#craft`, `#contact`) and a text wordmark; mobile overlay matches the Helios pattern.
- **Sections** — `FireflyHero`, `FireflyStory`, `FireflyCraft`, `FireflyContact` under `components/sections/`.
- **Age gate** — Firefly-branded copy; no splash loader or monogram overlay (add from Helios if you want parity).

## Next steps

Replace placeholder copy, `hello@firefly.example`, and social URLs. Add real routes under `app/` and switch nav `href`s from hashes to paths. Optionally trim unused `components/ui` files until you need them.
