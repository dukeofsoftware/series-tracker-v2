/* eslint-disable no-process-env */
// @ts-check

import { env } from './src/env.mjs';


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: env.NODE_ENV === 'production' ? 'standalone' : undefined,
  poweredByHeader: false,
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
  experimental: {
    /**
     * @enable NextAuth
     */
    // serverActions: true,
  },
};

/**
 * @param {string} phase
 * @param {{ defaultConfig: import('next').NextConfig }} options
 */
const nextConfigWithPlugins = async (phase, { defaultConfig }) => {
  /* Dynamically import plugins from devDependencies to reduce bundle size */

  const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
    enabled: env.ANALYZE,
  });

  const withPWA = (await import('@ducanh2912/next-pwa')).default({
    dest: 'public',
    disable: !env.PWA,
  });

  return withBundleAnalyzer(withPWA(nextConfig));
};

export default nextConfigWithPlugins;