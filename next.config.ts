import type { NextConfig } from 'next';

const directives = ["default-src 'self'", "script-src 'self'", "style-src 'self'", "img-src  'self' https://lh3.googleusercontent.com data:", "font-src 'self'", "connect-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'"]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',

      },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options', value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options', value: 'nosniff'
          },
          {
            key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy-Report-Only', value: directives.join("; ")
          }
        ]
      }
    ]
  }
};
export default nextConfig;
