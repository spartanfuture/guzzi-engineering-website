'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

// This would typically come from a database or API
const conversions = [
  { 
    id: 1, 
    name: 'Commercial Tour Bus', 
    slug: 'bus',
    description: 'We converted a commercial touring bus designed for tough Northern Territory conditions into a fully electric powerhouse, upgrading its performance while remaing quiet. Designed and manufactured a 400v custom size battery pack with 100kw of power.',
    specs: [
      { label: 'Range', value: '150 kms' },
      { label: 'Motor', value: '90kW AC motor' },
      { label: 'Battery', value: '40kWh Lithium-ion' },
      { label: 'Charging', value: '6 hrs 20-80%' },
    ],
    images: ['bus.jpg', 'bus.jpg', 'bus.jpg']
  },
  { 
    id: 2, 
    name: 'GPX Sports Motorbike', 
    slug: 'gpx250',
    description: 'This GPX sports motorbike was transformed into an electric speed demon, maintaining its agility while embracing clean energy. Designed and modelled by our engineers with all certification for registraion.',
    specs: [
      { label: 'Range', value: '120 kms' },
      { label: 'Motor', value: '30kW IPM motor' },
      { label: 'Battery', value: '10kWh Lithium-ion' },
      { label: 'Charging', value: '3hrs 20-80%' },
    ],
    images: ['gpx250.jpg', 'gpxcad2.jpg', 'gpxside.jpg']
  },
];

export default function ConversionDetail({ params }: { params: { slug: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const conversion = conversions.find(c => c.slug === params.slug);

  useEffect(() => {
    if (conversion) {
      Promise.all(conversion.images.map(img => 
        import(`../../images/conversions/${img}`)
          .then(module => module.default.src)
          .catch(() => '/images/placeholder.jpg')
      )).then(setImages);
    }
  }, [conversion]);

  if (!conversion) {
    notFound();
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-8 mt-8">
          <Link href="/vehicle-conversions" className="inline-flex items-center px-4 py-2 bg-whitea text-white rounded-full hover:bg-cyan-700 transition-colors duration-300 shadow-lg">
            <FaArrowLeft className="mr-2" />
            Back to Vehicle Conversions
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{conversion.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative max-w-lg mx-auto w-full">
            <div className="aspect-w-3 aspect-h-2 rounded-lg shadow-lg overflow-hidden">
              {images.length > 0 && (
                <Image
                  src={images[currentImageIndex]}
                  alt={`${conversion.name} - Image ${currentImageIndex + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2">
              <button onClick={prevImage} className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300">
                &#10094;
              </button>
              <button onClick={nextImage} className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300">
                &#10095;
              </button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full ${
                    index === currentImageIndex ? 'bg-cyan-400' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg mb-8 text-gray-300">{conversion.description}</p>
            <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Specifications</h2>
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
