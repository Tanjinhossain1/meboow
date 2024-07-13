import React, { Fragment } from "react";
import TopMobileDetails from "./_components/TopDetail";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import { fetchMobileArticleDetails } from "@/services/articleServices";
import BottomMobileDetails from "./_components/BottomDetails";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  console.log('mobileArticles mobilesss ',mobileArticles)
  return (
    <Fragment>
      <Navbar />
      {
        mobileArticles.data[0] ? 
        <TopMobileDetails mobileArticles={mobileArticles.data[0]} />
      :null}
      {
        mobileArticles.data[0] ? 
        <BottomMobileDetails mobileArticles={mobileArticles.data[0]} />
      :null}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
