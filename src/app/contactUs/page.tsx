import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";

export const metadata = {
  title: "Contact Us - Safari List",
  description:
    "Contact with us and here have all information to Contact Us. you can email, call, whatsapp, facebook or linkedin etc we have .",
  keywords: [
    "Contact Us",
    "Safari List",
    "email",
    "whatsapp",
    "facebook",
    "linkedin",
    "Contact Us",
    "services",
    "products",
    "phones",
    "articles",
  ],
  openGraph: {
    title: "Contact Us - Safari List",
    description:
      "Contact with us and here have all information to Contact Us. you can email, call, whatsapp, facebook or linkedin etc we have.",
    url: "https://safarilist.com/contactUs",
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Safari List",
    description:
      "Contact with us and here have all information to Contact Us. you can email, call, whatsapp, facebook or linkedin etc we have.",
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: "https://safarilist.com/contactUs",
  },
};

export default function ContactUs() {
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
          <Paper
            className="md:max-w-[1000px] mx-auto"
            sx={{ textAlign: "center", p: 5 }}
            elevation={2}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/customer-service.png"
                alt="customer service"
                width={350}
                height={350}
              />
            </Box>
            <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
              Contact us
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
              We value your feedback, questions, and suggestions. Reach out to
              us through any of the following channels:
            </Typography>
            <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
              You can also call or email us
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
              Every day from 10:00 AM to 8:00 PM
            </Typography>
            <Grid container>
              <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  <CallIcon sx={{ color: "#a3007d", fontSize: 24 }} /> Call us
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: 15, color: "#ab659b" }}
                >
                  +8801861557343
                </Typography>
              </Grid>

              <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  <LocationOnIcon sx={{ color: "#a3007d", fontSize: 24 }} />{" "}
                  Address
                </Typography>
                <Typography variant="h6" component="div" sx={{ fontSize: 15 }}>
                  2 No Dhakessori, modinabag, chairman office, Narayanganj,
                  Dhaka
                </Typography>
              </Grid>

              <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600, textAlign: "center" }}
                  >
                    <EmailIcon sx={{ color: "#a3007d", fontSize: 24 }} /> Email
                    Us
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: 15, color: "#ab659b" }}
                  >
                    safarilistofficial@gmail.com
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Container>
      <Footer />
    </Grid>
  );
}
