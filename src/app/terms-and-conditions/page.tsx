import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";


export const metadata = {
  title: 'Term Condition - Safari List',
  description: 'Learn more about our Term Condition - Safari List page to see our all conditions',
  keywords: ['Term Condition', 'Safari List', 'company', 'mission', 'values', 'services'],
  openGraph: {
    title: 'Term Condition - Safari List',
    description: 'Learn more about our Term Condition - Safari List page to see our all conditions',
    url: `${process.env.NEXT_PUBLIC_META_URL}/terms-and-conditions`,
    siteName: 'Safari List',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Term Condition - Safari List',
    description: 'Learn more about our Term Condition - Safari List page to see our all conditions',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/terms-and-conditions`,
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
        <Container sx={{ mt: 4 }}>
          <Paper sx={{ textAlign: "center", p: 5 }} elevation={2}>
            <Image src="/negotiation.png" alt="negotiation" width={350} height={350} />
            <Typography component={'h1'} sx={{ fontSize: 25, fontWeight: 600 }}>
              Terms & Conditions
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: 16,
                fontWeight: 500,
                width: "80%",
                mx: "auto",
              }}
              component={'h2'}
            >

              Sell Safari is a article provided by Saltside Technologies AB
              (subject to your compliance with the Terms and Conditions set
              forth below). Please read these Terms and Conditions before using
              this platform.
            </Typography>
          </Paper>
        </Container>
      </Container>
      <Footer />
    </Grid>
  );
}
