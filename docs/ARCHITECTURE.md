# Technical Architecture

## 🧬 Design Philosophy
Solana Sentinel is designed to be a lightweight, high-performance interface for Helius data. It follows the **Native First** principle, minimizing server-side overhead and maximizing data retrieval speed via the client.

## 🏗️ System Components

### 1. Data Layer (`/src/lib/helius.ts`)
The core logic resides in a centralized Helius provider.
- **Lazy Initialization:** We use a singleton pattern to initialize the Helius client only when a search is performed. This prevents build-time failures on Vercel and keeps the initial bundle small.
- **DAS API Integration:** Instead of multiple RPC calls for balance and NFTs, we use `getAssetsByOwner` which returns a unified asset list (Tokens + NFTs + cNFTs).
- **Transaction Flow:** 
  1. `getSignaturesForAddress` retrieves recent activity.
  2. `parseTransactions` converts raw data into Enriched Transactions.

### 2. UI Components (`/src/components`)
- **AssetGrid:** A responsive CSS Grid that uses Framer Motion for staggered entry animations. It handles missing metadata gracefully with fallback placeholders.
- **TransactionList:** A vertical timeline that maps Helius `TransactionType` enums to semantic UI elements (icons, colors, descriptions).

## 📊 Data Flow
1. **Input:** User enters a Solana address or `.sol` domain.
2. **Fetch:** App initiates parallel `Promise.all` requests to Helius.
3. **Parse:** Data is normalized into local TypeScript interfaces.
4. **Render:** Components react to state changes, triggering smooth animations.

## 🚀 Performance Optimizations
- **Concurrent Fetching:** All blockchain data is fetched in parallel.
- **Asset Optimization:** Next.js Image component (planned) and efficient grid rendering.
- **Zero Heavy Dependencies:** Only the essential SDKs and UI libraries are used.
