import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Several lockfiles exist above this directory; pin the trace root to this project.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
