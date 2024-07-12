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
}: {
  articles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  brands: BrandTypes[];
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
          <Typography sx={{ fontSize: 25, fontWeight: 600, mb: 1 }}>
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
          <Grid container gap={1} xs={12}>
            {category.map((value: CategoryTypes, index: number) => {
              return (
                <Grid
                  onClick={() => {
                    history.push(`/category/${value.title}`);
                  }}
                  sx={{
                    p: 1,
                    textAlign: "center",
                    // display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    cursor: "pointer",
                    bgcolor: "#ffffff",
                    width: "50px",
                    height: "120px",
                    borderRadius: "10px",
                    backgroundColor:
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
                        : "",
                    ":hover": { backgroundColor: "#f584b7" },
                  }}
                  xs={1.5}
                  key={value.id}
                >
                  <Typography
                    sx={{ m: 0, p: 0, mt: 2, ml: 5, textAlign: "center" }}
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
                  </Typography>
                  <br />
                  <Typography sx={{ m: 0, p: 0 }}>{value.title}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      
        {/* <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
          <Typography sx={{fontSize:25,mb:2,fontWeight:600}}>Top Latest Mobile</Typography>
          <Carousel>
            <CarouselContent>
              {articles &&
                articles.map((data: RecentArticleDataType) => {
                  // if (data?.latestDevice === "latest") {
                  return (
                    <CarouselItem
                      className=" basis-1/3 sm:basis-1/4 lg:basis-1/5"
                      key={data.id}
                    >
                      <Image
                        style={{ cursor: "pointer" }}
                        alt=""
                        src={data.image}
                        width={300}
                        height={300}
                        onClick={() => {
                          const joinTitle = data.title
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join("-");
                          history.push(
                            `/details/${data.id}/${
                              data.category
                            }/${joinTitle}?${new URLSearchParams({
                              page: `${Number(page) + 1}`,
                              limit: limit,
                            })}`,
                            {
                              scroll: false,
                            }
                          );
                        }}
                      />
                      <Typography>{data?.deviceName}</Typography>
                    </CarouselItem>
                  );
                  // }
                })}
              {/* <CarouselItem className="basis-1/3"></CarouselItem>  
            </CarouselContent>
          </Carousel>
        </Paper> */}
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
