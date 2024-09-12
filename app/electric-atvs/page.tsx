

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import localFont from 'next/font/local'
import atvImage from '../images/AtvBanner.jpg'
import atvImage2 from '../images/atvWork.jpg'
import cadModel1 from '../images/frame.jpg'
import cadModel2 from '../images/atv.jpg'
 import cadModel3 from '../images/atvWork.jpg'

const ethnocentric = localFont({ src: '../fonts/ethnocentric-rg.woff' })

export const metadata: Metadata = {
  title: 'Electric ATVs | Spartan Future',
  description: 'Experience the future of off-road mobility with our powerful and eco-friendly electric ATVs.',
};

export default function ElectricATVsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className={`${ethnocentric.className} text-6xl font-bold mb-8 text-center text-gray-300 tracking-wider`}>Electric ATVs</h1>
                
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <p className="text-3xl mb-4 text-gray-300 font-semibold">Unleash the power of silence. Conquer any terrain.</p>
                    <p className="text-xl text-gray-400">Experience the future of off-road mobility with Spartan Future's innovative electric ATV solutions.</p>
                </div>

                {/* Hero Image */}
                <div className="mb-16 relative max-w-4xl mx-auto">
                    <div className="aspect-w-16 aspect-h-9">
                        <Image 
                            src={atvImage}
                            alt="Spartan Electric ATV" 
                            fill
                            className="rounded-lg shadow-2xl object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 rounded-lg"></div>
                </div>

                {/* Key Features */}
                <section className="mb-16">
                    <h2 className={`${ethnocentric.className} text-4xl font-bold mb-12 text-center text-gray-300 tracking-wide`}>Key Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Powerful electric motors for superior performance",
                            "Long-range battery for extended adventures",
                            "Rugged construction for challenging terrains",
                            "Zero emissions for eco-friendly off-roading",
                            "Low maintenance design for reduced operating costs",
                            "Cutting-edge technology for optimal control"
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-800">
                                <p className="text-lg text-gray-300">{feature}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sheet Metal Design Feature */}
                <section className="mb-16">
                    <h2 className={`${ethnocentric.className} text-4xl font-bold mb-8 text-center text-gray-300 tracking-wide`}>Innovative Sheet Metal Design</h2>
                    <p className="text-xl text-gray-400 mb-8 text-center max-w-3xl mx-auto">
                        Our ATVs stand out with their unique sheet metal construction, combining strength, lightweight design, and sleek aesthetics.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {[cadModel1, cadModel2, cadModel3].map((model, index) => (
                            <div key={index} className="relative aspect-w-16 aspect-h-9">
                                <Image 
                                    src={model}
                                    alt={`CAD Model ${index + 1}`}
                                    fill
                                    className="rounded-lg shadow-lg object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                        <h3 className={`${ethnocentric.className} text-2xl font-bold mb-4 text-gray-300`}>Benefits of Sheet Metal Design</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            <li>Enhanced durability and structural integrity</li>
                            <li>Significant weight reduction for improved performance</li>
                            <li>Streamlined manufacturing process</li>
                            <li>Customizable designs for specific terrains and uses</li>
                            <li>Improved heat dissipation for better battery and motor efficiency</li>
                        </ul>
                    </div>
                </section>

                {/* New Image Section */}
                <div className="mb-16 relative max-w-4xl mx-auto">
                    <div className="aspect-w-16 aspect-h-9">
                        <Image 
                            src={atvImage2}
                            alt="Spartan Electric ATV Features" 
                            fill
                            className="rounded-lg shadow-2xl object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 rounded-lg"></div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <a href="#contact" className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg">
                        Experience the Future Today
                    </a>
                </div>
            </div>
        </main>
    );
}
