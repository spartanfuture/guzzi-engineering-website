'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// This would typically come from a database or API
const conversions = [
  { 
    id: 1, 
    name: 'Commercial Tour Bus', 
    slug: 'bus',
    description: 'We converted a commercial touring bus designed for tough Northern Territory conditions into a fully electric powerhouse, upgrading its performance and environmental impact.',
    specs: [
      { label: 'Range', value: '150 kms' },
      { label: 'Motor', value: '90kW AC motor' },
      { label: 'Battery', value: '40kWh Lithium-ion' },
    ],
  },
  { 
    id: 2, 
    name: 'GPX Sports Motorbike', 
    slug: 'gpx250',
    description: 'This GPX sports motorbike was transformed into an electric speed demon, maintaining its agility while embracing clean energy.',
    specs: [
      { label: 'Range', value: '100 kms' },
      { label: 'Motor', value: '30kW AC motor' },
      { label: 'Battery', value: '10kWh Lithium-ion' },
    ],
  },
  // Add more conversions as needed
];

export default function ConversionDetail({ params }: { params: { slug: string } }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const conversion = conversions.find(c => c.slug === params.slug);

  useEffect(() => {
    if (conversion) {
      import(`../../images/conversions/${conversion.slug}.jpg`)
        .then(image => setImageSrc(image.default.src))
        .catch(err => {
          console.error('Failed to load image:', err);
          setImageSrc('/images/placeholder.jpg'); // Fallback image
        });
    }
  }, [conversion]);

  if (!conversion) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center text-red-800">{conversion.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={conversion.name}
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            )}
          </div>
          <div>
            <p className="text-lg mb-8 text-gray-300">{conversion.description}</p>
            <h2 className="text-2xl font-semibold mb-6 text-red-600">Specifications</h2>
            <ul className="space-y-4">
              {conversion.specs.map((spec, index) => (
                <li key={index} className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-medium text-gray-300">{spec.label}:</span>
                  <span className="text-white">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
