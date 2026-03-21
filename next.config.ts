import type { NextConfig } from "next";

// Vercel natively injects this environment variable during deployment
const isVercel = process.env.VERCEL === "1";

let nextConfig: NextConfig = {
  reactCompiler: true,
};

// If it's NOT Vercel, apply the GitHub Pages settings that worked for you
if (!isVercel) {
  nextConfig = {
    ...nextConfig,
    output: "export",
    // Use the exact name that worked perfectly for you before
    basePath: "/password-generator",
  };
}

export default nextConfig;
