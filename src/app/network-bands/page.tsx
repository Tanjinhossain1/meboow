import React from 'react'
import MainComponent from './_components/MainComponent'
import Navbar from '@/Component/Shared/Navbar'
import Footer from '@/Component/HomePage/Footer'
import { fetchBrands, fetchMobileArticles } from '@/services/articleServices';

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
