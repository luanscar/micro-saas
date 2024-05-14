/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true,
    swcMinify: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "randomuser.me",
        },
        {
          protocol: "https",
          hostname: "avatar.vercel.sh",
        },
      ],
    },
    experimental: {
      serverComponentsExternalPackages: ["@prisma/client"],
    },};

export default nextConfig;