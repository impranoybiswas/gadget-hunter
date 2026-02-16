"use client";

import Container from "@/ui/Container";
import Section from "@/ui/Section";
import Button from "@/ui/Button";
import React, { useState } from "react";
import { FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container>
      {/* Hero / Title */}
      <Section
        title="Contact Us"
        subtitle="We’re Here to Help"
        className="text-center"
      >
        <p className="text-base-content/70 text-base md:text-lg max-w-2xl mx-auto">
          Whether you have questions, feedback, or need assistance, our team at Gadget Hunter is ready to provide support. Reach out and we’ll respond promptly.
        </p>
      </Section>

      {/* Contact Info & Form */}
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
        {/* Contact Details */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">Get in Touch</h2>
          <p className="text-base-content/60 text-base md:text-lg">
            Our team is available to answer any questions you may have. Connect with us through any of the following channels:
          </p>

          <div className="flex flex-col gap-6 text-base-content/80">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <span>123 Tech Street, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-primary text-xl" />
              <span>+880 123 456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-xl" />
              <span>support@gadgethunter.com</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <FaFacebookF className="text-primary text-xl cursor-pointer hover:text-blue-700 transition" />
            <FaTwitter className="text-primary text-xl cursor-pointer hover:text-blue-400 transition" />
            <FaInstagram className="text-primary text-xl cursor-pointer hover:text-pink-500 transition" />
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-base-100 p-8 rounded-xl shadow-md hover:shadow-lg transition border border-base-content/5"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border border-base-content/10 bg-base-100 rounded-md p-3 focus:outline-primary focus:ring-1 focus:ring-primary transition text-base-content"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="border border-base-content/10 bg-base-100 rounded-md p-3 focus:outline-primary focus:ring-1 focus:ring-primary transition text-base-content"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows={6}
            className="border border-base-content/10 bg-base-100 rounded-md p-3 focus:outline-primary focus:ring-1 focus:ring-primary transition text-base-content"
          ></textarea>
          <Button
            type="submit"
            label="Send Message"
            isLarge={true}
            isOutline={false}
            className="bg-primary text-white hover:bg-primary-dark transition-colors py-3 rounded-md mt-2"
          />
          <p className="text-sm text-base-content/40 mt-2">
            We respect your privacy. Your information will not be shared.
          </p>
        </form>
      </Section>
    </Container>
  );
}
