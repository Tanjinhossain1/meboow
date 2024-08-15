import Navbar from '@/Component/Shared/Navbar';
import {  fetchCategories } from '@/services/articleServices';
import React from 'react';
import MainBrandsList from './_components/MainMobilelist';
 
export default async function Page() {
  const category = await fetchCategories()
  return (
    <>
    <Navbar />
     <MainBrandsList category={category.data} />
    </>
  );
}
