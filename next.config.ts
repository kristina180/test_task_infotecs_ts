import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/test_task_infotecs" : "",
  assetPrefix: isProd ? "/test_task_infotecs/" : "",
  reactStrictMode: true,
};

export default nextConfig;
