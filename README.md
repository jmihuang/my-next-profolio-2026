# Jamie Huang Portfolio

Next.js portfolio deployed to Cloudflare Workers with OpenNext. Production content is stored in the `jamie-portfolio-products` Cloudflare D1 database.

## Local development

Use Node.js 22 before running project commands:

```bash
nvm use 22
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production release

Run this command to build for Cloudflare, apply pending production D1 migrations, then deploy the Worker:

```bash
npm run cf:release
```

The order is deliberate:

```text
Cloudflare build succeeds
        ↓
Pending production D1 migrations are applied
        ↓
Worker is deployed
        ↓
Verify the live site
```

The command prompts before changing the production database. Review the listed migration names before confirming.

### When a migration is required

- Required: adding or changing tables, columns, indexes, or initial database content.
- Not required: changing UI, styles, static images, or normal content updates made through the admin interface.

Create a new sequential migration file for every database change, for example `migrations/0008_add_xxx.sql`. Never edit a migration that has already succeeded in production.

### Useful commands

```bash
# See pending production migrations without applying them
npx wrangler d1 migrations list jamie-portfolio-products --remote

# Build only
npm run cf:build

# Apply only pending production migrations
npm run cf:migrate:prod

# Deploy an already-built Worker
npm run cf:deploy:prod
```
