import React from 'react';

export default function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
        Secure Your AI Datasets with
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"> Blockchain Protection</span>
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
        Register and protect your valuable datasets as intellectual property using
        Story Protocol. Ensure data authenticity and ownership in the era of AI.
      </p>
      
      <div className="flex gap-4 justify-center">
        <button className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2">
          Get Started
        </button>
        <button className="px-8 py-4 rounded-lg border-2 border-gray-200 hover:border-blue-100 hover:bg-blue-50 text-gray-700 font-semibold text-lg transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
} 