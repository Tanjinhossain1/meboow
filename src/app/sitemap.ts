import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_APP_SITEMAP_URL}/aboutus`,

    }, 
  ]
}

