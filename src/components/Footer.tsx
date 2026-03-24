import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";
import { navLink } from "./Navbar";
import SiteTitle from "@/customs/SiteTitle";

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    href: "https://facebook.com/impranoybiswas",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    href: "https://twitter.com/impranoybiswas",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com/impranoybiswas",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedinIn />,
    href: "https://linkedin.com/in/impranoybiswas",
  },
  {
    name: "Github",
    icon: <FaGithub />,
    href: "https://github.com/impranoybiswas",
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral w-full text-neutral-content mt-10">
      {/* Top section */}
      <div className="px-4 md:px-10 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <SiteTitle className="text-neutral-content h-10 md:h-14 text-xl md:text-3xl" />

          <p className="text-neutral-content/70 text-sm leading-6">
            Gadget Hunter is your one-stop shop for the latest gadgets, smart
            devices, and accessories. Explore quality tech at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-neutral-content">
            Quick Links
          </h3>
          <ul className="space-y-2 text-neutral-content/70 text-sm">
            {navLink.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-neutral-content">
            Support
          </h3>
          <ul className="space-y-2 text-neutral-content/70 text-sm">
            <li>
              <Link
                href="/faq"
                className="hover:text-primary transition duration-300"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="hover:text-primary transition duration-300"
              >
                Returns Policy
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-neutral-content">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                className="hover:text-primary transition duration-300"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-neutral-focus py-6 px-4 md:px-10 lg:px-20 text-sm flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-content/10">
        <p>
          © {new Date().getFullYear()} All rights reserved |{" "}
          <Link
            href="/"
            className="text-primary hover:underline hover:text-secondary transition"
          >
            Gadget Hunter
          </Link>
        </p>
        <p>
          Full Stack Design |{" "}
          <Link
            href="https://impranoybiswas.vercel.app/"
            target="_blank"
            className="text-primary hover:underline hover:text-secondary transition"
          >
            Pranoy Biswas
          </Link>
        </p>
      </div>
    </footer>
  );
}
