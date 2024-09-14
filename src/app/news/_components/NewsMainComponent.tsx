"use client";
import PhoneFinder from "@/Component/Common/PhoneFinder";
import BrandDisplayComponent from "@/Component/HomePage/BrandDisplay";
import Categories from "@/Component/HomePage/Component/Categories";
import LatestDevices from "@/Component/HomePage/Component/LatestDevices";
import MobileReviews from "@/Component/HomePage/Component/MobileReviews";
import NewsAndReviews from "@/Component/HomePage/Component/NewsAndReviews";
import TopDevicesTable from "@/Component/HomePage/Component/TopDevicesTable";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { MobileArticleType } from "@/types/mobiles";
import BestArticles from "./BestReviews";
import ContentBox, { SampleBrands } from "@/Component/HomePage/ContentBox";

export default function NewsMainComponent({
  articles,
  total,
  mobilesArticles,
  brands,
  category,
  latestArticles,
  byFansMobiles,
  dailyInterestMobiles,
  latestDeviceMobiles,
  newsAndReviews,
  bestReviewsArticles,
}: {
  articles: RecentArticleDataType[];
  mobilesArticles: RecentArticleDataType[];
  total: number;
  brands: BrandTypes[];
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  byFansMobiles: MobileArticleType[];
  dailyInterestMobiles: MobileArticleType[];
  latestDeviceMobiles: MobileArticleType[];
  newsAndReviews: RecentArticleDataType[];
  bestReviewsArticles: RecentArticleDataType[];
}) {
  const params = useParams();
  const history = useRouter();
  const [isHideLoadMore, setIsHideLoadMore] = useState<boolean>(false);
  console.log("bestReviewsArticles  ", bestReviewsArticles);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";
  const search = searchParams.get("search") ?? "";

  // Function to load more articles
  const loadMoreArticles = async () => {
    history.push(
      `/news?${new URLSearchParams({
        page: page,
        limit: `${Number(limit) + 6}`,
      })}`,
      {
        scroll: false,
      }
    );
  };

  useEffect(() => {
    if (articles?.length === total) {
      setIsHideLoadMore(true);
    }
  }, [articles?.length, total]);

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
                      description={articles[1]?.description}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
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
            <Grid sx={{ mt: 4 }} container>
              {/* left  */}
              <Grid xs={12} sm={6} md={4}>
                <PhoneFinder brands={SampleBrands} />
                <LatestDevices mobiles={latestDeviceMobiles?.slice(0, 6)} />
                <MobileReviews isTrending mobilesArticles={latestArticles} />
                <TopDevicesTable
                  byFans={byFansMobiles}
                  dailyInterest={dailyInterestMobiles}
                />
              </Grid>
              {/* right  */}
              <Grid sx={{ pl: 2 }} xs={12} sm={6} md={8}>
                <MobileReviews mobilesArticles={mobilesArticles} />
                <BestArticles bestArticles={bestReviewsArticles} />
                <Categories category={category} />
                <NewsAndReviews mobilesArticles={newsAndReviews} />
                <Grid gap={1} container>
                  <Typography
                    sx={{
                      mb: 1,
                      // borderBottom: "2px solid lightgray",
                      fontSize: 25,
                      mt: 2,
                      width: "100%",
                      fontWeight: 600,
                    }}
                    onClick={() => history.push("/brands")}
                    // onclick={()=>history.push('/brands')}
                  >
                    Mobile Brands
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
    </>
  );
}
