'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const conversions = [
  { 
    id: 1, 
    name: 'Commercial Tour Bus', 
    slug: 'bus',
    description: 'A commercial touring bus converted to electric, designed for tough Northern Territory conditions.',
  },
  { 
    id: 2, 
    name: 'GPX Sports Motorbike', 
    slug: 'gpx250',
    description: 'A GPX sports motorbike transformed into an electric speed demon.',
  },
  // Add more conversions as needed
];

function ConversionCard({ conversion }: { conversion: typeof conversions[number] }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    import(`../images/conversions/${conversion.slug}.jpg`)
      .then(image => setImageSrc(image.default.src))
      .catch(err => {
        console.error('Failed to load image:', err);
        setImageSrc('/images/placeholder.jpg'); // Fallback image
      });
  }, [conversion.slug]);

  return (
    <Link href={`/vehicle-conversions/${conversion.slug}`} className="block group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
        <div className="relative h-64">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={conversion.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-lg transition-opacity duration-300 group-hover:opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
        </div>
        <div className="p-6 relative z-10">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">{conversion.name}</h2>
          <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{conversion.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function VehicleConversions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Our Electric Transformations</h1>
        <p className="text-xl text-center mb-16 text-gray-300">Explore our portfolio of cutting-edge electric vehicle conversions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conversions.map((conversion) => (
            <ConversionCard key={conversion.id} conversion={conversion} />
          ))}
        </div>
      </div>
    </div>
  );
}
