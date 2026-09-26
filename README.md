# E-shop Stylists

Next.js App Router storefront for professional hairdresser, barber and stylist products.

## Local setup

1. Use Node.js 22.20 or newer (`nvm use` when NVM is installed).
2. Copy `.env.example` to `.env.local` and provide the required credentials.
3. Run `npm install`.
4. Run `npm run db:generate`, `npm run db:migrate`, then `npm run db:seed` after configuring Neon.
5. Run `npm run dev`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Google OAuth, admin TOTP, Cloudinary and analytics are intentionally not simulated. They must be enabled only with real credentials and the corresponding server-side implementation.
