import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // Fallback to offline page when offline
  fallbacks: {
    document: "/offline.html",
  },
  runtimeCaching: [
    // Static assets - Cache First (optimal for offline)
    {
      urlPattern: /^https?.*\.(png|jpg|jpeg|webp|svg|gif|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https?.*\.(js|css|woff|woff2|ttf|otf|eot)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // 🔥 API calls for quiz - Network Only (MUST be online)
    {
      urlPattern: /\/api\/.*\/(quiz|kuis|attempt|submit)/i,
      handler: "NetworkOnly",
      options: {
        networkTimeoutSeconds: 15,
      },
    },
    // Supabase storage - StaleWhileRevalidate for better offline experience
    {
      urlPattern: /^https?:\/\/.*\.supabase\.co\/storage\/.*/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "supabase-storage",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Material content - CacheFirst for offline access
    {
      urlPattern: /\/api\/.*\/(materials|modules|content)/i,
      handler: "CacheFirst",
      options: {
        cacheName: "content-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
        networkTimeoutSeconds: 10,
      },
    },
    // User data and progress - NetworkFirst with fallback
    {
      urlPattern: /\/api\/.*\/(user|profile|progress)/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "user-data-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
        networkTimeoutSeconds: 8,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Other API calls - NetworkFirst
    {
      urlPattern: /\/api\/.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 75,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Pages - NetworkFirst with longer cache
    {
      urlPattern: /^https?:\/\/.*\/(user|modul|materi)/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        networkTimeoutSeconds: 5,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // All other requests - NetworkFirst with shorter timeout
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "general-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  // Disable ESLint during build for deployment (warnings treated as errors in production)
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checks during build (optional, can enable later)
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fjbacahbbicjggdzmern.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "fjbacahbbicjggdzmern.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
    domains: ["fjbacahbbicjggdzmern.supabase.co"],
  },
  // Security headers for production
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // Compress output
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Note: optimizeFonts and swcMinify are now default in Next.js 15+ and deprecated
  turbopack: {
    root: __dirname,
  },
};

export default withPWA(nextConfig);
