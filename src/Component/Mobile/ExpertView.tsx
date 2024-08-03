"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import NetworkCellIcon from "@mui/icons-material/NetworkCell";
import AndroidIcon from "@mui/icons-material/Android";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import { MobileArticleType } from "@/types/mobiles";
import { styled } from "@mui/system";
import { Progress } from "antd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Image from "next/image";

const pros = [
  "Striking, bright and vivid display",
  "Anti-reflective coating is a godsend",
  "Excellent and reliable battery life",
  "Circle to search and Generative Edit are useful tools",
  "Great camera setup, useful 5x periscope lens",
  "Good performance",
  "7 years of software updates",
];

const cons = [
  "Costlier than ever",
  "Unwieldy size, sharp edges",
  "Charging speeds need an upgrade",
  "Some AI features need refinement",
];

const ratings = [
  { label: "Design", value: 1 },
  { label: "Display", value: 2 },
  { label: "Performance", value: 3.5 },
  { label: "Battery", value: 4.5 },
  { label: "Camera", value: 5.5 },
  { label: "Software", value: 6.5 },
  { label: "Sound", value: 7.5 },
  { label: "Usage", value: 8.0 },
  { label: "VFM", value: 9 },
  { label: "VFM", value: 10 },
];
const ExpertViewComponent = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  const colors = [
    "#ff0000", // red for 1
    "#f96500", // orange for 2
    "#db8f00", // yellow for 3
    "#dbaf00", // chartreuse for 4
    "#00ad9f", // green for 5
    "#00c0de", // spring green for 6
    "#b8d833", // cyan for 7
    "#62b299", // azure for 8
    "#62b299", // blue for 9
    "#62b299", // violet for 10
  ];

  return (
    <Grid sx={{ my: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper elevation={0}>
          <Box className="lg:w-3/4" sx={{ padding: 2 }}>
            <Typography sx={{ fontSize: 25, fontWeight: 600 }} variant="h4">
              Expert View
            </Typography>
            <Divider sx={{ my: 2 }} />
            {/* <Typography variant="subtitle2">
                Feb 11, 2024
            </Typography> */}
            <Grid sx={{mb:4}} container spacing={2} alignItems="center">
              {ratings.map((rating) => {
                const fillPercentage = (rating.value / 10) * 100;
                const colorIndex = Math.floor(rating.value) - 1;
                return (
                  <Grid
                    alignItems={"center"}
                    textAlign={"center"}
                    item
                    xs={4}
                    sm={2}
                    key={rating.label}
                  >
                    <Progress
                      style={{ fontSize: "30px" }}
                      strokeColor={colors[colorIndex]}
                      type="circle"
                      percent={(rating.value / 10) * 100}
                      format={(percent) => rating.value}
                      size={40}
                    />
                    <Typography sx={{ textAlign: "center" }} variant="body1">
                      {rating.label}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ display: "flex" }}>
                <Paper sx={{ p: 2, bgcolor: "#f4faf7", flex: 1 }} elevation={0}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={"/expert-view/like.png"}
                      height={25}
                      width={25}
                      style={{ marginBottom: "5px" }}
                      alt="like"
                    />{" "}
                    <Typography
                      sx={{ fontSize: 25, ml: 2, mb: 0.2 }}
                      variant="h6"
                    >
                      <b>P</b>ros
                    </Typography>
                  </Box>
                  <Box  component="ul">
                    {pros.map((pro, index) => (
                      <Typography  component="li" key={index}>
                        {pro}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} style={{ display: "flex" }}>
                <Paper sx={{ p: 2, bgcolor: "#fff8f9", flex: 1 }} elevation={0}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={"/expert-view/dislike.png"}
                      height={25}
                      width={25}
                      style={{ marginBottom: "5px" }}
                      alt="like"
                    />{" "}
                    <Typography
                      sx={{ fontSize: 25, ml: 2, mb: 0.2 }}
                      variant="h6"
                    >
                      <b>C</b>ons
                    </Typography>
                  </Box>
                  <Box className="custom-list" sx={{ pl: 2, listStyleType: 'disc'}} component="ul">
                    {cons.map((con, index) => (
                      <Typography component="li" key={index}>
                        {con}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
};

export default ExpertViewComponent;
