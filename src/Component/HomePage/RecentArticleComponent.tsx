"use client";
import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandTypes, CategoryTypes } from "@/types/category";
import DisplayArticleComponent from "./DisplayArticleComponent";
import CategoryListComponent from "../Category/CategoryListComponent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BrandDisplayComponent from "./BrandDisplay";

export default function RecentArticleComponent({
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
  const [isHideLoadMore, setIsHideLoadMore] = useState<boolean>(false);
  const history = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";
  console.log("latestArticles  ", latestArticles);
  // Function to load more articles
  const loadMoreArticles = async () => {
    history.push(
      `/?${new URLSearchParams({
        page: page,
        limit: `${Number(limit) + 6}`,
      })}`,
      {
        scroll: false,
      }
    );
  };

  useEffect(() => {
    console.log("articles.length  ", articles.length, total);
    if (articles.length === total) {
      setIsHideLoadMore(true);
    }
  }, [articles.length, total]);
  return (
    <Grid  container>
      <Grid xs={12} md={12}>
        
        {/* <Container sx={{ bgcolor: "#bd047c", p: 1 }}> */}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
          {/* <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#f5f5f5" }}> */}
            Recent Article
          </Typography>
         
        <Grid sx={{ mt: 2 }} container>
          {articles &&
            articles.map((data: RecentArticleDataType) => {
              console.log(data);
              return (
                <Fragment key={data.id}>
                  <DisplayArticleComponent data={data} />
                </Fragment>
              );
            })}
        </Grid>
      </Grid>

      {/* <Grid xs={12} md={0.3}></Grid>
      <Grid xs={12} md={3.7}>
        <CategoryListComponent category={category} />
      </Grid> */}

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

        <Grid sx={{ mt: 2 }} container>
          <Typography
            sx={{
              mb: 1,
              mt: 5,
              borderBottom: "2px solid lightgray",
              fontSize: 25,
              width: "100%",
              fontWeight: 600,
              color: "#e8005d",
            }}
          >
            Latest Devices
          </Typography>
          <Carousel>
            <CarouselContent>
              {latestArticles &&
                latestArticles.map((data: RecentArticleDataType) => {
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
                            `/details/${data.id}/${data.category}/${joinTitle}?${new URLSearchParams({
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
              {/* <CarouselItem className="basis-1/3"></CarouselItem>  */}
            </CarouselContent>
          </Carousel>
        </Grid> 
      </Grid>
    </Grid>
  );
}
