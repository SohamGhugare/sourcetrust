import React from 'react';

const features = [
  {
    title: 'Secure Registration',
    description: 'Register your datasets with blockchain-backed verification and protection.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'IP Protection',
    description: 'Protect your intellectual property with Story Protocol integration.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    bgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  },
  {
    title: 'Instant Verification',
    description: 'Quick and easy verification process for your dataset ownership.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }
];

export default function Features() {
  return (
    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
      {features.map((feature, index) => (
        <div key={index} className="text-center">
          <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
            <svg className={`w-8 h-8 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {feature.icon}
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
} 