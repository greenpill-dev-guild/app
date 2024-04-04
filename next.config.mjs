import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";
import withPWAInit from "@ducanh2912/next-pwa";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_WEB3_STORAGE_TOKEN: process.env.NEXT_WEB3_STORAGE_TOKEN,
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = withPWAInit({
      dest: "public",
    });

    return withNextIntl(withPWA(nextConfig));
  }

  return withNextIntl(nextConfig);
};

export default nextConfigFunction;
