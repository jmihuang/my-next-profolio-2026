import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Products now read from a D1 binding, so this cannot remain a static export.
  images: {
    unoptimized: true,
  },
};

if (process.env.NODE_ENV === "development" && process.env.ENABLE_LOCAL_D1 === "true") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;
