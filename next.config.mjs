/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "puppeteer-core",
    "@sparticuz/chromium",
    "puppeteer",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core'],
  },
};

export default nextConfig;
