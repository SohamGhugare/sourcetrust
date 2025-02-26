import React from 'react';

const stats = [
  { number: '100+', label: 'Datasets Protected' },
  { number: '50K+', label: 'Data Points Secured' },
  { number: '99%', label: 'Verification Rate' },
];

export default function Stats() {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
} 