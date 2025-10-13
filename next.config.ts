import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ykvvjxbyxmyyzeutyxbf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "ykvvjxbyxmyyzeutyxbf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default withPWA(nextConfig);
