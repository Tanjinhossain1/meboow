import React, { Suspense } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { RecentArticleDataType } from "@/types/RecentArticle";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dynamic from "next/dynamic";
import { getAllArticles } from "@/lib/queries/services";

const ContentBox = React.memo(
  dynamic(() => import("@/Component/HomePage/ContentBox"), {
    ssr: true,
    suspense: true,
  })
);
const PhoneFinder = React.memo(
  dynamic(() => import("../Common/PhoneFinder"), { ssr: true, suspense: true })
);
const MobileReviews = React.memo(
  dynamic(() => import("./Component/MobileReviews"), {
    ssr: true,
    suspense: true,
  })
);
const TopDevicesTable = React.memo(
  dynamic(() => import("./Component/TopDevicesTable"), {
    ssr: true,
    suspense: true,
  })
);
const LatestDevices = React.memo(
  dynamic(() => import("./Component/LatestDevices"), {
    ssr: true,
    suspense: true,
  })
);
const PopularMobiles = React.memo(
  dynamic(() => import("./Component/PopularMobiles"), {
    ssr: true,
    suspense: true,
  })
);
const NewsAndReviews = React.memo(
  dynamic(() => import("./Component/NewsAndReviews"), {
    ssr: true,
    suspense: true,
  })
);
const BrandDisplayComponent = React.memo(
  dynamic(() => import("./BrandDisplay"), { ssr: true, suspense: true })
);

const Loading: any = <p className="text-[60px]">loading...</p>;

export default async function Banner({
  articles,
  user,
}: {
  articles: RecentArticleDataType[];
  user: any;
}) {
  const mobileReviews = await getAllArticles({
    limits: "20",
    category: "Mobiles",
  })
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
              <Suspense fallback={<Loading />}>
                <ContentBox
                  category={articles[0]?.category}
                  image={articles[0]?.image}
                  title={articles[0]?.title}
                  description={articles[0]?.description}
                  isBig
                />
              </Suspense>
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={12}>
                  <Suspense fallback={<Loading />}>
                    <ContentBox
                      category={articles[1]?.category}
                      image={articles[1]?.image}
                      title={articles[1]?.title}
                      description={articles[1]?.description}
                    />
                  </Suspense>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Suspense fallback={<Loading />}>
                    <ContentBox
                      category={articles[2]?.category}
                      image={articles[2]?.image}
                      title={articles[2]?.title}
                      description={articles[2]?.description}
                      tooSmall
                    />
                  </Suspense>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Suspense fallback={<Loading />}>
                    <ContentBox
                      category={articles[3]?.category}
                      image={articles[3]?.image}
                      title={articles[3]?.title}
                      description={articles[3]?.description}
                      tooSmall
                    />
                  </Suspense>
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
              <Suspense fallback={<Loading />}>
                <PhoneFinder />
              </Suspense>
              <Suspense fallback={<Loading />}>
                <MobileReviews isGap isTrending isTrendingBanner />
              </Suspense>
              <Suspense fallback={<Loading />}>
                <TopDevicesTable />
              </Suspense>
              <Suspense fallback={<Loading />}>
                <LatestDevices isSelfDataFetch />
              </Suspense>
            </Grid>
            <Grid item sx={{ pl: 1 }} xs={12} sm={6} md={8}>
              <Suspense fallback={<Loading />}>
                <MobileReviews mobilesArticles={mobileReviews} />
              </Suspense>
              <Suspense fallback={<Loading />}>
                <PopularMobiles user={user} />
              </Suspense>
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
                <Suspense fallback={<Loading />}>
                  <BrandDisplayComponent isSelfFetch />
                </Suspense>
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
              <Suspense fallback={<Loading />}>
                <NewsAndReviews />
              </Suspense>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
}
