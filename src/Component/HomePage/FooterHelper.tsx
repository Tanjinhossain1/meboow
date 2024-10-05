import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import Image from "next/image";
import { formatForUrl } from "@/utils/utils";
import DesktopViewToggle from "@/components/DesktopViewToggle";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { MobileArticleType } from "@/types/mobiles";

export default function FooterHelper({
  newsAndReviews,
  mobileArticles,
}: {
  newsAndReviews: RecentArticleDataType[];
  mobileArticles: MobileArticleType[];
}) {
  return (
    <Grid container>
      <Grid className="md:max-w-[1000px] mx-auto">
        <Box sx={{ backgroundColor: "#1A2C41", color: "#fff", p: 4 }}>
          <Grid container spacing={4}>
            {/* Recently Added Mobiles */}
            <Grid item xs={12} sm={5.8}>
              <Typography variant="h2" sx={{ fontSize: 20 }} gutterBottom>
                Recently Added Mobiles:
              </Typography>
              <Grid
                gap={1}
                container
                style={{ listStyleType: "none", padding: 0 }}
              >
                {mobileArticles &&
                  mobileArticles?.map((item, index) => (
                    <Grid xs={5.5} key={index}>
                      <Typography
                        component="a"
                        href={`/mobile/${formatForUrl(item?.title)}`}
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
              <Typography  gutterBottom>
                Recently Added Articles:
              </Typography>
              <Grid
                gap={1}
                container
                style={{ listStyleType: "none", padding: 0 }}
              >
                {newsAndReviews &&
                  newsAndReviews?.map((item, index) => (
                    <Grid xs={5.5} key={index}>
                      <Typography
                        className="overflow-hidden text-ellipsis line-clamp-1"
                        component="a"
                        href={
                          item?.category === "Mobiles"
                            ? `/review/${formatForUrl(item?.route)}`
                            : `/article/${formatForUrl(item?.route)}`
                        }
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
            aria-label="Safari List"
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
        <DesktopViewToggle />
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
                  aria-label="Contact Us"
                    href="/contact"
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
                  aria-label="About us"
                    href="/about"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    About us
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
                  aria-label="Privacy Policy"
                    href="/privacy-policy"
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
                  aria-label="Terms And Conditions"
                    href="/terms-and-conditions"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Terms
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    "&:hover": { textDecoration: "underline" },
                    fontSize: 12,
                    pr: 1,
                    borderRight: "1px solid white",
                    mr: 1,
                  }}
                >
                  <Link
                  aria-label="faq"
                    href="/faq"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    FAQ
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <Link
                  aria-label="Site Map"
                    href="/sitemap.xml"
                    style={{ marginLeft: 1, marginRight: 1, color: "#FFFFFF" }}
                  >
                    Sitemap
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
                    <IconButton
                      aria-label="Facebook Icon"
                      component="a"
                      target="_blank"
                      href="https://www.facebook.com/profile.php?id=61562261948643"
                      sx={{ color: "white" }}
                    >
                      <FacebookIcon aria-label="Facebook" />
                    </IconButton>
                  </Grid>

                  {/* <Grid xs={3}>
                    <IconButton
                      aria-label="Linked In Icon"
                      component="a"
                      href="#"
                      sx={{ color: "white" }}
                    >
                      <LinkedInIcon aria-label="Link din" />
                    </IconButton>
                  </Grid> */}

                  <Grid xs={3}>
                    <IconButton
                      aria-label="Twitter Icon"
                      component="a"
                      href="https://x.com/safarilist"
                      target="_blank"
                      sx={{ color: "white" }}
                    >
                      <TwitterIcon aria-label="Twitter Icon" />
                    </IconButton>
                  </Grid>

                  <Grid xs={3}>
                    <IconButton
                      aria-label="You Tube Icon"
                      component="a"
                      href="https://youtube.com/@safarilist?si=7ZbK4JwsUgsAqKQH"
                      target="_blank"
                      sx={{ color: "white" }}
                    >
                      <YouTubeIcon aria-label="You Tube Icon" />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton
                      aria-label="INstagram Icon"
                      component="a"
                      href="#"
                      sx={{ color: "white" }}
                    >
                      <InstagramIcon aria-label="INstagram Icon" />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton
                      aria-label="Whats App Icon"
                      component="a"
                      href="#"
                      sx={{ color: "white" }}
                    >
                      <WhatsAppIcon aria-label="Whats App Icon" />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton
                      aria-label="Telegram Icon"
                      component="a"
                      href="#"
                      sx={{ color: "white" }}
                    >
                      <TelegramIcon aria-label="Telegram Icon" />
                    </IconButton>
                  </Grid>
                  <Grid xs={3}>
                    <IconButton
                      aria-label="Reddit Icon"
                      component="a"
                      href="#"
                      sx={{ color: "white" }}
                    >
                      <RedditIcon aria-label="Reddit Icon" />
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
                  loading="lazy"
                />
              </Grid>
              <Grid xs={5}>
                <Typography variant="body2">
                  &copy; MHT Digital Media Private Limited
                </Typography>
              </Grid>
              <Grid sx={{ display: "flex", gap: 1 }} xs={2}>
                <Typography variant="body2">
                  Made with{" "}
                  <span role="img" aria-label="love">
                    ❤️
                  </span>{" "}
                  in
                </Typography>
                <Image
                  alt="bangladesh-flag"
                  width={20}
                  height={20}
                  src={"/bangladesh-flag.png"}
                />
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
