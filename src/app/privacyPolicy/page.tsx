
import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";


export const metadata = {
  title: "Privacy Policy - Safari List",
  description:
    "IN Safari List Privacy Policy page you can see all of our site rules and policies in the privacy policy section of the privacy policy.",
  keywords: [
    "Privacy Policy",
    "Safari List", 
    "page"
  ],
  openGraph: {
    title: "Privacy Policy - Safari List",
    description:
      "IN Safari List Privacy Policy page you can see all of our site rules and policies in the privacy policy section of the privacy policy.",
    url: `${process.env.NEXT_PUBLIC_META_URL}/privacyPolicy`,
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Safari List",
    description:
      "IN Safari List Privacy Policy page you can see all of our site rules and policies in the privacy policy section of the privacy policy.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/privacyPolicy`,
  },
};

export default function AboutUs() { 
  return (
    <Grid container>
      <Navbar />
      <Container
        sx={{
          width: {
            xs: "100%", // 80% width on extra-small screens
            sm: "100%", // 70% width on small screens
            md: "100%", // 60% width on medium screens
            lg: "100%", // 50% width on large screens
            xl: "100%", // 40% width on extra-large screens
          },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container sx={{mt:4}}>
           
          <Paper  className="md:max-w-[1000px] mx-auto" sx={{ textAlign: "center", p: 5 }} elevation={2}>
            <Image
              src="/compliant.png"
              alt="complaint"
              width={350}
              height={350}
            />
            <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
            Privacy Policy
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: 16,
                fontWeight: 500,
                width: "60%",
                mx: "auto",
              }}
            >
              In order for the website to provide a safe and useful service, it is important for Sell Safari to collect, use, and share personal information.


            </Typography> 
          </Paper>
        </Container>
      </Container>
     <Footer />
    </Grid>
  );
}
