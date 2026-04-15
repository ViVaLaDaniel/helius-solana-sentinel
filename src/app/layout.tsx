import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Helius Solana Sentinel',
  description: 'Real-time Solana wallet & NFT collection monitor powered by Helius SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="min-h-screen bg-black text-white">{children}</main>
      </body>
    </html>
  );
}
