/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "gravatar.com",
      "2.gravatar.com",
      "xtcrjordvnddzvchmpvd.supabase.co",
      "*",
      "fabulous-bouquet-37c770787a.media.strapiapp.com",
      "cdn.sanity.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
