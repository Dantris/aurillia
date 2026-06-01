/** @type {import('next').NextConfig} */
const legacyServiceRedirects = [
  ["/services", "/services/web"],
  ["/services/fullstack", "/services/web"],
  ["/services/cloud", "/services/web"],
  ["/services/hardware", "/contact"],
  ["/services/ai", "/contact"],
  ["/en/services", "/en/services/web"],
  ["/en/services/fullstack", "/en/services/web"],
  ["/en/services/cloud", "/en/services/web"],
  ["/en/services/hardware", "/en/contact"],
  ["/en/services/ai", "/en/contact"],
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
