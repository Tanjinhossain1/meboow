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
  { label: "Design", value: 9.0 },
  { label: "Display", value: 9.0 },
  { label: "Performance", value: 8.5 },
  { label: "Battery", value: 9.0 },
  { label: "Camera", value: 8.5 },
  { label: "Software", value: 9.0 },
  { label: "Sound", value: 8.5 },
  { label: "Usage", value: 9.0 },
  { label: "VFM", value: 7.5 },
];
const ExpertViewComponent = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  return (
    <Grid sx={{ my: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper elevation={0}>
          <Box sx={{ padding: 2 }}>
            <Typography sx={{ fontSize: 25, fontWeight: 600 }} variant="h4">
              Expert View
            </Typography>
            {/* <Typography variant="subtitle2">
                Feb 11, 2024
            </Typography> */}
            <Grid container spacing={2} alignItems="center">
              {ratings.map((rating) => {
                const fillPercentage = (rating.value / 10) * 100;
                return (
                  <Grid item xs={4} sm={2} key={rating.label}>  
                   
                     <Progress
                      strokeColor={rating.value > 8 ? "#d631c6" : "#10eb5d"}
                      type="circle"
                      percent={(rating.value / 10) * 100} 
                      format={percent => rating.value }
                      size={50}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Pros</Typography>
                    <Box component="ul" sx={{ paddingLeft: 2 }}>
                      {pros.map((pro, index) => (
                        <Typography component="li" key={index}>
                          {pro}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Cons</Typography>
                    <Box component="ul" sx={{ paddingLeft: 2 }}>
                      {cons.map((con, index) => (
                        <Typography component="li" key={index}>
                          {con}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
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
