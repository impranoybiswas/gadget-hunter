import type { Metadata } from "next";
import "./globals.css";
import "./custom.css";
import CustomLayout from "@/customs/CustomLayout";
import SmoothScrolling from "@/components/SmoothScrolling";

export const metadata: Metadata = {
  title: "Gadget Hunter",
  description: "A trustable and reliable gadget store",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content">
        <SmoothScrolling>
          <CustomLayout>{children}</CustomLayout>
        </SmoothScrolling>
      </body>
    </html>
  );
}
