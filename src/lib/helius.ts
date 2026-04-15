import { Helius } from 'helius-sdk';
import { PublicKey } from '@solana/web3.js';

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

// Lazy initialization or dummy for build time
let heliusInstance: Helius | null = null;

function getHelius() {
  if (heliusInstance) return heliusInstance;

  if (!HELIUS_API_KEY) {
    if (typeof window === 'undefined') {
      // Return a proxy or handled null for build-time safety
      console.warn('Helius API Key is missing. Using dummy instance for build.');
      return new Helius('00000000-0000-0000-0000-000000000000');
    }
    throw new Error(
      'Helius API Key is missing. Please set NEXT_PUBLIC_HELIUS_API_KEY in .env.local'
    );
  }

  heliusInstance = new Helius(HELIUS_API_KEY);
  return heliusInstance;
}

/**
 * Fetch assets for a given address using Helius DAS API
 */
export async function getAssetsByOwner(address: string) {
  const helius = getHelius();
  try {
    const assets = await helius.rpc.getAssetsByOwner({
      ownerAddress: address,
      page: 1,
      limit: 100,
    });
    return assets;
  } catch (error) {
    console.error('Error fetching assets from Helius:', error);
    throw error;
  }
}

/**
 * Fetch human-readable transaction history
 */
export async function getParsedTransactions(address: string) {
  const helius = getHelius();
  try {
    const pubKey = new PublicKey(address);
    const signatures = await helius.connection.getSignaturesForAddress(pubKey, { limit: 20 });

    if (signatures.length === 0) return [];

    const txSignatures = signatures.map((s) => s.signature);
    const parsedTransactions = await helius.parseTransactions({
      transactions: txSignatures,
    });

    return parsedTransactions;
  } catch (error) {
    console.error('Error fetching parsed transactions:', error);
    throw error;
  }
}
