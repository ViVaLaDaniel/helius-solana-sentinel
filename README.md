# 🛡️ Solana Sentinel (Helius dApp)

[![Live Demo](https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge)](https://helius-solana-sentinel-isk7vag5e-vivaladaniels-projects.vercel.app)
[![Bounty](https://img.shields.io/badge/Superteam-Bounty-blue?style=for-the-badge)](https://superteam.fun/earn/listing/build-a-solana-dapp-with-helius-sdk)
[![Helius](https://img.shields.io/badge/Powered%20By-Helius-orange?style=for-the-badge)](https://helius.dev)

**Solana Sentinel** is a professional-grade, real-time wallet analytics engine. It leverages the **Helius SDK** to transform raw blockchain data into actionable insights for Solana power users and developers.

---

## 📽️ Professional Demo
Watch the full application walkthrough:  
**[Download/View Demo Video](./public/demo/demo.webm)**

---

## ✨ Key Features

### 1. Human-Readable Transactions
Unlike traditional explorers, Solana Sentinel uses Helius's **Enhanced Transaction API** to parse complex smart contract interactions.
- **Swaps:** Identified via Jupiter and other DEXs.
- **NFTs:** Real-time sale and mint detection.
- **Transfers:** Clean SOL/SPL movement tracking.

### 2. Universal Asset Discovery (DAS API)
Using the **Digital Asset Standard (DAS)**, the app fetches everything associated with a wallet in a single call:
- Standard Metaplex NFTs.
- **Compressed NFTs (cNFTs):** High-performance detection.
- SPL Tokens and Portfolio balances.

### 3. Security-First UX
- **Threat Detection:** Built-in logic to identify potential "dust" or malicious transactions.
- **Zero-Backend:** Purely client-side data fetching for maximum privacy and speed.

---

## 🛠️ Technical Architecture

### Core Stack
- **Framework:** Next.js 14 (App Router)
- **State Management:** React Hooks + Concurrent Fetching
- **Styling:** Tailwind CSS (Modern Glassmorphism Design)
- **Animations:** Framer Motion
- **SDK:** Helius Node.js SDK (v1.3.1)

### Technical Highlights
- **Lazy Helius Initialization:** Optimized for Vercel edge deployments.
- **Parallel Fetching:** `Promise.all` architecture reduces TTI (Time to Interactive).
- **Type Safety:** 100% TypeScript with strict mode and Biome linting.

---

## 📖 Detailed Documentation
- [**Architecture & Design**](./docs/ARCHITECTURE.md) - Deep dive into technical choices.
- [**Development Workflow**](./docs/WORKFLOW.md) - How to build, lint, and deploy.
- [**Security & Performance**](./docs/SECURITY.md) - Auditing and speed considerations.

---

## 👨‍💻 Author
**Daniel Zamyatin**  
Full-stack Engineer | OSS Contributor (Astro) | AI Workflow Specialist
- **Superteam:** [vivaladaniel](https://superteam.fun/earn/t/vivaladaniel)
- **GitHub:** [@ViVaLaDaniel](https://github.com/ViVaLaDaniel)

---

## ⚖️ License
MIT License - Copyright (c) 2026 Daniel Zamyatin
