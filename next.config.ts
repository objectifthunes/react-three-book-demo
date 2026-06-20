import type { NextConfig } from "next";

const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isCI ? "/react-three-book-demo" : undefined,
  assetPrefix: isCI ? "/react-three-book-demo/" : undefined,
  trailingSlash: true,
  // StrictMode double-invokes effects/memos in dev, which disposes the live
  // book's managed TextOverlay canvases mid-build (a dev-only WebGL artifact).
  reactStrictMode: false,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
