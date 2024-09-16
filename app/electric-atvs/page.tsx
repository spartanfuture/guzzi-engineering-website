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
import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaBatteryFull, FaRoad, FaTachometerAlt, FaClock, FaWeight } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

const ethnocentric = localFont({ src: '../fonts/ethnocentric-rg.woff' })
const inter = Inter({ subsets: ['latin'] })

export default function ElectricATVsPage() {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showFeatures, setShowFeatures] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const useCases = [
        { icon: FaFeather, title: "Quiet Hunting", description: "Silent operation for undisturbed wildlife observation and hunting.", color: "text-green-400" },
        { icon: FaChild, title: "Family Fun", description: "Safe and convenient for all family adventures.", color: "text-blue-400" },
        { icon: FaMountain, title: "Exploring Adventure", description: "Go further with powerful efficient electric performance.", color: "text-purple-400" },
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
        { icon: FaBolt, name: "Motor", value: "3000W Internal Permanent Magnet Motor", color: "text-yellow-400" },
        { icon: FaBatteryFull, name: "Battery", value: "72V 53Ah Lithium-ion", color: "text-green-500" },
        { icon: FaRoad, name: "Range", value: "Up to 100kms", color: "text-blue-400" },
        { icon: FaTachometerAlt, name: "Top Speed", value: "49km/h (Limited)", color: "text-red-500" },
        { icon: FaClock, name: "Charging Time", value: "4-6 hours", color: "text-purple-500" },
        { icon: FaWeight, name: "Weight Capacity", value: "120 kgs", color: "text-orange-500" },
    ];

    const Divider = () => (
        <div className="my-16">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
        </div>
    );

    const usabilityImages = [
        { src: atvImage2, alt: "ATV at work" },
        { src: cadModel1, alt: "ATV frame" },
        { src: cadModel2, alt: "ATV model" },
        { src: cadModel3, alt: "ATV in action" },
    ];

    const NextArrow = ({ onClick }: { onClick?: () => void }) => (
        <button onClick={onClick} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 p-2 rounded-full">
            <FaArrowRight className="text-white" />
        </button>
    );

    const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
        <button onClick={onClick} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 p-2 rounded-full">
            <FaArrowLeft className="text-white" />
        </button>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current: number, next: number) => setCurrentSlide(next),
    };

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
                    <h1 className={`${ethnocentric.className} text-6xl mb-16 text-red-800`}>Spartan Mini ATV</h1>
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

                {/* Updated Versatility Section with Colorful Icons */}
                <section className="max-w-6xl mx-auto px-4 ">
                    <h2 className={`${ethnocentric.className} text-4xl font-bold mb-16 text-center text-gray-400 tracking-wide`}>
                        Experience the Versatility
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg"
                            >
                                <div className="p-8">
                                    <div className={`flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-800 ${useCase.color}`}>
                                        <useCase.icon className="text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-200">{useCase.title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">{useCase.description}</p>
                                </div>
                                <div className={`h-1 bg-gradient-to-r from-gray-800 via-${useCase.color.replace('text-', '')} to-gray-800`}></div>
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Updated Slideshow Section */}
                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            <Slider {...settings}>
                                {usabilityImages.map((image, index) => (
                                    <div key={index} className="relative h-64 md:h-80">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </section>

                <Divider />

                {/* Updated Features & Specifications Section */}
                <section className="py-20 bg-gradient-to-b from-black to-black">
                    <div className="container mx-auto px-4">
                        <h2 className={`${ethnocentric.className} text-4xl mb-12 text-center text-gray-400`}>
                            Features & Specifications
                        </h2>
                        <div className="grid grid-cols-3 gap-8">
                            {specifications.map((spec, index) => (
                                <div
                                    key={spec.name}
                                    className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-between h-full shadow-lg transition-all duration-300"
                                >
                                    <div className="text-center mb-4 flex flex-col items-center justify-center flex-grow">
                                        <spec.icon className={`text-5xl mb-4 ${spec.color}`} />
                                        <h3 className="text-2xl font-bold mb-2 text-gray-200">{spec.name}</h3>
                                    </div>
                                    <p className="text-base text-center text-gray-300">
                                        {spec.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Divider />

                {/* Call to Action */}
                <section className="text-center">
                    <Link 
                        href="/register-interest"
                        className="inline-block bg-red-800 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        Register Your Interest
                    </Link>
                </section>
            </div>
            <style jsx global>{`
                .electric-atv-page header {
                    transition: transform 0.3s ease-in-out !important;
                }
                .slick-slider {
                    margin-bottom: 0;
                }
                .slick-dots {
                    bottom: 16px;
                }
                .slick-dots li button:before {
                    color: white;
                    opacity: 0.5;
                }
                .slick-dots li.slick-active button:before {
                    color: white;
                    opacity: 1;
                }
            `}</style>
        </main>
    );
}
