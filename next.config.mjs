// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products-1",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
