/** @type {import('next').NextConfig} */
/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  images: {
    domains: ["image.tmdb.org", "api.themoviedb.org", "firebasestorage.googleapis.com"],
  },
  basePath: '',

});

