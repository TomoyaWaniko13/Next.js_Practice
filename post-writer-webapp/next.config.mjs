import { withContentlayer } from "next-contentlayer";

// To hook Contentlayer into the next dev and next build processes,
// you'll want to wrap the Next.js configuration using the
// withContentlayer method.

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true };

export default withContentlayer(nextConfig);