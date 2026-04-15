'use client';

import { motion } from 'framer-motion';

interface Asset {
  id: string;
  content?: {
    links?: {
      image?: string;
    };
    metadata?: {
      name?: string;
      symbol?: string;
    };
  };
  grouping?: Array<{
    group_key: string;
    group_value: string;
  }>;
}

interface AssetGridProps {
  assets: Asset[];
}

export function AssetGrid({ assets }: AssetGridProps) {
  if (assets.length === 0) {
    return <div className="text-zinc-500 text-center py-12">No assets found for this address.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {assets.map((asset, index) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group cursor-pointer hover:border-orange-500/50 transition-colors"
        >
          <div className="aspect-square bg-zinc-800 relative">
            {asset.content?.links?.image ? (
              <img
                src={asset.content.links.image}
                alt={asset.content.metadata?.name || 'Asset'}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs p-4 text-center">
                NO PREVIEW
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="text-sm font-bold truncate">
              {asset.content?.metadata?.name || 'Unnamed Asset'}
            </h4>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              {asset.content?.metadata?.symbol || 'TOKEN'}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
