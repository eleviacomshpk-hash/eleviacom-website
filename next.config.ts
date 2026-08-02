import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 768 è il breakpoint usato negli attributi sizes: senza dichiararlo
    // l'ottimizzatore risponde 400 e le immagini non vengono servite.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 768],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/llms.txt", destination: "/llms" }],
    };
  },
};

export default nextConfig;
