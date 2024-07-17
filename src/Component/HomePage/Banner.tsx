"use client";
import React, { useState } from "react";
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

const HoverBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  "&:hover .title": {
    transform: "translateY(-200%)",
  },
  "&:hover .bigTitle": {
    transform: "translateY(-900%)",
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
}) => (
  <HoverBox>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: isBig ? "470px" : "228px",
      }}
      onClick={() => {
        const joinTitle = title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("-");
        history.push(
          `/details/${id}/${category}/${joinTitle}?${new URLSearchParams({
            page: `${Number(page) + 1}`,
            limit: limit,
          })}`,
          {
            scroll: false,
          }
        );
      }}
    >
      <Image src={image} alt={title} layout="fill" objectFit="cover" />
    </Box>
    <Title
      sx={{ fontSize: isBig ? 21 : 20, fontWeight: 600 }}
      className={isBig ? "bigTitle" : "title"}
    >
      {title}
    </Title>
    <Description sx={{ fontSize: isBig ? 12 : 11 }} className="description">
      {isBig ? description : truncateText(description, 190)}
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
}: {
  articles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  brands: BrandTypes[];
  mobileArticles: MobileArticleType[];
  user:any
}) {
  console.log("articles articles ", articles);
  const history = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";

  return articles ? (
    <Grid sx={{ mt: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper sx={{ p: 2, mb: 2, bgcolor: "white" }} elevation={0}>
          <Typography variant="h1" sx={{ fontSize: 25, fontWeight: 600, mb: 1 }}>
            Latest Article
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
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
            <Grid item xs={12} sm={4}>
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
                <Grid item xs={6} sm={12}>
                  <ContentBox
                    page={page}
                    limit={limit}
                    category={articles[2]?.category}
                    id={articles[2]?.id}
                    history={history}
                    image={articles[2]?.image}
                    title={articles[2]?.title}
                    description={articles[2]?.description}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
          <Typography
            sx={{
              fontSize: 25,
              fontFamily: "Arial, sans-serif",
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

        <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
          <TopLatestMobile user={user} articles={mobileArticles} />
          {/* <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Popular Mobiles</h1>
            <Carousel
              items={[
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                {
                  image: "/path/to/image1.jpg",
                  rating: "4.3",
                  title: "OnePlus Nord CE 4 5G",
                  chipset: "Snapdragon 7 Gen 3",
                  camera: "50 MP Rear Camera",
                  battery: "5500 mAh Battery",
                  price: "₹24,998",
                },
                // Add more items here...
              ]}
            />
          </div> */}
        </Paper>

        <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
          <RecentArticleComponent
            brands={brands}
            latestArticles={latestArticles}
            category={category}
            total={total}
            articles={articles}
          />
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
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
