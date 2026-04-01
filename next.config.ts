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
        source: "/_next/static/media/797e433ab948586e-s.p.dbea232f.woff2",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
