import React from 'react';
import WalletButton from './WalletButton';

export default function Navigation() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">SourceTrust</span>
        </div>
        <WalletButton />
      </div>
    </nav>
  );
} 