import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  // experimental: {
  //   staleTimes: {
  //     dynamic: 30, // 30 seconds cache
  //   },
  // },
};

export default nextConfig;
