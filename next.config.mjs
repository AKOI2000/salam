/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
      allowedOrigins: ["*"],
    },
  },
  serverExternalPackages: ["cloudinary"], // run cloudinary in Node.js runtime
  httpAgentOptions: {
    keepAlive: true,
  },
  // increase timeout
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
      timeout: 120, // 120 seconds
    },
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};


export default nextConfig;
