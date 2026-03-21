import type { NextConfig } from "next";

// Check if the build is running inside GitHub Actions
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

let nextConfig: NextConfig = {
  reactCompiler: true,
};

// Only apply these settings if deploying to GitHub Pages
if (isGithubActions) {
  nextConfig = {
    ...nextConfig,
    output: "export",
    basePath: "/password-generator",
  };
}

export default nextConfig;
