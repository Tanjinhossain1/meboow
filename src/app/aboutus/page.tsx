import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import AboutUsComponent from "./_components/AboutUsComponent";

export const metadata = {
  title: 'About Us - Safari List',
  description: 'Learn more about our company, mission, and values at Safari List.',
  keywords: ['About Us', 'Safari List', 'company', 'mission', 'values', 'services'],
  openGraph: {
    title: 'About Us - Safari List',
    description: 'Learn more about our company, mission, and values at Safari List.',
    url: `${process.env.NEXT_PUBLIC_META_URL}/aboutus`,
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
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/aboutus`,
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
