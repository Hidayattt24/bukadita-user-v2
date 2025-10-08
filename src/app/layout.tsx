import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import poppins from "@/components/font/poppins";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui";
import InstallPrompt from "@/components/shared/InstallPrompt";
import FloatingNotes from "@/components/shared/FloatingNotes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bukadita - Posyandu Learning Platform",
  description:
    "Platform pembelajaran untuk kader posyandu dengan materi lengkap dan interaktif",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["posyandu", "pembelajaran", "kader", "kesehatan", "edukasi"],
  authors: [{ name: "Bukadita Team" }],
  creator: "Bukadita Team",
  publisher: "Bukadita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bukadita.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Bukadita",
    title: {
      default: "Bukadita - Posyandu Learning Platform",
      template: "%s | Bukadita",
    },
    description:
      "Platform pembelajaran untuk kader posyandu dengan materi lengkap dan interaktif",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Bukadita Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bukadita - Posyandu Learning Platform",
    description:
      "Platform pembelajaran untuk kader posyandu dengan materi lengkap dan interaktif",
    images: ["/icons/icon-512x512.png"],
  },

  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bukadita",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Bukadita",
    "application-name": "Bukadita",
    "msapplication-TileColor": "#578FCA",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#578FCA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <InstallPrompt />
            <FloatingNotes />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
