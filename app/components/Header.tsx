'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import localFont from 'next/font/local'
import logoSrc from './logo'

const ethnocentric = localFont({ src: '../fonts/ethnocentric-rg.woff' })

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
            if (href?.startsWith('#')) {
                const targetId = href.substring(1);
                const elem = document.getElementById(targetId);
                if (elem) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const elementPosition = elem.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 1; // Increased padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', handleScroll as unknown as EventListener);
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener('click', handleScroll as unknown as EventListener);
            });
        };
    }, []);

    return (
        <header className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 py-3"> {/* Reduced padding */}
                <div className="flex justify-between items-center">
                    {/* Logo and title */}
                    <div className="flex items-center w-1/4"> {/* Added w-1/4 */}
                        <Image
                            src={logoSrc}
                            alt="Spartan Future Logo"
                            width={50}  // Reduced size
                            height={50} // Reduced size
                            className="w-12 h-12 md:w-14 md:h-14" // Adjusted sizes
                        />
                        <div className={`text-xl md:text-2xl font-bold leading-none ml-2 ${ethnocentric.className}`}>
                            <Link href="/" className="hover:text-gray-300 transition duration-300">
                                <span className="block">Spartan</span>
                                <span className="block">Future</span>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex justify-center flex-grow"> {/* Added flex-grow */}
                        <ul className="flex justify-center space-x-6"> {/* Reduced spacing */}
                            {[
                                { name: 'Electric Future', href: '/#electric-future' },
                                { name: 'Services', href: '/#services' },
                                { name: 'Contact', href: '/#contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        href={item.href}
                                        className="hover:text-blue-400 transition duration-300 text-base font-semibold relative group" // Reduced font size
                                    >
                                        {item.name}
                                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social icons and mobile menu button */}
                    <div className="flex items-center w-1/4 justify-end"> {/* Added w-1/4 and justify-end */}
                        <div className="hidden md:flex space-x-4"> {/* Reduced spacing */}
                            {[ 
                                { icon: faFacebookF, href: "#" },
                                { icon: faInstagram, href: "#" },
                                { icon: faEnvelope, href: "mailto:contact@example.com" },
                                { icon: faPhone, href: "tel:+1234567890" }
                            ].map((item, index) => (
                                <a 
                                    key={index} 
                                    href={item.href} 
                                    className="text-white hover:text-blue-400 transition duration-300 transform hover:scale-110"
                                >
                                    <FontAwesomeIcon icon={item.icon} size="sm" /> {/* Reduced icon size */}
                                </a>
                            ))}
                        </div>
                        <button 
                            className="md:hidden z-50 text-white hover:text-blue-400 transition duration-300 ml-4"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-95 z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`}>
                <div className="flex flex-col h-full justify-center items-center">
                    <nav className="mb-8">
                        <ul className="flex flex-col items-center space-y-8">
                            {[
                                { name: 'Services', href: '/#services' },
                                { name: 'Electric Vehicles', href: '/' },
                                { name: 'Contact', href: '/' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        href={item.href}
                                        className="text-white hover:text-blue-400 transition duration-300 text-3xl font-bold tracking-wide"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex space-x-10">
                        {[ 
                            { icon: faFacebookF, href: "#" },
                            { icon: faInstagram, href: "#" },
                            { icon: faEnvelope, href: "mailto:contact@example.com" },
                            { icon: faPhone, href: "tel:+1234567890" }
                        ].map((item, index) => (
                            <a 
                                key={index} 
                                href={item.href} 
                                className="text-white hover:text-blue-400 transition duration-300 transform hover:scale-110"
                            >
                                <FontAwesomeIcon icon={item.icon} size="2x" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}
