import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import BrandDisplayComponent from "./BrandDisplay";
import { MobileArticleType } from "@/types/mobiles";
import PhoneFinder from "../Common/PhoneFinder";
import MobileReviews from "./Component/MobileReviews";
import PopularMobiles from "./Component/PopularMobiles";
import NewsAndReviews from "./Component/NewsAndReviews";
import TopDevicesTable from "./Component/TopDevicesTable";
import LatestDevices from "./Component/LatestDevices";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ContentBox, SampleBrands } from "./ContentBox";
import { BrandTypes } from "@/types/category";

export default async function Banner({
  articles,
  latestArticles,
  brands,
  // totalBrands,
  AppleMobiles,
  user,
  mobilesArticles,
  newsAndReviews,
  dailyInterestMobiles,
  byFansMobiles,
  latestDeviceMobiles,
  googleMobiles,
  SamsungMobiles,
  LastUpdatedMobiles,
}: {
  articles: RecentArticleDataType[];
  mobilesArticles: RecentArticleDataType[];
  latestArticles: RecentArticleDataType[];
  newsAndReviews: RecentArticleDataType[];
  brands: BrandTypes[];
  // totalBrands: BrandTypes[];
  AppleMobiles: MobileArticleType[];
  dailyInterestMobiles: MobileArticleType[];
  byFansMobiles: MobileArticleType[];
  latestDeviceMobiles: MobileArticleType[];
  googleMobiles: MobileArticleType[];
  SamsungMobiles: MobileArticleType[];
  LastUpdatedMobiles: MobileArticleType[];
  user: any;
}) {
  // const [brands] = await Promise.all([totalBrands]);
   
  return (
    <Grid sx={{ mt: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper
          className="lg:max-w-[1000px] mx-auto"
          sx={{ p: 2, mb: 2, bgcolor: "white" }}
          elevation={0}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: 25, fontWeight: 600, mb: 1 }}
          >
            Latest Article
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6.5}>
              <ContentBox
                category={articles[0]?.category}
                image={articles[0]?.image}
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
                    title={articles[1]?.title}
                    description={articles[1]?.description}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ContentBox
                    category={articles[2]?.category}
                    image={articles[2]?.image}
                    title={articles[2]?.title}
                    description={articles[2]?.description}
                    tooSmall
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ContentBox
                    category={articles[3]?.category}
                    image={articles[3]?.image}
                    title={articles[3]?.title}
                    description={articles[3]?.description}
                    tooSmall
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ py: 4 }} container>
            <Grid
              sx={{ borderRight: "1px solid lightgray", pr: 1 }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <PhoneFinder brands={SampleBrands} />
              <MobileReviews
                isGap
                isTrending
                mobilesArticles={latestArticles}
              />
              <TopDevicesTable
                byFans={byFansMobiles}
                dailyInterest={dailyInterestMobiles}
              />
              <LatestDevices mobiles={latestDeviceMobiles} />
            </Grid>
            <Grid item sx={{ pl: 1 }} xs={12} sm={6} md={8}>
              {mobilesArticles ? (
                mobilesArticles[0] ? (
                  <MobileReviews mobilesArticles={mobilesArticles} />
                ) : null
              ) : null}

              <PopularMobiles
                LastUpdatedMobiles={LastUpdatedMobiles}
                SamsungMobiles={SamsungMobiles}
                googleMobiles={googleMobiles}
                user={user}
                articles={AppleMobiles}
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
                  <Link href={"/brands"}>Mobile Brands</Link>
                </Typography>

                <BrandDisplayComponent brands={brands.slice(0, 10)} />
                <Grid display={"flex"} justifyContent={"end"} xs={12}>
                  <Link href={"/brands"}>
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
              <NewsAndReviews mobilesArticles={newsAndReviews} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
}
