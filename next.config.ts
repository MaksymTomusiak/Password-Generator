import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: isExport ? "export" : "standalone",
  basePath: isExport ? "/Password-Generator" : "",
};

export default nextConfig;
