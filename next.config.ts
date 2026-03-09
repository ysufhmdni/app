import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {hostname: "png.pngtree.com"}
    ]
  }
};

export default nextConfig;
