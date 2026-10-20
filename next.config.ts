import type { NextConfig } from "next"
import bundleAnalyzer from "@next/bundle-analyzer"

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "next-level-media.it",
      },
      {
        protocol: "https",
        hostname: "staging2.next-level-media.it",
      },
    ],
  },
}

export default withBundleAnalyzer(nextConfig)