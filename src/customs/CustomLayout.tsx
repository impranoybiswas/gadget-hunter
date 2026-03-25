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
  const authLayout = pathname.startsWith("/auth");
  const dashboardLayout = pathname.startsWith("/dashboard");

  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          <ThemeSync />
          <FavoriteSync />
          <ScrollProvider>
            <Toaster />
            {!dashboardLayout && <Navbar />}
            {children}
            <GoToTop />
            <AiChatbot />
            {authLayout || dashboardLayout || <Footer />}
          </ScrollProvider>
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
