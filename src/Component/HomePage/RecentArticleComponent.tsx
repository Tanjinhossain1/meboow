"use client";
import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandTypes, CategoryTypes } from "@/types/category";
import DisplayArticleComponent from "./DisplayArticleComponent";

export default function RecentArticleComponent({
  articles,
  total,
  category,
  latestArticles,
  brands,
  user
}: {
  articles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  latestArticles: RecentArticleDataType[];
  brands: BrandTypes[];
  user:any
}) {
  const [isHideLoadMore, setIsHideLoadMore] = useState<boolean>(false);
  const history = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
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
    <Grid container>
      <Grid xs={12} md={12}>
        {/* <Container sx={{ bgcolor: "#bd047c", p: 1 }}> */}
        <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
          {/* <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#f5f5f5" }}> */}
          Recent Article
        </Typography>

        <Grid sx={{ mt: 2,display:{sm: "flex",xs:"none"} }} container>
          {articles &&
            articles?.map((data: RecentArticleDataType) => {
              console.log(data);
              return (
                <Fragment key={data.id}>
                  <DisplayArticleComponent user={user}  data={data} />
                </Fragment>
              );
            })}
        </Grid>
        <Grid sx={{ mt: 2,display:{sm: "none",xs:"flex"} }} container>
          {articles &&
            articles?.map((data: RecentArticleDataType) => {
              console.log(data);
              return (
                <Fragment key={data.id}>
                  <DisplayArticleComponent user={user} asSmall  data={data} />
                </Fragment>
              );
            })}
        </Grid>
      </Grid>

      <Grid sx={{ mt: 3 }} container>
        <Grid xs={1} sm={4}></Grid>
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
      </Grid>
    </Grid>
  );
}
