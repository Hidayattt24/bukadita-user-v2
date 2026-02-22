import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/sweetalert-custom.css"; // ✅ Custom SweetAlert2 theme
import "sweetalert2/dist/sweetalert2.min.css"; // ✅ SweetAlert2 base styles
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import poppins from "@/components/font/poppins";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { ToastProvider } from "@/components/ui";
import QueryProvider from "@/providers/QueryProvider";
import ServiceWorkerProvider from "@/providers/ServiceWorkerProvider";
import InstallPrompt from "@/components/shared/InstallPrompt";
import FloatingNotes from "@/components/shared/FloatingNotes";
import AccessibilityWidget from "@/components/shared/AccessibilityWidget";
import { Agentation } from "agentation";

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
    "Solusi edukasi digital kader Posyandu. Belajar materi kesehatan lebih mudah, interaktif, dan dapat diakses kapan saja untuk dukung pelayanan kesehatan masyarakat yang lebih baik.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "posyandu",
    "pembelajaran kader",
    "kader posyandu",
    "kesehatan masyarakat",
    "edukasi kesehatan",
    "bukadita",
    "buku digital kader",
    "monitoring posyandu",
    "transformasi digital kesehatan",
    "aplikasi posyandu",
    "learning management system posyandu",
    "posyandu cerdas",
    "pelatihan kader",
    "kesehatan ibu dan anak",
    "pwa kesehatan",
    "posyandu indonesia",
    "sistem informasi posyandu",
  ],
  authors: [{ name: "Bukadita Team" }],
  creator: "Bukadita Team",
  publisher: "Bukadita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.bukadita.id/"),
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
      "Solusi edukasi digital kader Posyandu. Belajar materi kesehatan lebih mudah, interaktif, dan dapat diakses kapan saja untuk dukung pelayanan kesehatan masyarakat yang lebih baik. ",
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
      "Solusi edukasi digital kader Posyandu. Belajar materi kesehatan lebih mudah, interaktif, dan dapat diakses kapan saja untuk dukung pelayanan kesehatan masyarakat yang lebih baik.",
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
  maximumScale: 5,
  userScalable: true,
  themeColor: "#578FCA",
  viewportFit: "cover",
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
        <QueryProvider>
          <AuthProvider>
            <ProgressProvider>
              <ToastProvider>
                <ServiceWorkerProvider>
                  <ConditionalLayout>{children}</ConditionalLayout>
                  <InstallPrompt />
                  <FloatingNotes />
                  <AccessibilityWidget />
                  {process.env.NODE_ENV === "development" && <Agentation />}
                </ServiceWorkerProvider>
              </ToastProvider>
            </ProgressProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
