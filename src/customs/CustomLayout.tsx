"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import ThemeProvider from "@/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import ScrollProvider from "@/providers/ScrollProvider";
import GoToTop from "@/components/GoToTop";

import ThemeSync from "@/components/ThemeSync";
import FavoriteSync from "@/components/FavoriteSync";
import AiChatbot from "@/components/AiChatbot";

export default function CustomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout =
    pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          <ThemeSync />
          <FavoriteSync />
          <ScrollProvider>
            <Toaster />
            {hideLayout || <Navbar />}
            {children}
            <GoToTop />
            <AiChatbot />
            {hideLayout || <Footer />}
          </ScrollProvider>
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
