import pkg from './package.json' with { type: 'json' };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    version: pkg.version,
  },
};;

export default nextConfig;
