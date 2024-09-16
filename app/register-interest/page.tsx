'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';

const ethnocentric = localFont({ src: '../fonts/ethnocentric-rg.woff' });
const inter = Inter({ subsets: ['latin'] });

export default function RegisterInterest() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/register-interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                const errorData = await response.text();
                console.error('Form submission error:', errorData);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={`min-h-screen bg-black text-white ${inter.className}`}>
            <div className="container mx-auto px-4 py-16">
                <h1 className={`${ethnocentric.className} text-4xl mb-8 text-center text-red-800`}>Register Your Interest</h1>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block mb-2">Phone (optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-gray-800 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block mb-2">Message (optional)</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 bg-gray-800 rounded"
                        ></textarea>
                    </div>
                    <div className="flex justify-between items-center">
                        <Link href="/electric-atvs" className="text-red-800 hover:text-red-600">
                            Back to ATVs
                        </Link>
                        <button 
                            type="submit" 
                            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                    {submitStatus === 'success' && (
                        <p className="mt-4 text-green-500">Thank you for your interest! We will contact you soon.</p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="mt-4 text-red-500">There was an error submitting the form. Please try again.</p>
                    )}
                </form>
            </div>
        </main>
    );
}
