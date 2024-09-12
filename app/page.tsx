import dynamic from 'next/dynamic'
import React from 'react'
import Image from 'next/image'
import backgroundImage from './images/background.jpg'
import image1 from './images/atv2.jpg'
import image2 from './images/motor.png'
import image3 from './images/laser.jpeg'
import image4 from './images/3d.jpg'
import image5 from './images/powder.jpg'
// Import other images as needed
import localFont from 'next/font/local'

const ethnocentric = localFont({ src: '/fonts/ethnocentric-rg.woff' })

const Contact = dynamic(() => import('./components/Contact'), { ssr: false })

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="container mx-auto px-8 py-10 bg-black bg-opacity-70">
        {/* First Row */}
        <section id="electric-future" className="mb-20 pt-24 px-8">
          <h2 className={`text-4xl mb-12 text-center text-white ${ethnocentric.className}`}>Electric Future</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { title: "Electric ATV's", image: image1, description: "Rugged, efficient Spartan Mini ATVs engineered for Northern Territory conditions. Experience the future of off-road mobility.", href: "/electric-atvs" },
              { title: "Vehicle Conversions", image: image2, description: "Transform your vehicle into a high-performance electric powerhouse. Custom solutions for sustainable, cutting-edge transportation.", href: "/vehicle-conversions" },
            ].map((tile, index) => (
              <Link key={index} href={tile.href} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <Image src={tile.image} alt={tile.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className={`text-2xl mb-4 text-gray-800 ${ethnocentric.className}`}>{tile.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{tile.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Second Row */}
        <section id="services" className="mb-20 pt-24 px-8">
          <h2 className={`text-4xl mb-12 text-center text-white ${ethnocentric.className}`}>Engineering Services</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Metal Fabrication", image: image3, description: "Precision laser cutting, sheet metal forming, expert welding, and advanced machining. Tailored solutions for your manufacturing needs." },
              { title: "3D Printing", image: image4, description: "Rapid prototyping and production of complex geometries. Specializing in both rigid and flexible materials for diverse applications." },
              { title: "Powder Coating", image: image5, description: "High-quality, durable finishes with rapid turnaround. Enhancing aesthetics and longevity for a wide range of products." },
            ].map((tile, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <Image src={tile.image} alt={tile.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className={`text-2xl mb-4 text-gray-800 ${ethnocentric.className}`}>{tile.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{tile.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pt-24">
          <h2 className={`text-4xl mb-12 text-center text-white ${ethnocentric.className}`}>Contact Us</h2>
          <Contact />
        </section>
      </div>
    </main>
  )
}
