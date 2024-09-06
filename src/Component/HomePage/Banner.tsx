"use client";
import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { formatForUrl, truncateText } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { RecentArticleDataType } from "@/types/RecentArticle";
import RecentArticleComponent from "./RecentArticleComponent";
import { BrandTypes, CategoryTypes } from "@/types/category";
import BrandDisplayComponent from "./BrandDisplay";
import TopLatestMobile from "./TopLatestMobile";
import { MobileArticleType, MobileTagsType } from "@/types/mobiles";
import PhoneFinder from "../Common/PhoneFinder";
import MobileReviews from "./Component/MobileReviews";
import PopularMobiles from "./Component/PopularMobiles";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Categories from "./Component/Categories";
import NewsAndReviews from "./Component/NewsAndReviews";
import TopDevicesTable from "./Component/TopDevicesTable";
import LatestDevices from "./Component/LatestDevices";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HoverBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  // cursor: "pointer",
  width: "100%",
  height: "100%",
  "&:hover .title": {
    transform: "translateY(-280%)",
  },
  "&:hover .bigTitle": {
    transform: "translateY(-660%)",
  },
  "&:hover .description": {
    transform: "translateY(0)",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: theme.spacing(1),
  transition: "transform 0.3s ease-in-out",
  zIndex: 1,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  textOverflow: "ellipsis",
}));

const Description = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: theme.spacing(1),
  paddingTop: "3px",
  transition: "transform 0.3s ease-in-out",
  transform: "translateY(100%)",
  zIndex: 0,
}));

export const ContentBox = ({
  image,
  title,
  category,
  description,
  history,
  id,
  isBig,
  page,
  limit,
  tooSmall,
}: {
  image: string;
  category: string;
  title: string;
  description: string;
  id: string;
  history: any;
  page: string;
  limit: string;
  isBig?: boolean;
  tooSmall?: boolean;
}) => (
  <HoverBox>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: isBig ? "348px" : "170px",
      }} 
    >
      <Link
        href={category === "Mobiles" ? `/review/${formatForUrl(title) }` : `/article/${formatForUrl(title)}`}
       
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`}
          alt={title}
          layout="fill"
        />
      </Link>
    </Box>
    <Link
      href={category === "Mobiles" ? `/review/${formatForUrl(title) }` : `/article/${formatForUrl(title)}`}
    >
      <Title
        sx={{ fontSize: isBig ? 21 : 20, fontWeight: 600 }}
        className={
          isBig
            ? "bigTitle"
            : "title overflow-hidden text-ellipsis line-clamp-3 text-sm"
        }
      >
        {title}
      </Title>
    </Link>
    <Link
      href={category === "Mobiles" ? `/review/${formatForUrl(title) }` : `/article/${formatForUrl(title)}`}
    >
      <Description sx={{ fontSize: isBig ? 12 : 11 }} className="description">
        {isBig ? description : truncateText(description, tooSmall ? 100 : 190)}
      </Description>
    </Link>
  </HoverBox>
);
export const SampleBrands = [
  "SAMSUNG",
  "APPLE",
  "HUAWEI",
  "NOKIA",
  "SONY",
  "LG",
  "HTC",
  "MOTOROLA",
  "LENOVO",
  "XIAOMI",
  "GOOGLE",
  "HONOR",
  "OPPO",
  "REALME",
  "ONEPLUS",
  "NOTHING",
  "VIVO",
  "MEIZU",
  "ASUS",
  "ALCATEL",
  "ZTE",
  "MICROSOFT",
  "UMIDIGI",
  "ENERGIZER",
  "CAT",
  "SHARP",
  "MICROMAX",
  "INFINIX",
  "ULEFONE",
  "TECNO",
  "DOOGEE",
  "BLACKVIEW",
  "CUBOT",
  "OUKITEL",
  "ITEL",
  "TCL",
];
export default function Banner({
  articles,
  total,
  category,
  latestArticles,
  brands,
  mobileArticles,
  user,
  mobilesArticles,
  newsAndReviews,
  dailyInterestMobiles,
  byFansMobiles,
  latestDeviceMobiles,
  googleMobiles,
  SamsungMobiles
}: // tags
{
  articles: RecentArticleDataType[];
  mobilesArticles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  newsAndReviews: RecentArticleDataType[];
  brands: BrandTypes[];
  mobileArticles: MobileArticleType[];
  dailyInterestMobiles: MobileArticleType[];
  byFansMobiles: MobileArticleType[];
  latestDeviceMobiles: MobileArticleType[];
  googleMobiles: MobileArticleType[];
  SamsungMobiles: MobileArticleType[];
  user: any;
  // tags:MobileTagsType[]
}) {
  console.log("articles articles ", articles);
  const history = useRouter();

  console.log(
    "dailyInterestMobiles,byFansMobiles,latestDeviceMobiles  ",
    dailyInterestMobiles,
    byFansMobiles,
    latestDeviceMobiles
  );
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";

  return articles ? (
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
                <Grid item xs={6} sm={12}>
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
          {/* <Grid container>
            <Grid xs={12}> */}

          {/* </Grid>
          </Grid> */}

          {/* <Grid sx={{ py: 4 }} container>
            <Grid
              sx={{ borderRight: "1px solid lightgray", pr: 1 }}
              xs={12}
              sm={6}
              md={4}
            >
              <PhoneFinder brands={SampleBrands} />
            </Grid>
            <Grid sx={{ pl: 1 }} xs={12} sm={6} md={8}>
              <MobileReviews mobilesArticles={mobilesArticles} />
            </Grid>
          </Grid> */}

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
              {
                mobilesArticles ? mobilesArticles[0] ?  <MobileReviews mobilesArticles={mobilesArticles} /> :null :null
              }
             
              <PopularMobiles SamsungMobiles={SamsungMobiles} googleMobiles={googleMobiles} user={user} articles={mobileArticles} />
              {/* <Tags tags={tags} /> */}
              {/* <Categories category={category} /> */}
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
              <NewsAndReviews mobilesArticles={newsAndReviews} />
            </Grid>
          </Grid>

          {/* <Grid sx={{ my: 4 }} container>
            <Grid sx={{borderRight:"1px solid lightgray",pr:1}} xs={12} sm={6} md={4}>
              {/* <TopDevicesTable
                byFans={byFansMobiles}
                dailyInterest={dailyInterestMobiles}
              />
              <LatestDevices mobiles={latestDeviceMobiles} />  
            </Grid>
            {/* <Grid sx={{ pl: 1, pt: 2 }} xs={12} sm={6} md={8}>
              <NewsAndReviews mobilesArticles={newsAndReviews} />
            </Grid>  
          </Grid> */}
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  ) : null;
}
