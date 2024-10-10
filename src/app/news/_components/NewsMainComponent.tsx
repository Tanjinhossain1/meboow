import PhoneFinder from "@/Component/Common/PhoneFinder";
import BrandDisplayComponent from "@/Component/HomePage/BrandDisplay";
import Categories from "@/Component/HomePage/Component/Categories";
import LatestDevices from "@/Component/HomePage/Component/LatestDevices";
import MobileReviews from "@/Component/HomePage/Component/MobileReviews";
import NewsAndReviews from "@/Component/HomePage/Component/NewsAndReviews";
import TopDevicesTable from "@/Component/HomePage/Component/TopDevicesTable";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CategoryTypes } from "@/types/category";
import { MobileArticleType } from "@/types/mobiles";
import BestArticles from "./BestReviews";
import ContentBox from "@/Component/HomePage/ContentBox";

export default function NewsMainComponent({
  articles,
  mobilesArticles,
  category,
  latestArticles,
  latestDeviceMobiles,
  newsAndReviews,
  bestReviewsArticles,
}: {
  articles: RecentArticleDataType[];
  mobilesArticles: RecentArticleDataType[];
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  latestDeviceMobiles: MobileArticleType[];
  newsAndReviews: RecentArticleDataType[];
  bestReviewsArticles: RecentArticleDataType[];
}) {
  return (
    <>
      <Grid container>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
        <Grid xs={12} md={10} lg={9.8} xl={8}>
          <Paper
            className="md:max-w-[1000px] mx-auto"
            sx={{ p: 2, mb: 2, mt: 2 }}
            elevation={0}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6.5}>
                <ContentBox
                  category={articles[0]?.category}
                  image={articles[0]?.image}
                  title={articles[0]?.title}
                  route={articles[0]?.route}
                  description={articles[0]?.description}
                  isBig
                />
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <ContentBox
                      category={articles[1]?.category}
                      image={articles[1]?.image}
                      title={articles[1]?.title}
                      route={articles[1]?.route}
                      description={articles[1]?.description}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <ContentBox
                      category={articles[1]?.category}
                      image={articles[1]?.image}
                      title={articles[1]?.title}
                      route={articles[1]?.route}
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
            <Grid sx={{ mt: 4 }} container>
              {/* left  */}
              <Grid xs={12} sm={6} md={4}>
                <PhoneFinder />
                <LatestDevices mobiles={latestDeviceMobiles?.slice(0, 6)} />
                <MobileReviews isTrending mobilesArticles={latestArticles} />
                <TopDevicesTable />
              </Grid>
              {/* right  */}
              <Grid sx={{ pl: 2 }} xs={12} sm={6} md={8}>
                <MobileReviews mobilesArticles={mobilesArticles} />
                <BestArticles bestArticles={bestReviewsArticles} />
                <Categories category={category} />
                <NewsAndReviews mobilesArticles={newsAndReviews} />
                {/* mobilesArticles={newsAndReviews} /> */}
                <Grid gap={1} container>
                  <Typography
                    component={"a"}
                    href="/brands"
                    sx={{
                      mb: 1,
                      fontSize: 25,
                      mt: 2,
                      width: "100%",
                      fontWeight: 600,
                    }}
                  >
                    Mobile Brands
                  </Typography>

                  <BrandDisplayComponent isSelfFetch />
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
    </>
  );
}
