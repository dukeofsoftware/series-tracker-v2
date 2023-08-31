/* eslint-disable no-process-env */
// @ts-check

import { env } from './src/env.mjs';
import withPWA from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: env.NODE_ENV === 'production' ? 'standalone' : undefined,
  poweredByHeader: false,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org", "api.themoviedb.org", "firebasestorage.googleapis.com"],
    unoptimized: true,
  },
  basePath: '',
  typescript: {
    // Handled during CI
    ignoreBuildErrors: true,
  },
  eslint: {
    // Handled during CI
    ignoreDuringBuilds: true,
  },

};

/**
 * @param {string} phase
 * @param {{ defaultConfig: import('next').NextConfig }} options
 */
const nextConfigWithPlugins = async (phase, { defaultConfig }) => {

  const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
    enabled: env.ANALYZE,
  });


  if (env.PWA) {
    withPWA({
      dest: "public",
      register: true,
      skipWaiting: true
    })
  }

  return withBundleAnalyzer(nextConfig)
};

export default nextConfigWithPlugins;