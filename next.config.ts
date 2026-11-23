import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF на 20–30% легче WebP при том же качестве. Браузеры без поддержки AVIF получат WebP
    formats: ["image/avif", "image/webp"],
    // Промежуточный размер 320: телефону нужно ~301 px, и раньше он получал 384
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384],
  },
};

export default nextConfig;
