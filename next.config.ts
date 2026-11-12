import type { NextConfig } from "next"
import bundleAnalyzer from "@next/bundle-analyzer"

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  // informative gestite da iubenda: i vecchi indirizzi rimandano lì
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "https://www.iubenda.com/privacy-policy/90237580", permanent: false },
      { source: "/cookie-policy", destination: "https://www.iubenda.com/privacy-policy/90237580/cookie-policy", permanent: false },
    ]
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