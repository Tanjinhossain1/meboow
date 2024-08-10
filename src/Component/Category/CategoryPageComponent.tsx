"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import {
  Alert,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import DisplayArticleComponent from "../HomePage/DisplayArticleComponent";
import { CategoryTypes } from "@/types/category";
import CategoryListComponent from "./CategoryListComponent";

export default function CategoryPageComponent({
  categoryWiseArticles,
  total,
  category,
  isSearch,
  isBrandWise,
}: {
  categoryWiseArticles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  isSearch?: boolean;
  isBrandWise?: boolean;
}) {
  const params = useParams();
  const history = useRouter();
  const [isHideLoadMore, setIsHideLoadMore] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";
  const search = searchParams.get("search") ?? ""; 

  // Function to load more articles
  const loadMoreArticles = async () => {
    if(isSearch){

        history.push(
          `/search/?${new URLSearchParams({
            page: page,
            limit: `${Number(limit) + 6}`,
            search: search,
          })}`,
          {
            scroll: false,
          }
        );
    } else if(isBrandWise){
      history.push(
        `/article/brand-wise/${params?.brand}?${new URLSearchParams({
          page: page,
          limit: `${Number(limit) + 6}`,
        })}`,
        {
          scroll: false,
        }
      );
    }else{
        history.push(
            `/category/${params?.category}/?${new URLSearchParams({
              page: page,
              limit: `${Number(limit) + 6}`,
            })}`,
            {
              scroll: false,
            }
          );
    }
  };

  useEffect(() => {
    if (categoryWiseArticles?.length === total) {
      setIsHideLoadMore(true);
    }
  }, [categoryWiseArticles?.length, total]);

  return (
    <>
      
      <Grid container>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
        <Grid xs={12} md={10} lg={9.8} xl={8}>
          <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
            <Breadcrumbs sx={{ fontSize: 12 }} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              {isBrandWise ? <Typography sx={{ fontSize: 12 }}>
                  {params?.brand}
                </Typography> : isSearch ? (
                <Typography sx={{ fontSize: 12 }}>
                  Search Results for: {search}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 12 }}>
                  {params?.category}
                </Typography>
              )}
            </Breadcrumbs>

            <Grid container>
              <Grid xs={12} md={8}>
                {isBrandWise ?   <Typography sx={{ fontSize: 37, fontWeight: 550, my: 2,mb:5 }}>
                    Article for Brand: {params?.brand}
                  </Typography> : isSearch ? (
                  <Typography sx={{ fontSize: 37, fontWeight: 550, my: 2,mb:5 }}>
                    Search Results for: {search}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: 37, fontWeight: 550, my: 2 }}>
                    {params?.category}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={4}></Grid>
            </Grid>

            {categoryWiseArticles && categoryWiseArticles.length === 0 && (
              <Alert severity="warning">
                No Article Found For {params?.brand} {search ? search : ""} {params?.category}.
              </Alert>
            )}

            <Grid container>
              <Grid xs={12} md={8}>
                <Grid container>
                  {categoryWiseArticles &&
                    categoryWiseArticles?.map((data: RecentArticleDataType) => {
                      console.log(data);
                      return (
                        <Fragment key={data.id}>
                          <DisplayArticleComponent   data={data} />
                        </Fragment>
                      );
                    })}
                </Grid>
              </Grid>
              <Grid xs={12} md={0.5}></Grid>
              <Grid xs={12} sx={{ mt: 5 }} md={3.5}>
                <CategoryListComponent category={category} />
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
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
      
    </>
  );
}
