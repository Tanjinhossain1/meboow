import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import AboutUsComponent from "./_components/AboutUsComponent";
import Footer from "@/Component/HomePage/Footer";

export const metadata = {
  title: 'About Us - Safari List',
  description: 'Learn more about our company, mission, and values at Safari List.',
  keywords: ['About Us', 'Safari List', 'company', 'mission', 'values', 'services'],
  openGraph: {
    title: 'About Us - Safari List',
    description: 'Learn more about our company, mission, and values at Safari List.',
    url: 'https://safarilist.com/aboutus',
    siteName: 'Safari List',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Safari List',
    description: 'Learn more about our company, mission, and values at Safari List.',
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: 'https://safarilist.com/aboutus',
  },
};

export default async function AboutUs() {
  return (
    <Fragment>
      <Navbar />
      <AboutUsComponent />
      {/* <Footer /> */}
    </Fragment>
  );
}
