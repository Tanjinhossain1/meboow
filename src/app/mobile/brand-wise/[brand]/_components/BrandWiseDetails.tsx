"use client";
import PopularMobiles from "@/Component/HomePage/Component/PopularMobiles";
import { MobileArticleType } from "@/types/mobiles";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Grid,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import Lottie from "lottie-react";
import searchLoading from "@/animationIcon/search-loader.json";
import { Input } from "@/components/ui/input"
import { formatForUrl } from "@/utils/utils";

export default function BrandWiseDetails({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType[];
}) {
  const params = useParams();
  const articlesRef = useRef<MobileArticleType[]>(mobileArticles);
  const [page, setPage] = useState(2); // Start from the second page
  const [hasMore, setHasMore] = useState(true);
  const totalRef = useRef<number>(0);
  const loaderRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (
      totalRef.current === 0 ||
      totalRef.current > articlesRef?.current?.length
    ) {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            await loadMoreArticles();
          }
        },
        { threshold: 1.0 } // Trigger when 100% of the element is visible
      );

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      return () => {
        if (loaderRef.current) {
          observer.unobserve(loaderRef.current);
        }
      };
    } else {
      setHasMore(false);
    }
  }, [loaderRef, hasMore === true, totalRef.current, articlesRef.current]);

  const loadMoreArticles = async () => {
    try {
      const res = await fetch(
        searchTerm !== ""
          ? `${
              process.env.NEXT_PUBLIC_BASE_URL
            }/api/article/mobile?page=${page}&limit=${20}&searchTerm=${searchTerm}`
          : `${
              process.env.NEXT_PUBLIC_BASE_URL
            }/api/article/mobile?page=${page}&limit=${20}`
      );
      const newArticles = await res.json();
      console.log(
        "newArticles?.meta?.total >= articles.length  ",
        newArticles?.meta?.total,
        articlesRef.current?.length
      );
      if (newArticles?.meta?.total > articlesRef.current?.length) {
        setHasMore(false);
      }
      totalRef.current = newArticles?.meta?.total;
      console.log("asdfdsf", newArticles);
      articlesRef.current = [...articlesRef.current, ...newArticles?.data];
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to load more articles", error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      // Reset and load new data based on search term
      //   setPage(1);
      //   setHasMore(true);
      fetchSearchedArticles(value);
    }, 500); // 500ms debounce delay
  };
  const fetchSearchedArticles = async (search: string) => {
    setLoader(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/article/mobile?searchTerm=${search}`
      );
      const newArticles = await res.json();
      //   totalRef.current = newArticles?.meta?.total;
      articlesRef.current = newArticles?.data || [];
      //   setPage((prevPage) => prevPage + 1);
      setLoader(false);
    } catch (error) {
      setLoader(false);
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
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/brands">
                Brand
              </Link>
              <Typography sx={{ fontSize: 12 }}>{params?.brand}</Typography>
            </Breadcrumbs>

            <Typography sx={{ fontSize: 25, fontWeight: 600, mt: 2 }}>
              {params.brand} Mobile Phones
            </Typography>
            <div className="flex mt-3 mb-5 items-center w-full max-w-md bg-card border border-input rounded-md shadow-sm">
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
            {loader ? (
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000, // Ensure it's on top of other elements
                }}
              >
                <Box sx={{ height: "200px", width: "200px" }}>
                  <Lottie animationData={searchLoading} loop={true} />
                </Box>
              </Box>
            ) : null}

            {articlesRef.current && articlesRef.current.length === 0 && (
              <Alert severity="warning">
                No Mobile Found For {params?.brand}
              </Alert>
            )}
            <Grid container>
              {articlesRef.current &&
                articlesRef.current?.map((data: MobileArticleType, index) => {
                  return (
                    <Card
                      key={data.id}
                      className="m-2 flex-shrink-0"
                      sx={{
                        p: 1,
                        border: "1px solid lightgray",
                        borderRadius: "10px",
                        textAlign: "center",
                        width: "178px", // Adjusted width
                        height: "290px", // Adjusted height
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <Grid container direction="column" alignItems="center">
                        <Grid
                          sx={{
                            width: "192px", // Ensure the image takes the full width of the card
                            height: "98px", // Adjust the height for uniformity
                          }}
                          xs={3}
                          // item
                        >
                          <Link href={`/mobile/${formatForUrl(data?.title)}`}>
                            <Image
                              style={{
                                width: "195px", // Ensure the image takes the full width of the card
                                height: "95px", // Adjust the height for uniformity
                                cursor: "pointer",
                                // objectFit: "cover",
                              }}
                              alt={data.title}
                              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.display_image}`}
                              layout=""
                              width={50}
                              height={50}
                            />
                          </Link>
                        </Grid>
                        <Grid
                          item
                          sx={{ width: "100%", mt: 2, height: "45px" }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            href={`/mobile/${formatForUrl(data?.title)}`}
                          >
                            <Typography
                              sx={{
                                color: "#364473",
                                // fontWeight: 600,
                                fontSize: 15,

                                textAlign: "center",
                              }}
                            >
                              {data?.title}
                            </Typography>
                          </Link>
                        </Grid>

                        <Grid textAlign={"left"} item sx={{ width: "100%" }}>
                          <Link href={`/mobile/${formatForUrl(data?.title)}`}>
                            <Typography
                              sx={{
                                color: "#45517a",
                                width: "148px",
                                height: "14px",
                                mt: "13px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                // fontWeight: 600,
                                fontSize: 12,
                                // textAlign: "center",
                              }}
                            >
                              <MemoryIcon
                                sx={{ fontSize: 15, color: "gray" }}
                              />{" "}
                              {data?.key_specifications.ram_chipset}
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item textAlign={"left"} sx={{ width: "100%" }}>
                          <Link href={`/mobile/${formatForUrl(data?.title)}`}>
                            <Typography
                              sx={{
                                color: "#45517a",
                                width: "148px",
                                height: "14px",
                                mt: "7px",
                                // fontWeight: 600,
                                fontSize: 12,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                // textAlign: "center",
                              }}
                            >
                              <CameraAltIcon
                                sx={{ fontSize: 15, color: "gray" }}
                              />{" "}
                              {data?.key_specifications.camera}
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item textAlign={"left"} sx={{ width: "100%" }}>
                          <Link href={`/mobile/${formatForUrl(data?.title)}`}>
                            {" "}
                            <Typography
                              sx={{
                                color: "#45517a",
                                width: "148px",
                                height: "14px",
                                mt: "7px",
                                fontSize: 12,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                mb: "15px",
                              }}
                            >
                              <BatteryChargingFullIcon
                                sx={{ fontSize: 15, color: "gray" }}
                              />{" "}
                              {data?.key_specifications.battery}
                            </Typography>
                          </Link>
                        </Grid>

                        <Grid
                          item
                          sx={{
                            width: "100%",
                            mt: 1,
                            ":hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            href={`/mobile/${formatForUrl(data?.title)}`}
                          >
                            <Typography sx={{ fontSize: 14 }}>
                              See Full Specification{" "}
                              <KeyboardArrowRightIcon sx={{ fontSize: 15 }} />
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid> 
                    </Card>
                  );
                })}
            </Grid>

            {/* Loader Element */}
            {hasMore && (
              <div
                ref={loaderRef}
                style={{ padding: "20px", textAlign: "center" }}
              >
                Loading more articles...
              </div>
            )}
          </Paper>

          {/* Infinite Scroll Component */}
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
    </Fragment>
  );
}
function SearchIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }