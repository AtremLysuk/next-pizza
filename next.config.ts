import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ВРЕМЕННО: карты исходников в продакшене, чтобы разобрать JS в Lighthouse.
  // После диагностики выключить: они раскрывают исходный код и увеличивают сборку
  productionBrowserSourceMaps: true,
};

export default nextConfig;
