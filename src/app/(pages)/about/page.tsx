"use client";

import Container from "@/ui/Container";
import Section from "@/ui/Section";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaMobile,
  FaLaptop,
  FaHeadphones,
  FaStar,
  FaBolt,
  FaRocket,
  FaShield,
  FaUsers,
  FaGlobe,
  FaAward,
} from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <Container>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[400 md:h-[600px] rounded-[2.5rem] overflow-hidden mb-16 md:mb-24"
      >
        <Image
          src="/about/hero.png"
          alt="Modern Tech Store"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-3xl w-full backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-14 rounded-3xl text-center shadow-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              About <span className="text-primary">Gadget Hunter</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              We're more than just a store — we're a bridge between tech
              enthusiasts and the future's most innovative tools.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <Section className="mb-16 md:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: "Happy Customers", value: "10k+", icon: <FaUsers /> },
            { label: "Premium Brands", value: "50+", icon: <FaAward /> },
            { label: "Countries Reached", value: "12+", icon: <FaGlobe /> },
            { label: "Years of Service", value: "5+", icon: <FaStar /> },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-base-200 border border-base-content/5 hover:border-primary/20 hover:bg-base-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-base-content mb-1">
                {stat.value}
              </h3>
              <p className="text-base-content/50 font-bold uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Our Story Section */}
      <Section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
              Our <span className="text-primary italic">Story</span>
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full" />
          </div>
          <p className="text-base-content/70 text-lg leading-relaxed font-medium">
            Founded with a vision to make cutting-edge technology accessible,
            reliable, and exciting for everyone, Gadget Hunter curates only the
            best gadgets from trusted brands. We provide honest reviews, expert
            guidance, and a seamless shopping experience for tech enthusiasts
            worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <FaRocket />, label: "Rapid Delivery" },
              { icon: <FaBolt />, label: "Instant Support" },
              { icon: <FaShield />, label: "Secured Quality" },
              { icon: <FaStar />, label: "Premium Range" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-base-content/80"
              >
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
                  {feature.icon}
                </div>
                <span className="font-bold text-sm tracking-wide uppercase">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl skew-y-1 lg:-rotate-2 hover:rotate-0 transition-all duration-500"
        >
          <Image
            src="/about/story.png"
            alt="Our Workspace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </motion.div>
      </Section>

      {/* Core Values Section */}
      <Section className="mb-16 md:mb-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            Our Core <span className="text-primary">Values</span>
          </h2>
          <p className="text-base-content/50 max-w-2xl mx-auto font-medium">
            The principles that guide us in delivering the best tech experience
            to our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Customer-Centric",
              desc: "We prioritize delivering the best experience for every tech enthusiast via personalized support.",
              icon: <FaStar />,
              color: "primary",
            },
            {
              title: "Innovation",
              desc: "Bringing the latest technology to your hands quickly, reliably, and with full transparency.",
              icon: <FaBolt />,
              color: "secondary",
            },
            {
              title: "Trust & Quality",
              desc: "Only verified brands and products, ensuring safety, satisfaction, and long-term peace of mind.",
              icon: <FaShield />,
              color: "accent",
            },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -10 }}
              className="relative p-10 rounded-[2.5rem] bg-base-200 border border-base-content/5 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-12 -mr-8 -mt-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="text-8xl text-primary transform rotate-12">
                  {val.icon}
                </div>
              </div>
              <div className="size-16 rounded-2xl bg-primary text-primary-content flex items-center justify-center text-3xl mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                {val.icon}
              </div>
              <h3 className="text-2xl font-black text-base-content mb-4 tracking-tight">
                {val.title}
              </h3>
              <p className="text-base-content/60 leading-relaxed font-medium">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full bg-primary rounded-[3rem] p-12 md:p-20 text-center text-primary-content relative overflow-hidden group mb-16 md:mb-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Hunt for the Greatest Tech?
          </h2>
          <p className="text-primary-content/80 text-lg md:text-xl max-w-xl mx-auto font-medium">
            Join thousands of gadget hunters and get the latest devices at
            unbeatable prices.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="bg-white text-primary px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-base-200 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              Start Hunting <FiArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="bg-primary-focus/30 border border-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-black hover:bg-primary-focus/50 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
