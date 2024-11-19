"use client";

import React, { useState, FormEvent, useRef } from "react";
import localFont from "next/font/local";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ethnocentric = localFont({ src: "../fonts/ethnocentric-rg.woff" });

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const hCaptchaRef = useRef<HCaptcha | null>(null);

  const onCaptchaChange = (token: string) => setCaptchaToken(token);
  const onCaptchaExpire = () => setCaptchaToken(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (
      phone &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(phone)
    ) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers, spaces, dashes, plus sign, and parentheses
    const sanitizedValue = value.replace(/[^\d\s\-+()]/g, "");
    setPhone(sanitizedValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!captchaToken) {
      setErrors({ ...formErrors, captcha: "Please complete the CAPTCHA" });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
          captcha: captchaToken,
        }),
      });

      if (response.ok) {
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setErrors({});
        hCaptchaRef.current?.resetCaptcha();
        alert("Thank you for your enquiry. We will get back to you soon!");
      } else {
        throw new Error("Failed to send enquiry");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Sorry, there was an error sending your enquiry. Please try again later."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-black bg-opacity-70 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <h3
            className={`text-2xl mb-4 text-center text-white ${ethnocentric.className}`}
          >
            Get In Touch
          </h3>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name *
            </label>
            <input
              className={`appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 ${
                errors.firstName ? "border-red-500" : "border-gray-700"
              }`}
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">{errors.firstName}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name *
            </label>
            <input
              className={`appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 ${
                errors.lastName ? "border-red-500" : "border-gray-700"
              }`}
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs italic">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              className={`appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 ${
                errors.email ? "border-red-500" : "border-gray-700"
              }`}
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className={`appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 ${
                errors.phone ? "border-red-500" : "border-gray-700"
              }`}
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message *
            </label>
            <textarea
              className={`appearance-none block w-full bg-gray-800 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 ${
                errors.message ? "border-red-500" : "border-gray-700"
              }`}
              id="message"
              placeholder="Your message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs italic">{errors.message}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
            onVerify={onCaptchaChange}
            ref={hCaptchaRef}
            onExpire={onCaptchaExpire}
          />
          {errors.captcha && (
            <p className="text-red-500 text-xs italic mt-2">{errors.captcha}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`bg-blue-400 hover:bg-blue-300 text-black font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${ethnocentric.className}`}
            type="submit"
          >
            Send Enquiry
          </button>
        </div>
      </form>
    </div>
  );
}
