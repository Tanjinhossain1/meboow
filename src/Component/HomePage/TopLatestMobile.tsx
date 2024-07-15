"use client";
import React, { useState } from "react";
import { Paper, Typography, IconButton, Card, Grid } from "@mui/material";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { MobileArticleType } from "@/types/mobiles";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { auth } from "@/auth";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function TopLatestMobile({
  articles,
  user,
}: {
  articles: MobileArticleType[];
  user: any;
}) {
  const history = useRouter();
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleNext = () => {
    if (index < articles.length - 5 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 5);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
  };

  const handlePrev = () => {
    if (index > 0 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setIndex((prevIndex) => prevIndex - 5);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
  };

  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        Top Latest Mobile
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
            style={{ transform: `translateX(-${(index * 100) / 5}%)` }} // Adjusting the transform percentage
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
                        onClick={() => {
                          history.push(`/mobile/detail/${data.id}`);
                        }}
                        // item
                      >
                        <Image
                          style={{
                            width: "195px", // Ensure the image takes the full width of the card
                            height: "95px", // Adjust the height for uniformity
                            cursor: "pointer",
                            // objectFit: "cover",
                          }}
                          alt={data.title}
                          src={data.display_image}
                          layout=""
                          width={50}
                          height={50}
                        />
                      </Grid>
                      <Grid
                        onClick={() => {
                          history.push(`/mobile/detail/${data.id}`);
                        }}
                        item
                        sx={{ width: "100%", mt: 2, height: "45px" }}
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
                      </Grid>

                      <Grid
                        onClick={() => {
                          history.push(`/mobile/detail/${data.id}`);
                        }}
                        textAlign={"left"}
                        item
                        sx={{ width: "100%" }}
                      >
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
                          {data?.key_specifications.processor}
                        </Typography>
                      </Grid>
                      <Grid
                        onClick={() => {
                          history.push(`/mobile/detail/${data.id}`);
                        }}
                        item
                        textAlign={"left"}
                        sx={{ width: "100%" }}
                      >
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
                          {data?.key_specifications.rearCamera}
                        </Typography>
                      </Grid>
                      <Grid
                        onClick={() => {
                          history.push(`/mobile/detail/${data.id}`);
                        }}
                        item
                        textAlign={"left"}
                        sx={{ width: "100%" }}
                      >
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
                      </Grid>

                      <Grid
                        item
                        sx={
                          user?.role === "admin"
                            ? {
                                display: "flex",
                                justifyContent: "space-around",
                                width: "100%",
                                mt: 1,
                              }
                            : {
                                width: "100%",
                                mt: 1,
                              }
                        }
                      >
                        <Typography
                          sx={{
                            color: "#055491",
                            fontWeight: 800,
                            fontSize: "16px",
                            textAlign: "center",
                          }}
                          onClick={() => {
                            history.push(`/mobile/detail/${data.id}`);
                          }}
                        >
                          ${data?.prices[0].start_from}
                        </Typography>
                        {user?.role === "admin" ? <Typography
                          sx={{
                            color: "#055491",
                            fontWeight: 800,
                            fontSize: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            history.push(`/admin/mobile/edit/${data.id}`);
                          }}
                        >
                         <EditNoteIcon /> 
                        </Typography>: null}
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
          </div>
        </div>
        <IconButton
          onClick={handleNext}
          disabled={index >= articles?.length - 5}
        >
          <ArrowForwardIosIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </Paper>
  );
}
