

'use client';
import React, { useState } from 'react'
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

    return (
        <header className="bg-black text-white shadow-md relative z-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                    <Image
                        src={logoSrc}
                        alt="Spartan Future Logo"
                        width={70}
                        height={70}
                        className="w-15 h-15"
                    />
                    
                    <div className={`text-3xl leading-none ${ethnocentric.className}`}>
                        <Link href="/" className="hover:text-gray-300 transition duration-300 ">
                            <span className="block">Spartan</span>
                            <span className="block">Future</span>
                        </Link>
                    </div>

                    <button 
                        className="md:hidden z-50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
                    </button>

                    <nav className="hidden md:flex md:flex-grow md:justify-center md:w-1/2">
                        <ul className="flex justify-center space-x-6">
                            {['Services', 'Electric Quads', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="hover:text-blue-400 transition duration-300 text-lg relative group"
                                    >
                                        {item}
                                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden md:flex space-x-6">
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
                                <FontAwesomeIcon icon={item.icon} size="lg" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black bg-opacity-90 z-40 ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="flex flex-col h-full justify-center items-center">
                    <nav className="mb-8">
                        <ul className="flex flex-col items-center space-y-6">
                            {['Services', 'Electric Quads', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        href={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-white hover:text-blue-400 transition duration-300 text-2xl"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex space-x-8">
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
