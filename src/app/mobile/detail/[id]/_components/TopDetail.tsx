"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MemoryIcon from "@mui/icons-material/Memory";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import NetworkCellIcon from "@mui/icons-material/NetworkCell";
import AndroidIcon from "@mui/icons-material/Android";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MobileArticleType } from "@/types/mobiles";

const specifications = [
  {
    icon: <MemoryIcon />,
    label: "Processor",
    value: "Samsung Exynos Octa core",
  },
  {
    icon: <ScreenSearchDesktopIcon />,
    label: "Display",
    value: '6.5" (16.51 cm) 120Hz Super AMOLED',
  },
  { icon: <CameraAltIcon />, label: "Rear Camera", value: "50+8+2 MP" },
  { icon: <CameraAltIcon />, label: "Front Camera", value: "13 MP" },
  { icon: <SdStorageIcon />, label: "RAM | Storage", value: "6 GB | 128 GB" },
  {
    icon: <BatteryChargingFullIcon />,
    label: "Battery",
    value: "6000 mAh | 25W Fast Charging",
  },
  { icon: <NetworkCellIcon />, label: "Network", value: "Dual SIM: 5G & 5G" },
  { icon: <AndroidIcon />, label: "OS", value: "Android v13" },
];

const TopMobileDetails = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  return (
    <Grid sx={{ my: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper elevation={0}>
          <Box sx={{ padding: 4, color: "#6b6b6b" }}>
            <Typography variant="h4" gutterBottom>
              {mobileArticles?.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Market Status: <b>{mobileArticles.market_status}</b> | Released
              on: <b>{mobileArticles.release_date}</b>
            </Typography>

            <Grid container sx={{ marginBottom: 2 }}>
              <Grid item xs={5} sm={5} md={4} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: {
                      sm: "flex",
                      xs: "none",
                    },
                  }}
                >
                  <Image
                    height={300}
                    width={200}
                    layout="responsive"
                    src={mobileArticles.image[0]}
                    alt={mobileArticles.title}
                    //   style={{ width: "80%" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "60%",
                    display: {
                      sm: "none",
                      xs: "flex",
                    },
                  }}
                >
                  <Image
                    height={300}
                    width={200}
                    layout="responsive"
                    src={mobileArticles.image[0]}
                    alt={mobileArticles.title}
                  />
                </Box>
              </Grid>
              <Grid item xs={7} sm={7} md={8}>
                <Typography variant="h6">Key Specifications</Typography>
                <Grid container spacing={2}>
                  {specifications.map((spec, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {spec.icon}
                        <Box sx={{ marginLeft: 2 }}>
                          <Typography variant="body1">{spec.label}</Typography>
                          <Typography sx={{ fontSize: 12 }} variant="body2">
                            {index === 0
                              ? mobileArticles.key_specifications.processor
                              : index === 1
                              ? mobileArticles.key_specifications.display
                              : index === 2
                              ? mobileArticles.key_specifications.rearCamera
                              : index === 3
                              ? mobileArticles.key_specifications.frontCamera
                              : index === 4
                              ? mobileArticles.key_specifications.ram_storage
                              : index === 5
                              ? mobileArticles.key_specifications.battery
                              : index === 6
                              ? mobileArticles.key_specifications.network
                              : mobileArticles.key_specifications.os}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Grid container>
              {/* <Grid xs={12} md={4}></Grid> */}
              <Grid xs={12}>
                <Divider sx={{ marginY: 2 }} />
                <Box>
                  <Typography
                    sx={{ fontWeight: 600 }}
                    variant="h6"
                    gutterBottom
                  >
                    {mobileArticles.title} Prices
                  </Typography>
                  <Grid gap={1} container>
                    {mobileArticles.prices.map((data,index) => {
                      return (
                        <Grid item xs={12} sm={5.8} xl={5} key={index}>
                          <Paper
                            elevation={0}
                            sx={{ p: 0.8, marginBottom: 2, bgcolor: "#deeff9" }}
                          >
                            <Grid container spacing={2} alignItems="center">
                              <Grid item xs={6}>
                                <Typography>
                                  <b>{data?.gbs}</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sx={{ textAlign: "right" }}>
                                <Typography>
                                  Starting from <b>${data?.start_from}</b>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
};

export default TopMobileDetails;
