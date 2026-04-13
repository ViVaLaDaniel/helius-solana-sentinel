'use client';

import { useState } from 'react';
import { Search, Activity, Coins, ShieldCheck, Github, AlertTriangle, Loader2 } from 'lucide-react';
import { AssetGrid } from '@/components/AssetGrid';
import { TransactionList } from '@/components/TransactionList';
import { getAssetsByOwner, getParsedTransactions } from '@/lib/helius';

export default function Home() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      // Fetch both assets and transactions in parallel
      const [assetsData, txData] = await Promise.all([
        getAssetsByOwner(address),
        getParsedTransactions(address)
      ]);
      
      setAssets(assetsData.items || []);
      setTransactions(txData || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch data from Solana blockchain.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-7xl mx-auto min-h-screen">
      <header className="w-full flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold tracking-tighter">SOLANA SENTINEL</h1>
        </div>
        <div className="flex items-center gap-4">
          {!process.env.NEXT_PUBLIC_HELIUS_API_KEY && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold rounded-full uppercase tracking-tighter">
              <AlertTriangle className="w-3 h-3" />
              Missing API Key
            </div>
          )}
          <a 
            href="https://github.com/ViVaLaDaniel/helius-solana-sentinel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </header>

      <div className="w-full max-w-2xl bg-zinc-900/50 p-1 rounded-2xl border border-zinc-800 focus-within:border-orange-500 transition-colors shadow-2xl shadow-orange-500/5">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Enter Solana wallet address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-transparent p-5 pl-12 rounded-xl focus:outline-none text-lg placeholder:text-zinc-600"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-xl mr-2 font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {!searched ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24">
          <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/50 transition-all group">
            <Activity className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Real-time Activity</h3>
            <p className="text-zinc-500 leading-relaxed">
              Monitor live transactions and smart contract interactions with human-readable parsing powered by Helius.
            </p>
          </div>
          <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/50 transition-all group">
            <Coins className="w-10 h-10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Portfolio Insights</h3>
            <p className="text-zinc-500 leading-relaxed">
              Track NFTs, tokens, and compressed assets across your entire wallet using Helius DAS API.
            </p>
          </div>
          <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-900/50 transition-all group">
            <ShieldCheck className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Security Scanning</h3>
            <p className="text-zinc-500 leading-relaxed">
              Detect common wallet threats including address poisoning and malicious airdrops automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full mt-12 space-y-12">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400 text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Coins className="text-orange-500" /> Assets
                </h2>
                <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-zinc-400 font-mono">
                  {assets.length} ITEMS
                </span>
              </div>
              <AssetGrid assets={assets} />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Activity className="text-blue-500" /> Transactions
              </h2>
              <TransactionList transactions={transactions} />
            </div>
          </div>
        </div>
      )}
      
      <footer className="mt-auto pt-24 pb-8 text-zinc-600 text-[10px] text-center uppercase tracking-[0.2em] font-medium">
        Developed with Helius SDK • Build for Superteam Earn • © 2026
      </footer>
    </div>
  );
}
