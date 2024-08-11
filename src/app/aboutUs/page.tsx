import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import AboutUsComponent from "./_components/AboutUsComponent";
import Footer from "@/Component/HomePage/Footer";

export default function AboutUs() {
  return (
    <Fragment>
      <Navbar />
      <AboutUsComponent />
      <Footer />
    </Fragment>
  );
}
