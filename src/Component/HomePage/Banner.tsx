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
import { truncateText } from "@/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { RecentArticleDataType } from "@/types/RecentArticle";
import RecentArticleComponent from "./RecentArticleComponent";
import { BrandTypes, CategoryTypes } from "@/types/category";
import BrandDisplayComponent from "./BrandDisplay";
import TopLatestMobile from "./TopLatestMobile";
import { MobileArticleType } from "@/types/mobiles";
import PhoneFinder from "../Common/PhoneFinder";
import MobileReviews from "./Component/MobileReviews";
import PopularMobiles from "./Component/PopularMobiles";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const HoverBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
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

const ContentBox = ({
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
        height: isBig ? "355px" : "170px",
      }}
      onClick={() => {
        history.push(
          `/details/${id}/${category}?${new URLSearchParams({
            page: `${Number(page) + 1}`,
            limit: limit,
          })}`,
          {
            scroll: false,
          }
        );
      }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`}
        alt={title}
        layout="fill"
      />
    </Box>
    <Title
      sx={{ fontSize: isBig ? 21 : 20, fontWeight: 600 }}
      className={isBig ? "bigTitle" : "title"}
    >
      {title}
    </Title>
    <Description sx={{ fontSize: isBig ? 12 : 11 }} className="description">
      {isBig ? description : truncateText(description, tooSmall ? 100 : 190)}
    </Description>
  </HoverBox>
);

export default function Banner({
  articles,
  total,
  category,
  latestArticles,
  brands,
  mobileArticles,
  user,
  mobilesArticles,
}: {
  articles: RecentArticleDataType[];
  mobilesArticles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  brands: BrandTypes[];
  mobileArticles: MobileArticleType[];
  user: any;
}) {
  console.log("articles articles ", articles);
  const history = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";
  const SampleBrands = [
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
              <Grid container spacing={2}>
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
          <Grid container>
            <Grid xs={12}>
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] max-w-md rounded-lg border"
              >
                <ResizablePanel defaultSize={75}>
                  <PhoneFinder brands={SampleBrands} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={200}>
                  <MobileReviews mobilesArticles={mobilesArticles} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </Grid>
          </Grid>

          {/* <Grid sx={{ my: 4 }} container>
            <Grid xs={12} sm={6} md={4}>
              <PhoneFinder brands={SampleBrands} />
            </Grid>
            <Grid sx={{ pl: 2 }} xs={12} sm={6} md={8}>
              <MobileReviews mobilesArticles={mobilesArticles} />
            </Grid>
          </Grid>

          <Grid sx={{ my: 4 }} container>
            <Grid xs={12} sm={6} md={4}>
              <PhoneFinder brands={SampleBrands} />
            </Grid>
            <Grid sx={{ pl: 2 }} xs={12} sm={6} md={8}>
              <PopularMobiles user={user} articles={mobileArticles} />
            </Grid>
          </Grid> */}
        </Paper>
        <Paper
          className="lg:max-w-[1000px] mx-auto"
          sx={{ p: 2, mb: 2 }}
          elevation={0}
        >
          <Typography
            sx={{
              fontSize: 25,
              // fontFamily: "Arial, sans-serif",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Categories
          </Typography>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid gap={1} container>
              {category.map((value: CategoryTypes, index: number) => (
                <Grid
                  item
                  key={value.id}
                  xs={5.5}
                  sm={3.5}
                  md={2.5}
                  lg={1.5}
                  onClick={() => history.push(`/category/${value.title}`)}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    p: 2,
                    borderRadius: "10px",
                    bgcolor:
                      index === 0
                        ? "#e8f6ff"
                        : index === 1
                        ? "#eeeeff"
                        : index === 2
                        ? "#fff6df"
                        : index === 3
                        ? "#eef0f5"
                        : index === 4
                        ? "#fff2ea"
                        : index === 5
                        ? "#e8ffe8"
                        : index === 6
                        ? "#e0f7fa"
                        : "#eeeeee",
                    ":hover": { bgcolor: "#f584b7" },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      mx: "auto",
                    }}
                  >
                    {value.title === "Vehicles" ? (
                      <Image
                        alt={value.title}
                        src="/category/car.png"
                        height={40}
                        width={40}
                      />
                    ) : value.title === "News" ? (
                      <Image
                        alt={value.title}
                        src="/category/world-news.png"
                        height={40}
                        width={40}
                      />
                    ) : // <NewspaperIcon sx={{ fontSize: 40 }} />
                    value.title === "Sports" ? (
                      <Image
                        alt={value.title}
                        src="/category/basketball.png"
                        height={40}
                        width={40}
                      />
                    ) : value.title === "Jobs" ? (
                      <Image
                        alt={value.title}
                        src="/category/case.png"
                        height={40}
                        width={40}
                      />
                    ) : (
                      <Image
                        alt={value.title}
                        src="/category/phone.png"
                        height={40}
                        width={40}
                      />
                    )}
                  </Box>
                  <Typography variant="body1" mt={1}>
                    {value.title}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>

        <Paper
          className="lg:max-w-[1000px] mx-auto"
          sx={{ p: 2, mb: 2 }}
          elevation={0}
        >
          <TopLatestMobile user={user} articles={mobileArticles} />
        </Paper>

        <Paper
          className="lg:max-w-[1000px] mx-auto"
          sx={{ p: 2, mb: 2 }}
          elevation={0}
        >
          <RecentArticleComponent
            brands={brands}
            latestArticles={latestArticles}
            category={category}
            total={total}
            articles={articles}
            user={user}
          />
        </Paper>
        <Paper
          className="lg:max-w-[1000px] mx-auto"
          sx={{ p: 2, mb: 2 }}
          elevation={0}
        >
          <Grid gap={1} container>
            <Typography
              sx={{
                mb: 1,
                // borderBottom: "2px solid lightgray",
                fontSize: 25,
                width: "100%",
                fontWeight: 600,
              }}
              onClick={() => history.push("/brands")}
              // onclick={()=>history.push('/brands')}
            >
              Mobile Brands
            </Typography>

            <BrandDisplayComponent brands={brands} />
          </Grid>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  ) : null;
}
