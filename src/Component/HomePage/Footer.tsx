import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Container,
  Box,
  IconButton,
} from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Facebook as FacebookIcon,
  Pinterest as PinterestIcon,
  LinkedIn as LinkedInIcon,
  // Tumblr as TumblrIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  Reddit as RedditIcon,
  // TikTok as TikTokIcon
} from "@mui/icons-material";
import Image from "next/image";

export default async function Footer() {
  const newsAndReviews = await fetchArticles({ limit: "10" });

  const mobileArticles = await fetchMobileArticles({ limit: "10" });
  return (
    <Grid container>
      <Grid className="md:max-w-[1000px] mx-auto" xs={12}>
        <Box sx={{ backgroundColor: "#1A2C41", color: "#fff", p: 4 }}>
          <Grid container spacing={4}>
            {/* Recently Added Mobiles */}
            <Grid item xs={12} sm={5.8}>
              <Typography variant="h6" gutterBottom>
                Recently Added Mobiles:
              </Typography>
              <Grid
                gap={1}
                container
                style={{ listStyleType: "none", padding: 0 }}
              >
                {mobileArticles?.data &&
                  mobileArticles?.data?.map((item, index) => (
                    <Grid xs={5.5} key={index}>
                      <Typography
                        component="a"
                        href={`/mobile/detail/${item.id}`}
                        className="overflow-hidden text-ellipsis line-clamp-1 hover:text-red-500"
                        sx={{
                          color: "#fff",
                          m: 0,
                          p: 0,
                          fontSize: 13,
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        <KeyboardArrowRightIcon sx={{ fontSize: 11 }} />{" "}
                        {item.title}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={0.4}>
              <Divider
                orientation="vertical"
                sx={{
                  borderColor: "#fff",
                  height: "100%",
                  mx: "auto",
                  opacity: 0.5,
                }}
              />
            </Grid>
            {/* Recently Added Articles */}
            <Grid item xs={12} sm={5.8}>
              <Typography variant="h6" gutterBottom>
                Recently Added Articles:
              </Typography>
              <Grid
                gap={1}
                container
                style={{ listStyleType: "none", padding: 0 }}
              >
                {newsAndReviews?.data &&
                  newsAndReviews?.data?.map((item, index) => (
                    <Grid xs={5.5} key={index}>
                      <Typography
                        className="overflow-hidden text-ellipsis line-clamp-1"
                        component="a"
                        href={`/details/${item?.id}/${
                          item.category
                        }?${new URLSearchParams({
                          page: `2`,
                          limit: "3",
                        })}`}
                        sx={{
                          color: "#fff",
                          m: 0,
                          p: 0,
                          textDecoration: "none",
                          fontSize: 13,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        <KeyboardArrowRightIcon sx={{ fontSize: 11 }} />{" "}
                        {item.title}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Footer Text */}
          <Typography
            className="md:max-w-[1000px] mx-auto"
            sx={{ mt: 4, textAlign: "center" }}
          >
            <Link
              href="https://www.safarilist.com"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
                // "&:hover": { textDecoration: "underline" },
              }}
            >
              www.safarilist.com
            </Link>{" "}
            is one of the biggest tech news, reviews, price, advice platforms.
            We cover all categories in tech like Mobiles, TVs, Laptops, Cameras,
            Audio, tech news etc. We help our users to follow the latest in tech
            and gadget and news to the world.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1A202C",
            color: "#FFFFFF",
            padding: 2,
            // position: "absolute",
            width: "100%",
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    "&:hover": { textDecoration: "underline" },
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                    href="/contactUs"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Contact us
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    "&:hover": { textDecoration: "underline" },
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                    href="/aboutus"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    About us
                  </Link>
                </Typography>
                {/* <Typography
                  sx={{
                    fontSize: 12,
                    "&:hover": { textDecoration: "underline" },
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                    href="#"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Purpose
                  </Link>
                </Typography> */}
                {/* <Typography
                  sx={{
                    fontSize: 12,
                    "&:hover": { textDecoration: "underline" },
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                    href="#"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Advertise
                  </Link>
                </Typography> */}
                <Typography
                  sx={{
                    fontSize: 12,
                    "&:hover": { textDecoration: "underline" },
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                    href="/privacyPolicy"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Privacy
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    "&:hover": { textDecoration: "underline" },
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                    href="/termCondition"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Terms
                  </Link>
                </Typography>
                <Typography sx={{ "&:hover": { textDecoration: "underline" } }}>
                  <Link
                    href="/faq"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    FAQ
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid xs={3}></Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <Grid container>
                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <FacebookIcon />
                    </IconButton>
                  </Grid>

                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <LinkedInIcon />
                    </IconButton>
                  </Grid>

                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <TwitterIcon />
                    </IconButton>
                  </Grid>

                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <YouTubeIcon />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <InstagramIcon />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <WhatsAppIcon />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <TelegramIcon />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton component="a" href="#" sx={{ color: "white" }}>
                      <RedditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "#fff", opacity: 0.5 }} />
          </Grid>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              container
            >
              <Grid xs={5}>
                <Image
                  alt="logo"
                  width={180}
                  height={10}
                  src="/app-logo/3.png"
                />
              </Grid>
              <Grid xs={5}>
                <Typography variant="body2">
                  &copy; MHT Digital Media Private Limited
                </Typography>
              </Grid>
              <Grid xs={2}>
                <Typography variant="body2">
                  Made with{" "}
                  <span role="img" aria-label="love">
                    ❤️
                  </span>{" "}
                  in
                </Typography>
              </Grid>
            </Grid>
            {/* <img
              src="/path-to-bangladesh-flag.png"
              alt="Bangladesh Flag"
              style={{ width: 24, height: 24, marginLeft: 4 }}
            /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
