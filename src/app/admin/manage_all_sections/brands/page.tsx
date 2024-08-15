import Navbar from '@/Component/Shared/Navbar';
import { fetchBrands } from '@/services/articleServices';
import React from 'react';
import MainBrandsList from './_components/MainMobilelist';
 
export default async function Page() {
  const brands = await fetchBrands()
  return (
    <>
    <Navbar />
     <MainBrandsList brands={brands.data} />
    </>
  );
}
