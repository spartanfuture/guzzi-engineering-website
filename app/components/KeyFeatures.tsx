'use client';

import React, { useState } from 'react';

const ethnocentric = 'ethnocentric'; // We'll apply the font class from the parent component

interface Feature {
    title: string;
    description: string;
}

interface KeyFeaturesProps {
    features: Feature[];
}

export default function KeyFeatures({ features }: KeyFeaturesProps) {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
                {features.map((feature, index) => (
                    <div 
                        key={index}
                        className={`cursor-pointer py-4 px-6 mb-2 rounded-lg transition-all duration-300 ${activeFeature === index ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        onClick={() => setActiveFeature(index)}
                    >
                        <h3 className={`${ethnocentric} text-lg font-semibold`}>{feature.title}</h3>
                    </div>
                ))}
            </div>
            <div className="md:w-2/3 bg-gray-900 p-8 rounded-lg">
                <h3 className={`${ethnocentric} text-2xl font-bold mb-4 text-gray-200`}>{features[activeFeature].title}</h3>
                <p className="text-lg text-gray-300">{features[activeFeature].description}</p>
            </div>
        </div>
    );
}
