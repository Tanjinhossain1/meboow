"use client";
import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Divider, Button } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import NetworkCellIcon from "@mui/icons-material/NetworkCell";
import AndroidIcon from "@mui/icons-material/Android";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import { MobileArticleType } from "@/types/mobiles";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const AllImageDisplaying = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  return (
    <Grid sx={{ my: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper sx={{ p: 4 }} elevation={0}>
          <Box
            // sx={{ m:4 }}
            className="bg-gradient-to-b md:w-3/4  border  from-white  to-slate-200 "
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{ fontSize: 20, fontWeight: 550, ml: 2, mb: 1, mt: 2 }}
              >
                {mobileArticles?.title} - Images
              </Typography>
            </Box>

            <Grid  sx={{ pl: 1, mt: 2, pb: 1, position: "relative" }} container>
              <Grid className="min-w-[100px]   mr-2 flex-shrink-0" xs={2}>
                <Button
                  size="small"
                  sx={{
                    width: "100%",
                    border: "1px solid lightgray",
                    px: 1,
                    borderRadius: 15,
                    bgcolor: "#023359",
                    ":hover":{
                        bgcolor:"white",
                        color:"black"
                    },
                    color: "white",
                  }}
                >
                  All
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="md:w-3/4 border p-10"
          >
            <Swiper
              spaceBetween={10}
              navigation={true}
             
              modules={[FreeMode, Navigation, Thumbs]}
              className={`mySwiper2  `}

            >
              {mobileArticles?.image &&
                mobileArticles?.image?.map((item: string, index: number) => {
                  return (
                    <SwiperSlide style={{ height: "400px" }} key={index}>
                      <Box sx={{ height: "400px" }}>
                        <Image
                          loading="lazy"
                          layout="fill"
                          objectFit="contain"
                          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${item}`}
                          alt={mobileArticles.title}
                        />
                      </Box>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            
          </Box>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
};

export default AllImageDisplaying;
