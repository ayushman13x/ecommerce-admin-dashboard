import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; 
import { Providers } from "./providers"; // Ensure this file exists
import Sidebar from "../components/Sidebar"; // This matches your folder structure// Import your separate Sidebar component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Ecommerce Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* 1. Wrap EVERYTHING in Providers so Auth works */}
        <Providers>
          <div className="flex min-h-screen">
            {/* 2. Use the dedicated Sidebar component only */}
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>

        {/* Cloudinary Script */}
        <Script 
          src="https://upload-widget.cloudinary.com/global/all.js" 
          strategy="beforeInteractive" 
        />
      </body>
    </html>
  );
}