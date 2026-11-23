# Next Pizza

A full-stack pizza delivery web app built with **Next.js App Router**: product catalog with filters, pizza builder, cart, checkout with online payment, and authentication.

**Live demo:** [next-pizza-theta-ten.vercel.app](https://next-pizza-theta-ten.vercel.app)

> **Test account:** `user@ttt.gmail.com` / `1111`
> You can also sign in with GitHub or Google.

<!-- Add screenshots to docs/screenshots and uncomment:
![Home page](docs/screenshots/home.png)
![Pizza builder](docs/screenshots/pizza-modal.png)
![Checkout on mobile](docs/screenshots/checkout-mobile.png)
-->

## Features

- **Catalog** — categories with a sticky navigation bar that highlights the current section on scroll, Instagram-style stories, product search.
- **Filters** — dough type, sizes, price range and ingredients, synced with the URL so a filtered page can be shared. Sidebar on desktop, modal on mobile.
- **Pizza builder** — choose size and dough type, add ingredients; the price updates instantly.
- **Cart** — optimistic updates: quantity changes are shown immediately, requests are debounced and rolled back on error.
- **Checkout** — form validation with React Hook Form + Zod, order total calculated by one shared function on the client and the server, online payment via WayForPay, order confirmation by email.
- **Authentication** — email/password, GitHub and Google (NextAuth).
- **Responsive** — from 360 px phones to wide desktops.
- **Accessibility** — semantic buttons and links, labels for icon-only controls, keyboard navigation, sufficient color contrast.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Components, Server Actions), React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| State & forms | Zustand, React Hook Form, Zod |
| Backend | Next.js Route Handlers, Prisma ORM, PostgreSQL (Neon) |
| Auth | NextAuth (Credentials, GitHub, Google) |
| Payments & email | WayForPay, Resend / SendGrid |
| Deploy | Vercel |

## Performance & quality

Lighthouse, mobile, home page — before and after the optimization pass:

| | Before | After |
|---|---|---|
| Performance | 51 | ~70 |
| Accessibility | 85 | **100** |
| Best Practices | 96 | **100** |
| SEO | 82 | **100** |

What was done:

- **Images** — `next/image` with accurate `sizes`, AVIF/WebP, lazy loading below the fold and high priority for the first visible images. Removed ~1 MB of images that the hidden search dropdown was downloading on every page load.
- **JavaScript** — server-only code (email, database) was leaking into the browser bundle through barrel files and pulled in Prettier, Svix and Zod; fixed with direct imports. The stories player and the auth modal are loaded on demand with `next/dynamic`.
- **Server Components** — stories and product cards are rendered on the server; only small client wrappers are hydrated. Total Blocking Time dropped almost by half.
- **No layout shift** — skeletons with fixed sizes reserve space while content loads (CLS = 0).

## Getting started

### Requirements

- Node.js 20+
- A PostgreSQL database (for example, a free [Neon](https://neon.tech) project)

### Setup

```bash
git clone https://github.com/AtremLysuk/next-pizza.git
cd next-pizza
npm install
```

Create a `.env` file in the project root (see `.env.example`). The minimum to run the app locally:

```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
NEXTAUTH_SECRET="any-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

Create the tables, fill them with demo data and start the dev server:

```bash
npm run prisma:push
npm run prisma:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

GitHub/Google sign-in, payments and emails need their own keys (see `.env.example`); the rest of the app works without them.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run prisma:push` | Sync the Prisma schema with the database |
| `npm run prisma:seed` | Fill the database with demo data |
| `npm run prisma:studio` | Open Prisma Studio |

## Project structure

```
app/
  (root)/            catalog, product page, profile, auth error page
  (root)/@modal/     product modal (intercepting route)
  (checkout)/        checkout page
  api/               route handlers: cart, products, stories, auth, WayForPay webhook
  actions.ts         server actions: create order, register, update profile
components/
  shared/            app components
  ui/                shadcn/ui primitives
hooks/               custom React hooks
lib/                 business logic: prices, order total, filters
prisma/              schema and seed
store/               Zustand stores (cart, active category)
```

## Author

**Artem Lysiuk** — Frontend Developer
[LinkedIn](https://www.linkedin.com/in/artem-lysiuk) · [GitHub](https://github.com/AtremLysuk)
