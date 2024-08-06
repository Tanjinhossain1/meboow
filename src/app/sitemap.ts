import { MetadataRoute } from 'next'
 
export default async function sitemap({res}:any): Promise<MetadataRoute.Sitemap> {
  res.setHeader('Content-Type', 'text/xml');

  return [
    {
      url: `${process.env.NEXT_APP_SITEMAP_URL}/aboutus`,

    }, 
  ]
}

