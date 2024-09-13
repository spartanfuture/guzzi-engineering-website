'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import atvImage2 from '../images/atvWork.jpg'
import cadModel1 from '../images/frame.jpg'
import cadModel2 from '../images/atv.jpg'
import cadModel3 from '../images/atvWork.jpg'
import KeyFeatures from '../components/keyFeatures';
import Image from 'next/image';
import localFont from 'next/font/local'
import { FaFeather, FaChild, FaMountain } from 'react-icons/fa';
import atvImage from '../images/AtvBanner.jpg'
import { Inter } from 'next/font/google'

const ethnocentric = localFont({ src: '../fonts/ethnocentric-rg.woff' })
const inter = Inter({ subsets: ['latin'] })

export default function ElectricATVsPage() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showFeatures, setShowFeatures] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);

    const useCases = [
        { icon: <FaFeather className="text-4xl mb-4" />, title: "Quiet Hunting", description: "Silent operation for undisturbed wildlife observation and hunting." },
        { icon: <FaChild className="text-4xl mb-4" />, title: "Family Fun", description: "Safe and easy to operate for unforgettable family outdoor adventures." },
        { icon: <FaMountain className="text-4xl mb-4" />, title: "Exploring Adventure", description: "Conquer any terrain with powerful electric performance." },
    ];

    const features = [
        "Powerful electric motor for instant torque",
        "Long-range battery for extended trips",
        "Rugged construction for challenging terrains",
        "Zero emissions for eco-friendly riding",
        "Low maintenance design",
        "Advanced safety features",
    ];

    const specifications = [
        { name: "Motor", value: "3000W Internal Permanent Magnet Motor" },
        { name: "Battery", value: "72V 53Ah Lithium-ion" },
        { name: "Range", value: "Up to 100kms" },
        { name: "Top Speed", value: "49km/h (adjustable)" },
        { name: "Charging Time", value: "4-6 hours" },
        { name: "Weight Capacity", value: "120 kgs" },
    ];

    const Divider = () => (
        <div className="my-16">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
        </div>
    );

    useEffect(() => {
        const header = document.querySelector('header');
        if (!header) return;

        const controlHeader = () => {
            if (window.scrollY > lastScrollY) { // if scroll down hide the header
                header.style.transform = 'translateY(-100%)';
            } else { // if scroll up show the header
                header.style.transform = 'translateY(0)';
            }

            // Remember last scroll position
            setLastScrollY(window.scrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY < 100) { // Adjust this value based on your header height
                header.style.transform = 'translateY(0)';
            } else {
                header.style.transform = 'translateY(-100%)';
            }
        };

        window.addEventListener('scroll', controlHeader);
        window.addEventListener('mousemove', handleMouseMove);

        // Hide header on page load
        header.style.transform = 'translateY(-100%)';

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', controlHeader);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [lastScrollY]);

    return (
        <main className={`electric-atv-page min-h-screen bg-black text-white ${inter.className}`}>
            <div className="container mx-auto px-4 py-16 space-y-24">
                {/* Hero Section */}
                <section className="text-center mt-16">
                    <h1 className={`${ethnocentric.className} text-6xl mb-16 text-red-800`}>Spartan Mini Electric ATV</h1>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <Image 
                                src={atvImage}
                                alt="Spartan Electric ATV" 
                                fill
                                className="rounded-lg shadow-2xl object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent rounded-lg"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                <p className="text-3xl mb-2 text-white font-semibold italic">Unleash the power of silence.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Divider />

                {/* Use Cases Section */}
                <section className="max-w-5xl mx-auto">
                    <h2 className={`${ethnocentric.className} text-4xl font-bold mb-12 text-center text-gray-300 tracking-wide`}>Experience the Versatility</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <div key={index} className="bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <div className="bg-gray-700 rounded-full p-4 inline-block mb-6">
                                    {React.cloneElement(useCase.icon, { className: "text-5xl text-gray-300" })}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-200">{useCase.title}</h3>
                                <p className="text-gray-400 text-lg">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Divider />

                {/* Features and Specifications Section */}
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-center gap-16 mb-16">
                        {/* Features Tab */}
                        <button 
                            className={`relative px-6 py-4 text-3xl font-bold transition-all duration-300 ${showFeatures ? 'text-red-800' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {setShowFeatures(!showFeatures); setShowSpecs(false);}}
                        >
                            <span className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                Features
                            </span>
                            {showFeatures && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
                            )}
                        </button>

                        {/* Specifications Tab */}
                        <button 
                            className={`relative px-6 py-4 text-3xl font-bold transition-all duration-300 ${showSpecs ? 'text-red-800' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {setShowSpecs(!showSpecs); setShowFeatures(false);}}
                        >
                            <span className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Specifications
                            </span>
                            {showSpecs && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
                            )}
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className={`bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl transition-all duration-500 ${(showFeatures || showSpecs) ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        {showFeatures && (
                            <ul className="grid md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-start bg-gray-800 p-4 rounded-lg shadow-md">
                                        <span className="text-green-600 mr-3 text-3xl">•</span>
                                        <span className="text-gray-300 text-lg">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {showSpecs && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                        <h3 className=" text-green-600 mb-2 text-xl">{spec.name}</h3>
                                        <p className="text-gray-300 text-lg">{spec.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Divider />

                {/* Call to Action */}
                <section className="text-center">
                    <a 
                        href="/register-interest"
                        className="inline-block bg-red-800 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        Register Your Interest
                    </a>
                </section>
            </div>
            <style jsx global>{`
                .electric-atv-page header {
                    transition: transform 0.3s ease-in-out !important;
                }
            `}</style>
        </main>
    );
}
