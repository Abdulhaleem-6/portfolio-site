import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Several lockfiles exist above this directory; pin the trace root to this project.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
