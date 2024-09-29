"use client";
import React, { Fragment, useState } from "react";
import { Paper, Typography, IconButton, Card, Grid, Box } from "@mui/material";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { MobileArticleType } from "@/types/mobiles";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { RecentArticleDataType } from "@/types/RecentArticle";
import DisplayArticleComponent from "../HomePage/DisplayArticleComponent";
import { formatDate_into_month_date_string, formatForUrl } from "@/utils/utils";
import Link from "next/link";

export default function LatestNews({
  articles,
}: {
  articles: RecentArticleDataType[];
}) {
  const history = useRouter();
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleNext = () => {
    if (index < articles.length - 3 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 3);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
  };

  const handlePrev = () => {
    if (index > 0 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex - 3);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
  };

  return (
    <Grid sx={{ my: 1 }} container>
    <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    <Grid xs={12} md={10} lg={9.8} xl={7}>
    <Paper sx={{ width: "100%" }} elevation={0}>
        <Box className="lg:w-3/4" >
      <Typography sx={{ fontSize: 25, fontWeight: 600,pt:2,ml:4 }}>
          Latest Article
      </Typography>
      <div className="flex justify-center items-center p-4 w-full ">
        <IconButton onClick={handlePrev} disabled={index === 0}>
          <ArrowBackIosIcon className="h-6 w-7" />
        </IconButton>
        <div className="w-full overflow-hidden relative">
          <div
            className={`flex w-full transition-transform duration-500 ${
              transitioning ? "ease-in-out" : ""
            }`}
            style={{ transform: `translateX(-${(index * 100) / 3}%)` }} // Adjusting the transform percentage
          >
            {articles &&
              articles?.map((data: RecentArticleDataType) => {
                return (
                  <Card
                    key={data.id}
                    className="m-2 flex-shrink-0"
                    sx={{
                      p: 1,
                      border: "1px solid lightgray",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "165px", // Adjusted width
                      height: "190px", // Adjusted height
                      position: "relative",
                      cursor: "pointer",
                    }}
                    
                  >
                    <Link href={data?.category === "Mobiles" ? `/review/${formatForUrl(data?.route) }` : `/article/${formatForUrl(data?.route)}`}>
                    
                    <Grid container direction="column" alignItems="center"> 
                        <Image
                          style={{
                            width: "100%",
                            cursor: "pointer",
                            height: "100%",
                            borderRadius:"10px"
                          }}
                          alt={data?.title}
                          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.image}`}
                          // layout="responsive"
                          width={300}
                          height={400} 
                        /> 
                        <Typography sx={{textAlign:"start",color:"gray",fontSize:12}}>{formatDate_into_month_date_string(data?.updateAt)}</Typography>
                      <Grid 
                        item
                        sx={{ width: "100%", mt: 2, height: "45px" }}
                      >
                        <Typography
                          sx={{
                            color: "#023359",
                            fontWeight: 600,
                            fontSize: 15,
                            textAlign: "center",
                          }}
                        >
                          {data?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                    </Link>
                  </Card>
                );
              })}
          </div>
        </div>
        <IconButton
          onClick={handleNext}
          disabled={index >= articles?.length - 3}
        >
          <ArrowForwardIosIcon className="h-6 w-6" />
        </IconButton>
      </div>
      </Box>
    </Paper>
    </Grid>
    <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
}
