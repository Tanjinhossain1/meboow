import React from 'react';
import { fetchArticles, fetchMobileArticles } from '@/services/articleServices';
import Navbar from '@/Component/Shared/Navbar';
import MainMobilesDetailList from './_components/MainMobilelist';
 
export default async function Page() {
  const Mobiles = await fetchMobileArticles({is_all_mobile:true})
  return (
    <>
    <Navbar />
     <MainMobilesDetailList mobile={Mobiles.data} />
    </>
  );
}
