"use client";
import React, { lazy, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { MobileArticleType } from "@/types/mobiles";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Link from "next/link";
import { formatForUrl } from "@/utils/utils";
import { getAllMobiles } from "@/lib/queries/services";

const MemoryIcon = lazy(() => import("@mui/icons-material/Memory"));

export default function CommonMobileSlider({
  mobiles,
  user,
  brandsName,
}: {
  mobiles: MobileArticleType[];
  user: any;
  brandsName?: string;
}) {
  const [articles, setArticles] = useState<MobileArticleType[]>(mobiles);
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [page, setPage] = useState(1);
  // const [totalData, setTotalData] = useState<number>(0)

  const handleNext = () => {
    if (index < articles.length - 3 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 3);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
    const mobilesDataFetch = async () => {
      const data = await getAllMobiles(
        brandsName
          ? {
              limits: "6",
              brands: brandsName,
              pages: `${page + 1}`,
            }
          : {
              limits: "6",
              pages: `${page + 1}`,
            }
      );
      console.log("first mobiles ", data);
      // setTotalData(data?.meta?.total)
      setPage(page + 1);
      if (data?.data?.length > 0) {
        console.log("first mobiles in length ", data);
        setArticles((prev) => [...prev, ...(data?.data as any)]);
      }
    };
    mobilesDataFetch();
  };

  const handlePrev = () => {
    if (index > 0 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex - 3);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
    // setTotalData(totalData - 5)
  };
  console.log("articlesarticles  ", articles);
  // useEffect(()=>{
  //   const mobilesDataFetch = async () =>{
  //     const data = await getAllMobiles({ limits: "30", brands: "Apple" })
  //     setArticles(data?.data as any)
  //   }
  //   mobilesDataFetch()
  // },[])

  return (
    <div className="flex justify-center items-center   w-full ">
      <IconButton
        aria-label="Arrow Back Ios Icon"
        className="mr-[-27px]"
        onClick={handlePrev}
        disabled={index === 0}
      >
        <ArrowBackIosIcon className="h-6 w-7 " />
      </IconButton>
      <div className="w-full overflow-hidden relative">
        <div
          className={`flex w-full transition-transform duration-500 ${
            transitioning ? "ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${(index * 100) / 3}%)` }} // Adjusting the transform percentage
        >
          {articles &&
            articles?.map((data: MobileArticleType) => {
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
                    height: "240px", // Adjusted height
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Grid container direction="column" alignItems="center">
                    <Grid
                      sx={{
                        width: "250px", // Ensure the image takes the full width of the card
                        height: "98px", // Adjust the height for uniformity
                      }}
                      xs={3}
                    >
                      <Link
                        aria-label={`Mobile ${formatForUrl(data?.title)}`}
                        href={`/mobile/${formatForUrl(data?.title)}`}
                      >
                        <Image
                          style={{
                            width: "220px", // Ensure the image takes the full width of the card
                            height: "80px", // Adjust the height for uniformity
                            cursor: "pointer",
                          }}
                          objectFit={"cover"}
                          alt={data.title}
                          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.display_image}`}
                          width={50}
                          height={50}
                          loading="lazy"
                        />
                      </Link>
                    </Grid>
                    <Link
                      aria-label={`Mobile ${formatForUrl(data?.title)}`}
                      href={`/mobile/${formatForUrl(data?.title)}`}
                    >
                      <Grid item sx={{ width: "100%", mt: 2, height: "25px" }}>
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
                      </Grid>
                    </Link>
                    <Link
                      aria-label={`Mobile ${formatForUrl(data?.title)}`}
                      href={`/mobile/${formatForUrl(data?.title)}`}
                    >
                      <Grid textAlign={"left"} item sx={{ width: "100%" }}>
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
                          <MemoryIcon sx={{ fontSize: 15, color: "gray" }} />{" "}
                          {data?.key_specifications?.ram_chipset ? (
                            <span>{data.key_specifications?.ram_chipset}</span>
                          ) : (
                            <span style={{ color: "gray" }}>****</span> // or any placeholder text
                          )}
                        </Typography>
                      </Grid>
                    </Link>

                    <Link
                      aria-label={`Mobile ${formatForUrl(data?.title)}`}
                      href={`/mobile/${formatForUrl(data?.title)}`}
                    >
                      <Grid item textAlign={"left"} sx={{ width: "100%" }}>
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
                          <CameraAltIcon sx={{ fontSize: 15, color: "gray" }} />{" "}
                          {data?.key_specifications?.camera}
                        </Typography>
                      </Grid>
                    </Link>
                    <Link
                      aria-label={`Mobile ${formatForUrl(data?.title)}`}
                      href={`/mobile/${formatForUrl(data?.title)}`}
                    >
                      <Grid item textAlign={"left"} sx={{ width: "100%" }}>
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
                            mb: "8px",
                          }}
                        >
                          <BatteryChargingFullIcon
                            sx={{ fontSize: 15, color: "gray" }}
                          />{" "}
                          {data?.key_specifications?.battery}
                        </Typography>
                      </Grid>
                    </Link>

                    <Grid
                      item
                      sx={
                        user?.role === "admin" || user?.role === "sub_admin"
                          ? {
                              display: "flex",
                              justifyContent: "space-around",
                              width: "100%",
                            }
                          : {
                              width: "100%",
                            }
                      }
                    >
                      {/* {data?.prices[0].start_from ? (
                        <Link
                          aria-label={`Mobile ${formatForUrl(data?.title)}`}
                          href={`/mobile/${formatForUrl(data?.title)}`}
                        >
                          <Typography
                            sx={{
                              color: "#055491",
                              fontWeight: 800,
                              fontSize: "16px",
                              textAlign: "center",
                            }}
                          >
                            ${data?.prices[0].start_from}
                          </Typography>
                        </Link>
                      ) : null} */}

                      {user?.role === "admin" || user?.role === "sub_admin" ? (
                        <Link
                          aria-label={`Admin Mobile ${data?.id}`}
                          href={`/admin/mobile/edit/${data.id}`}
                        >
                          <Typography
                            sx={{
                              color: "#055491",
                              fontWeight: 800,
                              fontSize: "16px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            <EditNoteIcon />
                          </Typography>
                        </Link>
                      ) : null}
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
        </div>
      </div>
      <IconButton
        aria-label="Arrow Forward Ios Icon"
        onClick={handleNext}
        // disabled={totalData === articles?.length}
        disabled={index >= articles?.length - 3}
      >
        <ArrowForwardIosIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
}
