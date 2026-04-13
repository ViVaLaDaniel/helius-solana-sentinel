'use client';

import { Activity, ArrowRightLeft, CreditCard, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Transaction {
  signature: string;
  type: string;
  timestamp: number;
  description: string;
  fee: number;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-zinc-500 text-center py-12">
        No recent transactions found.
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'SWAP': return <ArrowRightLeft className="w-5 h-5 text-blue-500" />;
      case 'NFT_SALE': 
      case 'NFT_MINT': return <ShoppingCart className="w-5 h-5 text-purple-500" />;
      case 'TRANSFER': return <CreditCard className="w-5 h-5 text-green-500" />;
      default: return <Activity className="w-5 h-5 text-zinc-500" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {transactions.map((tx, index) => (
        <motion.div
          key={tx.signature}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-start gap-4 hover:border-zinc-700 transition-colors"
        >
          <div className="p-2 bg-black/40 rounded-lg shrink-0">
            {getIcon(tx.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between gap-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest leading-none">
                {tx.type.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-zinc-600 shrink-0">
                {formatDate(tx.timestamp)}
              </span>
            </div>
            <p className="text-sm mt-1 leading-relaxed text-zinc-200 truncate">
              {tx.description || 'Smart Contract Interaction'}
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/50">
              <span className="text-[10px] text-zinc-600 font-mono">
                SIG: {tx.signature.slice(0, 8)}...
              </span>
              <span className="text-[10px] text-zinc-600 font-mono">
                FEE: {(tx.fee / 1000000000).toFixed(6)} SOL
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
