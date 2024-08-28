// src/app/api/all-sitemap-files/sitemap-index/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-core.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-article.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-mobiles.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-brands.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-category.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-feature.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-review.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
      <loc>${process.env.NEXT_APP_SITEMAP_URL}/sitemap-network-bands.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  </sitemapindex>`;

  return new NextResponse(sitemapIndexXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
