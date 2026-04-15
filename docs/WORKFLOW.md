# Development & Workflow

## 🛠️ Prerequisites
- Node.js 20+
- NPM or PNPM
- Helius API Key (get one at [dev.helius.xyz](https://dev.helius.xyz))

## ⚙️ Project Standards
We maintain strict engineering standards to ensure code quality and maintainability.

### 🧹 Linting & Formatting
We use **Biome** instead of Prettier/ESLint for 10x faster performance and unified rules.
```bash
npm run lint    # Check for issues
npm run format  # Auto-fix formatting
```

### 🌳 Git Protocol
- **Branching:** Use descriptive prefixes (`feat/`, `fix/`, `docs/`).
- **Commits:** Follow Conventional Commits specification.

## 🚢 Deployment Flow
1. **Local Development:** `npm run dev`
2. **Build Test:** `npm run build`
3. **Staging:** Automatic preview deployments via Vercel GitHub integration.
4. **Production:** Manual or CI-triggered production deploy via Vercel CLI.

## 📹 Recording Demo
A custom Playwright script is available to generate professional demo recordings:
```bash
node record.js
```
This script automates browser navigation, input, and scrolling to capture a clean `.webm` video stored in `/public/demo/`.
