import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { Fragment } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AboutUsComponent() {
  return (
    <Fragment>
      <Grid container>
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
            <Container className="md:max-w-[1000px] mx-auto" sx={{ width: "100%", bgcolor: "#eb94d7", p: 1 }}>
              <ArrowBackIcon sx={{ fontSize: 30, color: "whitesmoke" }} />
            </Container>
            <Paper className="md:max-w-[1000px] mx-auto" sx={{ p: 5 }} elevation={2}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Image src="/ask.png" alt="" width={350} height={350} />
              </Box>
              <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
                About Sell Safari
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 16,
                  fontWeight: 500,
                  width: "60%",
                }}
              >
                At Safari List, our mission is to connect you with the world
                through comprehensive and reliable information. We are dedicated
                to bringing you the latest news, insightful articles, and
                engaging content across a variety of interests.
              </Typography>
              <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
                Our Vision:
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 16,
                  fontWeight: 500,
                  width: "60%",
                }}
              >
                To be the go-to platform for individuals seeking quality
                information and enriching their knowledge on diverse subjects.
              </Typography>
              <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
                Our Team:
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 16,
                  fontWeight: 500,
                  width: "60%",
                }}
              >
                Our team comprises passionate writers, editors, and industry
                experts who are committed to delivering accurate and
                thought-provoking content. We work tirelessly to ensure that
                Safari List remains a trusted source of information for our
                readers.
              </Typography>
              <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
                Why Safari List?
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 16,
                  fontWeight: 500,
                  width: "60%",
                }}
              >
                Quality Content: We prioritize high-quality, well-researched
                articles. User-Centric Approach: Our platform is designed with
                you in mind, offering a seamless and enjoyable reading
                experience. Diverse Perspectives: We provide a broad spectrum of
                viewpoints to cater to our diverse audience.
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: 16,
                  fontWeight: 500,
                  width: "60%",
                }}
              >
                Thank you for choosing Safari List as your information partner.
                Together, we can explore the vast landscape of knowledge.
              </Typography>
            </Paper>
          </Container>
        </Container>
      </Grid>
    </Fragment>
  );
}
