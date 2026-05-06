import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Parent folder has its own pnpm-lock.yaml; without this, Turbopack resolves
  // `@import "tailwindcss"` from /Users/.../Code instead of this package.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
