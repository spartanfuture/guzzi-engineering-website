'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWrench, FaBolt, FaRocket } from 'react-icons/fa';

const conversionSteps = [
  { 
    icon: FaWrench, 
    title: "1. Choose Your Vehicle", 
    description: "Select any vehicle for an electric makeover. From classics to modern rides, we're ready for the challenge.",
    color: "from-amber-400 to-orange-500"
  },
  { 
    icon: FaBolt, 
    title: "2. We Convert It", 
    description: "Our tech wizards infuse your vehicle with state-of-the-art electric power, preserving its soul while catapulting it into the future.",
    color: "from-teal-400 to-green-500"
  },
  { 
    icon: FaRocket, 
    title: "3. Embrace the Future", 
    description: "Experience the exhilaration of silent, powerful electric driving. Welcome to the new era of mobility.",
    color: "from-blue-400 to-indigo-500"
  }
];

const conversions = [
  { 
    id: 1, 
    name: 'Commercial Tour Bus', 
    slug: 'bus',
    description: 'Electric conversion for tough Northern Territory conditions.',
    images: ['bus.jpg']
  },
  { 
    id: 2, 
    name: 'GPX Sports Motorbike', 
    slug: 'gpx250',
    description: 'A GPX sports motorbike transformed into an electric speed demon.',
    images: ['gpx250.jpg']
  },
];

export default function VehicleConversions() {
  const [images, setImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: { [key: string]: string } = {};

      for (const conversion of conversions) {
        const imagePromises = conversion.images.map(img => 
          import(`../images/conversions/${img}`)
            .then(module => module.default.src)
            .catch(() => '/images/placeholder.jpg')
        );

        const imageSrcs = await Promise.all(imagePromises);
        loadedImages[conversion.slug] = imageSrcs[0]; // Use the first image for each conversion
      }

      setImages(loadedImages);
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-20 mt-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Convert your ride to electric</h1>

        
        {/* Conversion Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {conversionSteps.map((step, index) => (
            <div key={index} className={`bg-gray-800 rounded-lg p-10 text-center hover:bg-gray-700 transition-all duration-300 shadow-lg border border-opacity-50 hover:border-opacity-100 ${
              index === 0 ? 'border-amber-500 hover:border-orange-500' :
              index === 1 ? 'border-teal-500 hover:border-green-500' :
              'border-blue-500 hover:border-indigo-500'
            }`}>
              <div className={`inline-block p-6 rounded-full bg-gradient-to-br ${step.color} mb-8`}>
                <step.icon className="text-5xl text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>{step.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Featured Conversions */}
        <h2 className="text-5xl font-bold mb-16 text-center text-cyan-400">Past Conversions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {conversions.map((conversion) => (
            <Link href={`/vehicle-conversions/${conversion.slug}`} key={conversion.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                <div className="relative h-72">
                  {images[conversion.slug] && (
                    <Image
                      src={images[conversion.slug]}
                      alt={conversion.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-opacity duration-300 group-hover:opacity-80"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                </div>
                <div className="p-8 flex-grow">
                  <h2 className="text-3xl font-semibold mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">{conversion.name}</h2>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-lg leading-relaxed">{conversion.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
