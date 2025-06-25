// next.config.ts
import { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
     remotePatterns: [
    {
      protocol: 'https',
      hostname: 'blacro.com',
    },
  ],
  },
  // otras configuraciones que quieras
};

export default bundleAnalyzer(nextConfig);