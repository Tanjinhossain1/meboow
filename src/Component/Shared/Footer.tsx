"use client";
import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

export default function OtherPageFooter() {
  return (
    <Grid container>
      {/* <Grid xs={0} md={1} lg={1.1} xl={2}></Grid> */}
      <Grid xs={12}>
        <Paper sx={{ p: 5,backgroundColor:"#152133"}} elevation={2}>
          <Grid  sx={{width: {
            xs: "100%", // 80% width on extra-small screens
            sm: "100%", // 70% width on small screens
            md: "70%", // 60% width on medium screens
            lg: "70%", // 50% width on large screens
            xl: "50%", // 40% width on extra-large screens
          },mx:"auto"}} container>
            <Grid container>
              <Grid xs={12} sm={4} md={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Connect with us
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  <Link
                    style={{ color: "black" }}
                    target="_blank"
                    href={"https://www.facebook.com/iloveyou.tanjin"}
                  >
                    <FacebookIcon sx={{ fontSize: 30 }} />
                  </Link>

                  <Link
                    style={{ color: "black" }}
                    target="_blank"
                    href={"https://www.instagram.com/sktanjin/"}
                  >
                    <InstagramIcon sx={{ fontSize: 30, ml: 2 }} />
                  </Link>
                  <Link
                    style={{ color: "black" }}
                    target="_blank"
                    href={
                      "https://youtube.com/@developercode76?si=3zKRJ0Ts_beAoIGF"
                    }
                  >
                    <YouTubeIcon sx={{ fontSize: 30, ml: 2 }} />
                  </Link>
                </Typography>
              </Grid>

              <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Help & Support
                </Typography>

                <Typography variant="h6" component="div">
                  <Link style={{ color: "black",textDecoration:"none" }} href={"/contactUs"}>
                    {" "}
                    Contact us
                  </Link>
                </Typography>
              </Grid>

              <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  About Sell Safari
                </Typography>
                <Typography variant="h6" component="div">
                  <Link style={{ color: "black",textDecoration:"none" }} href={"/aboutUs"}>
                    {" "}
                    About Us
                  </Link>
                </Typography>

                <Typography variant="h6" component="div">
                  <Link style={{ color: "black",textDecoration:"none" }} href={"/termCondition"}>
                    {" "}
                    Terms & Conditions
                  </Link>
                </Typography>

                <Typography variant="h6" component="div">
                  <Link style={{ color: "black",textDecoration:"none" }} href={"/privacyPolicy"}>
                    {" "}
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Container sx={{ width: "100%", mt: 3 }}>
              <Divider />
            </Container>

            <Container
              sx={{
                width: "100%",
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>Copyright © Saltside Technologies</Typography>
              <Typography sx={{ fontWeight: 600, fontSize: 23 }}>
                Sell Safari
              </Typography>
            </Container>
          </Grid>
        </Paper>
      </Grid>
      {/* <Grid xs={0} md={1} lg={1.1} xl={2}></Grid> */}
    </Grid>
  );
}
