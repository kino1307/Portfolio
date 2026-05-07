import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gallery.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
