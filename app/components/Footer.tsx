import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "./logo";
import { SocialLinks } from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and Company Name */}
          <div className="flex items-center mb-4 md:mb-0 w-full sm:w-1/4 justify-center md:justify-normal">
            <Image
              src={logoSrc}
              alt="Spartan Future Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
          </div>

          {/* Navigation */}
          <nav className="mb-4 md:mb-0 w-full md:w-1/2">
            <ul className="flex flex-wrap justify-center space-x-6">
              {[
                { name: "Electric Future", href: "/#electric-future" },
                { name: "Services", href: "/#services" },
                { name: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition duration-300 text-sm font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-100 md:w-1/4 justify-items-end">
            <SocialLinks mobile />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Spartan Future. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
