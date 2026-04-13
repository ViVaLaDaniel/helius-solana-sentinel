import { Helius } from 'helius-sdk';

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

if (!HELIUS_API_KEY) {
  console.warn('Helius API Key is missing. Please set NEXT_PUBLIC_HELIUS_API_KEY in .env.local');
}

export const helius = new Helius(HELIUS_API_KEY);

/**
 * Fetch assets for a given address using Helius DAS API
 */
export async function getAssetsByOwner(address: string) {
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
  try {
    const transactions = await helius.rpc.getParsedTransactions({
      address,
    });
    return transactions;
  } catch (error) {
    console.error('Error fetching parsed transactions:', error);
    throw error;
  }
}
