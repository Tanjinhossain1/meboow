/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // domains: ['res.cloudinary.com','assets.mspimages.in',"localhost","images.safarilist.com"],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'assets.mspimages.in',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'images.safarilist.com',
        },
      ],
  
    }, 
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap', // Exact path to your route
        },
        {
          source: '/sitemap-article.xml',
          destination: '/api/sitemap-article', // Exact path to your route
        },
        {
          source: '/sitemap-mobiles.xml',
          destination: '/api/sitemap-mobiles', // Exact path to your route
        },
        {
          source: '/sitemap-core.xml',
          destination: '/api/sitemap-core', // Exact path to your route
        },
        {
          source: '/sitemap-feature.xml',
          destination: '/api/sitemap-feature', // Exact path to your route
        },
        {
          source: '/sitemap-brands.xml',
          destination: '/api/sitemap-brands', // Exact path to your route
        },
        {
          source: '/sitemap-category.xml',
          destination: '/api/sitemap-category', // Exact path to your route
        },
      ];
    },
  
  };
  
export default nextConfig;
