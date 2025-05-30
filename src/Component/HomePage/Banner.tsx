import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { RecentArticleDataType } from "@/types/RecentArticle";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dynamic from "next/dynamic";
import { MobileArticleType } from "@/types/mobiles";
import { BrandTypes } from "@/types/category";
import { Box } from "@mui/material";
import CommonAutoAds from "../GoogleAds/CommonAutoAds";

const ContentBox = React.memo(
  dynamic(() => import("@/Component/HomePage/ContentBox"), {
    ssr: true,
  })
);
const PhoneFinder = React.memo(
  dynamic(() => import("../Common/PhoneFinder"), { ssr: true })
);
const MobileReviews = React.memo(
  dynamic(() => import("./Component/MobileReviews"), {
    ssr: true,
  })
);
const TopDevicesTable = React.memo(
  dynamic(() => import("./Component/TopDevicesTable"), {
    ssr: true,
  })
);
const LatestDevices = React.memo(
  dynamic(() => import("./Component/LatestDevices"), {
    ssr: true,
  })
);
const PopularMobiles = React.memo(
  dynamic(() => import("./Component/PopularMobiles"), {
    ssr: true,
  })
);
const NewsAndReviews = React.memo(
  dynamic(() => import("./Component/NewsAndReviews"), {
    ssr: true,
  })
);
const BrandDisplayComponent = React.memo(
  dynamic(() => import("./BrandDisplay"), { ssr: true })
);

export default async function Banner({
  articles,
  user,
  apple,
  samsungData,
  google,
  lastUpdate,
  serverBrand,
  mobileReviews,
  MobileArticles,
  MobileNewsAndReviews,
}: {
  articles: RecentArticleDataType[];
  mobileReviews: RecentArticleDataType[];
  MobileArticles: RecentArticleDataType[];
  apple: MobileArticleType[];
  samsungData: MobileArticleType[];
  google: MobileArticleType[];
  lastUpdate: MobileArticleType[];
  serverBrand: BrandTypes[];
  MobileNewsAndReviews: RecentArticleDataType[];
  user: any;
}) {
  return (
    <Grid sx={{ mt: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper
          className="lg:max-w-[1000px] mx-auto"
          sx={{ p: 2, mb: 2 }}
          elevation={0}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: 25, fontWeight: 600, mb: 1 }}
          >
            Latest Articles
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6.5}>
              <ContentBox
                category={articles[0]?.category}
                image={articles[0]?.image}
                route={articles[0]?.route}
                title={articles[0]?.title}
                description={articles[0]?.description}
                isBig
              />
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={12}>
                  <ContentBox
                    category={articles[1]?.category}
                    image={articles[1]?.image}
                    route={articles[1]?.route}
                    title={articles[1]?.title}
                    description={articles[1]?.description}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ContentBox
                    category={articles[2]?.category}
                    image={articles[2]?.image}
                    title={articles[2]?.title}
                    route={articles[2]?.route}
                    description={articles[2]?.description}
                    tooSmall
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ContentBox
                    category={articles[3]?.category}
                    image={articles[3]?.image}
                    title={articles[3]?.title}
                    route={articles[3]?.route}
                    description={articles[3]?.description}
                    tooSmall
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ py: 4 }} container>
            <Grid
              sx={{
                borderRight: "1px solid lightgray",
                pr: 1,
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <PhoneFinder />

              <Typography className="text-end text-gray-400 mt-1 text-xs">
                ADVERTISEMENT
              </Typography>
              <CommonAutoAds adSlot="1652287191" />

              <MobileReviews
                isGap
                isTrending
                mobilesArticles={MobileArticles}
              />
              <TopDevicesTable />
              <LatestDevices />
              <Box
                sx={{
                  position: "sticky", // Make the left side sticky
                  top: 0, // Stick to the top of the viewport
                  alignSelf: "flex-start", // Ensures alignment inside the parent container
                  overflow: "hidden",
                }}
              >
                <Typography className="text-end text-gray-400 mt-1 text-xs">
                  ADVERTISEMENT
                </Typography>
                <CommonAutoAds adFormat="vertical" adSlot="9568906860" />
              
              </Box>
            </Grid>
            <Grid item sx={{ pl: 1 }} xs={12} sm={6} md={8}>
            <Box sx={{
              display:{
                xs: "block",
                sm: "none",
              }
            }}>
            <Typography className="text-end text-gray-400 mt-1 text-xs">
                ADVERTISEMENT
              </Typography>
              <CommonAutoAds adSlot="1652287191" />
            </Box>
              
              <MobileReviews mobilesArticles={mobileReviews} />
              <PopularMobiles
                apple={apple}
                samsungData={samsungData}
                google={google}
                lastUpdate={lastUpdate}
                user={user}
              />
              <Grid gap={1} container>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: 25,
                    mt: 2,
                    width: "100%",
                    fontWeight: 600,
                  }}
                >
                  <Link aria-label="Brands" href={"/brands"}>
                    Mobile Brands
                  </Link>
                </Typography>

                <BrandDisplayComponent brands={serverBrand} />
                 
                <Grid display={"flex"} justifyContent={"end"} xs={12}>
                  <Link aria-label="Brands" href={"/brands"}>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#0a76d9",
                        ":hover": { textDecoration: "underline" },
                      }}
                    >
                      List Of Brands{" "}
                      <KeyboardArrowRightIcon sx={{ fontSize: 14 }} />
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
              <NewsAndReviews mobilesArticles={MobileNewsAndReviews} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
}
