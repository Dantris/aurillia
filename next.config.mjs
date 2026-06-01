/** @type {import('next').NextConfig} */
const legacyServiceRedirects = [
  ["/services", "/services/web"],
  ["/en/services", "/en/services/web"],
];

const nextConfig = {
  async redirects() {
    return legacyServiceRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    }));
  },
};

export default nextConfig;
