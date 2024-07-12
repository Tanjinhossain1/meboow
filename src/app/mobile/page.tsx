import React, { Fragment } from "react";
import TopMobileDetails from "./_components/TopDetail";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";

const ProductDetails = () => {
  return (
    <Fragment>
        <Navbar />
        <TopMobileDetails />
        <Footer />
    </Fragment>
  );
};

export default ProductDetails;
