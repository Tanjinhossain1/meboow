"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import DisplayArticleComponent from "../HomePage/DisplayArticleComponent";
import { CategoryTypes } from "@/types/category";
import CategoryListComponent from "./CategoryListComponent";
import { MobileArticleType } from "@/types/mobiles";
import MobileCommonDetails from "../HomePage/Component/MobileCommonDetails";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { fetchMobileArticles } from "@/services/articleServices";
import MobileListComponent from "../Details/MobileListComponent";

export default function CategoryPageComponent({
  categoryWiseArticles,
  total,
  category,
  isSearch,
  isBrandWise,
  mobileSearchDefault,
  isSubCategory,
  mobileArticles,
}: {
  categoryWiseArticles: RecentArticleDataType[];
  total: number;
  category: CategoryTypes[];
  isSearch?: boolean;
  isSubCategory?: boolean;
  isBrandWise?: boolean;
  mobileSearchDefault?: {
    data: MobileArticleType[];
    page: number;
    limit: number;
    total: number;
  };
  mobileArticles: MobileArticleType[];
}) {
  const params = useParams();
  const history = useRouter();
  const [isHideLoadMore, setIsHideLoadMore] = useState<boolean>(false);
  const [mobileSearch, setMobileSearch] = useState<{
    data: MobileArticleType[];
    page: number;
    limit: number;
    total: number;
  }>(
    mobileSearchDefault
      ? mobileSearchDefault
      : {
          data: [],
          total: 0,
          limit: 10, // Assuming each page shows 10 items
          page: 1,
        }
  );
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "5";
  const search = searchParams.get("search") ?? "";
  
  const decodedTitle = decodeURIComponent(search);

  // Replace spaces back to '+'
  const formattedSearch = decodedTitle.replace(/ /g, "+");
  const formatSearch = formattedSearch
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  // Function to load more articles
  const loadMoreArticles = async () => {
    if (isSearch) {
      history.push(
        `/search/?${new URLSearchParams({
          page: page,
          limit: `${Number(limit) + 6}`,
          search: formattedSearch,
        })}`,
        {
          scroll: false,
        }
      );
    } else if (isBrandWise) {
      history.push(
        `/article/brand-wise/${params?.brand}?${new URLSearchParams({
          page: page,
          limit: `${Number(limit) + 6}`,
        })}`,
        {
          scroll: false,
        }
      );
    } else if (isSubCategory) {
      history.push(
        `/category/${formatForUrlWith_under_score(
          params?.category as any
        )}/${formatForUrlWith_under_score(
          params?.subCategory as any
        )}?${new URLSearchParams({
          page: page,
          limit: `${Number(limit) + 6}`,
        })}`,
        {
          scroll: false,
        }
      );
    } else {
      history.push(
        `/category/${formatForUrlWith_under_score(
          params?.category as any
        )}/?${new URLSearchParams({
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

  const fetchMobileData = async (page: number) => {
    try {
      const response = await fetchMobileArticles({
        search: formatSearch,
        page: `${page}`,
        limit: `${mobileSearch.limit}`,
      });

      // Update state with the fetched data
      setMobileSearch((prevState) => ({
        ...prevState,
        data: response.data,
        total: response.total,
        page,
      }));
    } catch (error) {
      console.error("Failed to fetch mobile data:", error);
    }
  };
  const handlePageChange = (event: any, value: number) => {
    fetchMobileData(value); // Fetch data for the new page
  };
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
              {isBrandWise ? (
                <Typography sx={{ fontSize: 12 }}>{params?.brand}</Typography>
              ) : isSearch ? (
                <Typography sx={{ fontSize: 12 }}>
                  Search Results for: {formatSearch}
                </Typography>
              ) : isSubCategory ? (
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/category/${params?.category}`}
                >
                  {params?.category}
                </Link>
              ) : (
                <Typography sx={{ fontSize: 12 }}>
                  {params?.category}
                </Typography>
              )}
              {isSubCategory ? (
                <Typography sx={{ fontSize: 12 }}>
                  {params?.subCategory}
                </Typography>
              ) : null}
            </Breadcrumbs>

            <Grid container>
              <Grid xs={12} md={8}>
                {isBrandWise ? (
                  <Typography
                    sx={{ fontSize: 37, fontWeight: 550, my: 2, mb: 5 }}
                  >
                    Article for Brand: {params?.brand}
                  </Typography>
                ) : isSearch ? (
                  <Typography
                    sx={{ fontSize: 37, fontWeight: 550, my: 2, mb: 5 }}
                  >
                    Search Results for: {formatSearch}
                  </Typography>
                ) : isSubCategory ? (
                  <Typography sx={{ fontSize: 37, fontWeight: 550, my: 2 }}>
                    {params?.subCategory}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: 37, fontWeight: 550, my: 2 }}>
                    {params?.category}
                  </Typography>
                )}
              </Grid>
              <Grid xs={12} md={4}></Grid>
            </Grid>

            <Grid container>
              <Grid xs={12} md={8}>
                {categoryWiseArticles &&
                categoryWiseArticles.length !== 0 &&
                isSearch ? (
                  <Typography
                    sx={{ fontSize: 20, fontWeight: 600, mt: 2, mb: 1 }}
                  >
                    Articles
                  </Typography>
                ) : null}
                <Grid container>
                  {categoryWiseArticles &&
                    categoryWiseArticles?.map((data: RecentArticleDataType) => {
                      console.log(data);
                      return (
                        <Fragment key={data.id}>
                          <DisplayArticleComponent data={data} />
                        </Fragment>
                      );
                    })}
                </Grid>
                {categoryWiseArticles && categoryWiseArticles.length === 0 && (
                  <>
                    <Typography sx={{ fontSize: 20, fontWeight: 600, mt: 2 }}>
                      {" "}
                      Articles{" "}
                    </Typography>
                    <Alert severity="warning">
                      No Article Found For {params?.brand}{" "}
                      {search ? formatSearch : ""} {params?.category}.
                    </Alert>
                  </>
                )}
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
                {mobileSearch && mobileSearch?.data?.length === 0 && (
                  <>
                    <Typography sx={{ fontSize: 20, fontWeight: 600, mt: 2 }}>
                      {" "}
                      Mobiles{" "}
                    </Typography>
                    <Alert severity="warning">
                      No Mobile Found For {formatSearch}{" "}
                      {formatSearch ? formatSearch : ""}
                    </Alert>
                  </>
                )}{" "}
                {isSearch ? (
                  mobileSearch && mobileSearch?.data?.length !== 0 ? (
                    <Box>
                      <Typography sx={{ fontSize: 20, fontWeight: 600, mt: 2 }}>
                        {" "}
                        Mobiles{" "}
                      </Typography>
                      <Grid container>
                        <MobileCommonDetails articles={mobileSearch?.data} />
                      </Grid>
                      <Grid sx={{ mt: 3 }} container>
                        <Grid xs={10} sm={10}>
                          {mobileSearch?.data?.length > 0 ? (
                            <Pagination
                              count={Math.ceil(
                                mobileSearch?.total / mobileSearch?.limit
                              )}
                              page={mobileSearch?.page}
                              variant="outlined"
                              shape="rounded"
                              size="large" // You can set to "small" or "medium" as needed
                              sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "center",
                              }}
                              onChange={handlePageChange}
                            />
                          ) : null}
                        </Grid>
                      </Grid>
                    </Box>
                  ) : null
                ) : null}
              </Grid>
              <Grid xs={12} md={0.5}></Grid>
              <Grid xs={12} sx={{ mt: 5 }} md={3.5}>
                <MobileListComponent mobileArticles={mobileArticles} />
                <CategoryListComponent category={category} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
    </>
  );
}
