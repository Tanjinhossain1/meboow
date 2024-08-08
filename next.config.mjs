/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com','assets.mspimages.in',"localhost","images.safarilist.com"],
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
      ];
    },
  
  };
  
export default nextConfig;
