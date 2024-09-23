"use client";
import { MobileArticleType } from "@/types/mobiles";
import {
  Breadcrumbs,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
  Pagination,
  PaginationItem,
  Input,
  Box,
} from "@mui/material";
import { useParams } from "next/navigation"; // Hook for getting params and pathname
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { formatForUrl } from "@/utils/utils";
import { SearchIcon } from "@/app/mobile/_components/MobileDetails";

export default function BrandWiseMobile({
  defaultMobiles,
}: {
  defaultMobiles: {
    data: MobileArticleType[];
    meta: {
      total: number;
    };
  };
}) {
  const params = useParams();

  const brandParam = params?.brand as string; // Fetch the brand from the dynamic route
  const pageParam = params?.page ? parseInt(params.page as string, 10) : 1; // Default to page 1 if no page param
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [articles, setArticles] = useState<MobileArticleType[]>(
    defaultMobiles?.data || []
  );
  const [totalPages, setTotalPages] = useState(1);
  const limit = 50;

  // Format brand for display
  const formattedBrand = brandParam
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch articles on page load and when page/brand changes
  useEffect(() => {
    const fetchArticles = async () => {
      // try {
      //   const response = await axios.get(
      //     `/api/article/mobile?page=${pageParam}&limit=${limit}&brands=${formattedBrand}`
      //   );
      //   setArticles(response.data.data);
      // setTotalPages(Math.ceil(response.data.meta.total / limit));
      setTotalPages(Math.ceil(defaultMobiles?.meta?.total / limit));
      // } catch (error) {
      //   console.error("Error fetching articles:", error);
      // }
    };

    fetchArticles();
  }, [defaultMobiles]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === "") {
      setArticles(defaultMobiles?.data || []);
      return;
    }
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchSearchedArticles(value);
    }, 500); // 500ms debounce delay
  };
  const fetchSearchedArticles = async (search: string) => {
    try {
      const response = await axios.get(
        `/api/article/mobile?searchTerm=${search}&limit=${limit}&brands=${formattedBrand}`
      );

      const newArticles = response.data.data;
      setArticles(newArticles || []);
    } catch (error) {
      console.error("Failed to fetch searched articles", error);
    }
  };
  return (
    <Fragment>
      <Grid container>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
        <Grid xs={12} md={10} lg={9.8} xl={8}>
          <Paper
            className="min-h-screen md:max-w-[1000px] mx-auto"
            sx={{ p: 2, mb: 2 }}
            elevation={2}
          >
            <Breadcrumbs sx={{ fontSize: 12 }} aria-label="breadcrumb">
              <MuiLink underline="hover" color="inherit" href="/">
                Home
              </MuiLink>
              <MuiLink underline="hover" color="inherit" href="/brands">
                Brand
              </MuiLink>
              <Typography sx={{ fontSize: 12 }}>{formattedBrand}</Typography>
            </Breadcrumbs>

            <Box
              sx={{
                display: {
                  xs: "",
                  md: "flex",
                },
                gap: 3,
              }}
            >
              <Typography
                component={"h1"}
                sx={{ fontSize: 30, fontWeight: 600, mt: 2 }}
              >
                {formattedBrand} Mobile Phones
              </Typography>
              <div className="flex mt-5 mb-5 items-center w-full max-w-md bg-card border border-input rounded-md shadow-sm">
                <div className="pl-3 text-muted-foreground">
                  <SearchIcon className="w-5 h-5" />
                </div>
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="flex-1 py-2 pr-3 text-sm bg-transparent border-none focus:ring-0 focus:outline-none"
                />
              </div>
            </Box>
            <Grid container sx={{ mb: 7, mt: 2 }} gap={2}>
              {articles?.map((data) => (
                <Grid xs={3.5} sm={3} sx={{ mb: 12 }} md={2.2} key={data.id}>
                  <Grid
                    sx={{
                      width: "100px",
                      height: "100px",
                      textAlign: "center",
                      ":hover": { bgColor: "red" },
                    }}
                  >
                    <Link
                      aria-label={`Mobile ${data?.title}`}
                      href={`/mobile/${formatForUrl(data?.title)}`}
                    >
                      <Image
                        objectFit={"cover"}
                        alt={data.title}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.display_image}`}
                        width={200}
                        height={200}
                        layout="responsive"
                        loading="lazy"
                      />
                    </Link>
                    <Typography sx={{ ":hover": { bgColor: "red" } }}>
                      <Link
                        style={{
                          textAlign: "center",
                          fontWeight: 500,
                          color: "gray",
                          paddingTop: "10px",
                          fontSize: "11px",
                        }}
                        href={`/mobile/${formatForUrl(data?.title)}`}
                      >
                        {data?.title}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {articles?.length > 0 && searchTerm === "" ? (
              <Pagination
                count={totalPages}
                page={pageParam}
                variant="outlined"
                shape="rounded"
                size="large" // You can set to "small" or "medium" as needed
                sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    href={
                      item.page === 1
                        ? `/mobile/brand-wise/${brandParam}`
                        : `/mobile/brand-wise/${brandParam}/page/${item.page}`
                    } // Adjust the path according to your routing
                    {...item}
                  />
                )}
              />
            ) : null}
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
    </Fragment>
  );
}
