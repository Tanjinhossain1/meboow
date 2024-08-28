import React from 'react'
import MainComponent from './_components/MainComponent'
import Navbar from '@/Component/Shared/Navbar'
import Footer from '@/Component/HomePage/Footer'
import { fetchBrands, fetchMobileArticles } from '@/services/articleServices';


export const metadata = {
  title: "Network Bands - Safari List",
  description:
    "In Safari List Network Bands page have list of network in country wise by default show your country network but you can change the country to see your Network Bands .",
  keywords: ["Network", "Safari List", "country", "Network Bands"],
  openGraph: {
    title: "Network Bands - Safari List",
    description:
      "In Safari List Network Bands page have list of network in country wise by default show your country network but you can change the country to see your Network Bands .",
    url: "https://safarilist.com/network-bands",
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Bands - Safari List",
    description:
      "In Safari List Network Bands page have list of network in country wise by default show your country network but you can change the country to see your Network Bands .",
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: "https://safarilist.com/network-bands",
  },
};


export default async function page() {
    const brands = await fetchBrands();
    const LatestDeviceMobiles = await fetchMobileArticles({
      limit: "10",
      is_latest_device: "YES",
    });
  return (
    <>
    <Navbar />
    <MainComponent latestDeviceMobiles={LatestDeviceMobiles.data} brands={brands.data} />
    <Footer />
    </>
  )
}
