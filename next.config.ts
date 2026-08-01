import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/llms.txt", destination: "/llms" }];
  },
};

export default nextConfig;
