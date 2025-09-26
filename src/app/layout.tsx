import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import poppins from "@/components/font/poppins";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bukadita",
  description: "Website pembelajaran Kader Posyandu Kopelma Darussalam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
