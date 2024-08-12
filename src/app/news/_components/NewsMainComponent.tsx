"use client";
import PhoneFinder from "@/Component/Common/PhoneFinder";
import { ContentBox, SampleBrands } from "@/Component/HomePage/Banner";
import BrandDisplayComponent from "@/Component/HomePage/BrandDisplay";
import Categories from "@/Component/HomePage/Component/Categories";
import LatestDevices from "@/Component/HomePage/Component/LatestDevices";
import MobileReviews from "@/Component/HomePage/Component/MobileReviews";
import NewsAndReviews from "@/Component/HomePage/Component/NewsAndReviews";
import PopularMobiles from "@/Component/HomePage/Component/PopularMobiles";
import TopDevicesTable from "@/Component/HomePage/Component/TopDevicesTable";
import DisplayArticleComponent from "@/Component/HomePage/DisplayArticleComponent";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { MobileArticleType } from "@/types/mobiles";
import BestArticles from "./BestReviews";

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
console.log('bestReviewsArticles  ',bestReviewsArticles)
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
                  page={page}
                  limit={limit}
                  category={articles[0]?.category}
                  id={articles[0]?.id}
                  history={history}
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
                      page={page}
                      limit={limit}
                      category={articles[1]?.category}
                      id={articles[1]?.id}
                      history={history}
                      image={articles[1]?.image}
                      title={articles[1]?.title}
                      description={articles[1]?.description}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <ContentBox
                      page={page}
                      limit={limit}
                      category={articles[1]?.category}
                      id={articles[1]?.id}
                      history={history}
                      image={articles[1]?.image}
                      title={articles[1]?.title}
                      description={articles[1]?.description}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <ContentBox
                      page={page}
                      limit={limit}
                      category={articles[2]?.category}
                      id={articles[2]?.id}
                      history={history}
                      image={articles[2]?.image}
                      title={articles[2]?.title}
                      description={articles[2]?.description}
                      tooSmall
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <ContentBox
                      page={page}
                      limit={limit}
                      category={articles[3]?.category}
                      id={articles[3]?.id}
                      history={history}
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
              <Grid xs={12} sm={6} md={4}>
                <PhoneFinder brands={SampleBrands} />
              </Grid>
              <Grid sx={{ pl: 2 }} xs={12} sm={6} md={8}>
                <MobileReviews mobilesArticles={mobilesArticles} />
              </Grid>
            </Grid>

            <Grid sx={{ mb: 4 }} container>
              <Grid item xs={12} sm={6} md={4}>
                <LatestDevices mobiles={latestDeviceMobiles} />
                <MobileReviews isTrending mobilesArticles={latestArticles} />
              </Grid>
              <Grid item sx={{ pl: 2, height: "350px" }} xs={12} sm={6} md={8}>
                {/* <PopularMobiles user={user} articles={mobileArticles} /> */}
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

                  <BrandDisplayComponent brands={brands} />
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

            <Grid sx={{ my: 4 }} container>
              <Grid xs={12} sm={6} md={4}>
                <TopDevicesTable
                  byFans={byFansMobiles}
                  dailyInterest={dailyInterestMobiles}
                />
              </Grid>
                {/* <Grid sx={{ pl: 2, mt: 2 }} xs={12} sm={6} md={8}>
                  <NewsAndReviews mobilesArticles={newsAndReviews} />
                </Grid> */}
              {/* <Grid sx={{ pl: 2, mt: 2 }} xs={12} sm={6} md={8}>
                <NewsAndReviews mobilesArticles={newsAndReviews} />
              </Grid> */}
            </Grid>
            {/* <Grid container>
              <Grid xs={12} md={10}>
                <Grid container>
                  {articles &&
                    articles?.map((data: RecentArticleDataType) => {
                      console.log(data);
                      return (
                        <Fragment key={data.id}>
                          <DisplayArticleComponent asSmall data={data} />
                        </Fragment>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>

            <Grid sx={{ mt: 3 }} container>
              <Grid xs={1}></Grid>
              <Grid xs={10} sm={4}>
                {isHideLoadMore ? null : (
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#1976d2", // Border color
                      color: "#1976d2", // Text color
                      padding: "10px 20px",
                      fontSize: "16px",
                      width: "100%",
                      textTransform: "none",
                      transition:
                        "border-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out",
                      "&:hover": {
                        borderColor: "#115293", // Darker shade for hover
                        color: "#115293",
                        transform: "scale(1.05)",
                      },
                      "&:active": {
                        borderColor: "#4791db", // Lighter shade for active
                        color: "#4791db",
                        transform: "scale(0.95)",
                      },
                    }}
                    onClick={loadMoreArticles}
                  >
                    Load More
                  </Button>
                )}
              </Grid>
              <Grid xs={1}></Grid>
            </Grid> */}
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
    </>
  );
}
