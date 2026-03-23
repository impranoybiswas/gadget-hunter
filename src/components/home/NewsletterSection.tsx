"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setIsSubscribed(true);
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral text-neutral-content p-8 md:p-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-96 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 size-96 bg-secondary/10 blur-[100px] rounded-full" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-primary"
            >
              <FiMail className="text-sm" />
              <span>STAY IN THE LOOP</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
            >
              Unlock Early Access to <br className="hidden md:block" />
              <span className="text-primary italic">Exclusive Deals</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-neutral-content/60 text-lg max-w-lg mx-auto lg:mx-0"
            >
              Subscribe to our newsletter and be the first to know about new
              gadget arrivals, flash sales, and tech guides.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-3xl"
          >
            {!isSubscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="relative flex-1">
                  <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 text-xl" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 pl-14 pr-6 py-5 text-white placeholder:text-white/20 font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-focus text-primary-content font-black px-8 py-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  <FiSend className="text-lg" />
                  <span>Join Now</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-4 py-8 text-primary">
                <FiCheckCircle size={40} className="animate-bounce" />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white">
                    You&apos;re on the list!
                  </h4>
                  <p className="text-white/40 text-sm">
                    Welcome to the Gadget Hunter family.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
