import React from 'react';
import Link from 'next/link';
import WalletButton from './WalletButton';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link 
          href="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          SourceTrust
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/marketplace"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Marketplace
          </Link>
          <WalletButton />
        </div>
      </div>
    </nav>
  );
} 