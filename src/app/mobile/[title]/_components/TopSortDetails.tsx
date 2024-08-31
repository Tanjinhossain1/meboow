import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import Image from "next/image";
import { MobileArticleType } from "@/types/mobiles";
import { Progress } from "antd";
import { colors } from "@/Component/Mobile/ExpertView";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CameraIcon from "@mui/icons-material/Camera";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext, useEffect, useState } from "react";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import axios from "axios";
import Email from "next-auth/providers/email";
import { formatForUrl } from "@/utils/utils";

const transformStringToTypography = (inputString: string) => {
  // Split the string into value and description based on the first space
  const indexOfSpace = inputString?.indexOf(" ");
  const value = inputString?.substring(0, indexOfSpace);
  const description = inputString?.substring(indexOfSpace + 1);

  return (
    <>
      <Typography variant="body1" className="font-bold">
        {value}
      </Typography>
      <Typography sx={{ fontSize: 12 }} variant="body2">
        {description}
      </Typography>
    </>
  );
};

const transformStringToTypographyForRam = (inputString: string) => {
  // Find the index of the first space after "RAM" to split the value from the description
  const ramIndex = inputString?.indexOf(" RAM");
  const value = inputString?.substring(0, ramIndex + 4); // Include " RAM" in the value
  const description = inputString?.substring(ramIndex + 5); // Everything after " RAM"

  return (
    <>
      <Typography variant="body1" className="font-bold">
        {value}
      </Typography>
      <Typography sx={{ fontSize: 12 }} variant="body2">
        {description}
      </Typography>
    </>
  );
};
const IphoneCard = ({
  mobileDetail,
  isPicture,
  isOpinion,
  user,
}: {
  mobileDetail: MobileArticleType;
  isPicture?: boolean;
  isOpinion?: boolean;
  user?: any;
}) => {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [alreadyFan, setALreadyFan] = useState<boolean>(false);
  const [totalFanCount, setTotalFanCount] = useState<number>(
    mobileDetail?.total_fans ? mobileDetail?.total_fans : 0
  );
  const [is_done, setIs_done] = useState<boolean>(false);

  const colorIndex = Math.floor(+mobileDetail.expert_view.total_score) - 1;
  useEffect(() => {
    if (user && user.email && mobileDetail?.id) {
      axios
        .get(
          `/api/article/mobile/fans?mobileId=${mobileDetail?.id}&email=${user?.email}`
        )
        .then(async (response: any) => {
          console.log("response in register ", response);
          if (response?.data?.data && response?.data?.data[0]) {
            if (is_done) {
              setTotalFanCount(mobileDetail.total_fans + 1);
            }
            // SnackbarOpen("Wow You Become a Fan ❤️", "success");
            setALreadyFan(true);
          }
        })
        .catch((error) => {
          console.log("error in register ", error);
        });
    }
  }, [user, mobileDetail, is_done]);
  const formattedTitle = mobileDetail.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
  return (
    <Card style={{
      background: mobileDetail.top_background_color
    }} className="w-full  mx-auto mt-2 ">
      <Box className=" justify-between items-center p-1 mb-4  ">
        <Typography component="h1" className="font-bold text-xl ">
          {mobileDetail.title}
        </Typography>
        <Box className="flex items-center  ">
          <Typography variant="body2">
            Market Status: {mobileDetail.market_status}
          </Typography>

          <Divider
            orientation="vertical"
            sx={{
              borderColor: "black",
              height: "15px",
              //   mx: "auto",
              mx: 1,
              opacity: 0.5,
            }}
          />
          <Typography variant="body2">
            Released On: {mobileDetail.release_date}
          </Typography>
          <Divider
            orientation="vertical"
            sx={{
              borderColor: "black",
              height: "15px",
              //   mx: "auto",
              mx: 1,
              opacity: 0.5,
            }}
          />
          {mobileDetail.expert_view.total_score ? (
            <Typography
              sx={{ bgcolor: "#f4faf7", px: 2, py: 0.3, borderRadius: 15 }}
              variant="body2"
            >
              <Progress
                //   style={{ fontSize: "30px" }}
                strokeColor={colors[colorIndex]}
                type="circle"
                percent={(+mobileDetail.expert_view.total_score / 10) * 100}
                format={(percent) => +mobileDetail.expert_view.total_score}
                size={15}
              />{" "}
              {mobileDetail.expert_view.total_score} By Expert
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Grid container>
        <Grid item xs={6} sm={3}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobileDetail.display_image}`}
            alt={mobileDetail.title}
            className="  pl-2 h-auto rounded"
            width={180}
            height={180}
          />
        </Grid>
        {/* mobile slider  */}
        <Grid
          item
          xs={6}
           className="bg-transparent"
          sx={{
            width: "100%",
            mb: 2,
            margin: "auto",
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <Swiper
           className="bg-transparent"
            pagination={{ clickable: true }} // Enable clickable pagination dots
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
          >
            <SwiperSlide className="bg-transparent">
              <Grid className="bg-transparent" spacing={1} container>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    gap: 2,
                  }}
                  item
                  xs={12}
                >
                  <CheckBoxOutlineBlankIcon
                    sx={{
                      fontSize: 30,
                      mb: 1,
                    }}
                  />
                  <Box>
                    {" "}
                    {transformStringToTypography(
                      mobileDetail.key_specifications?.pixel
                    )}
                  </Box>
                </Grid>
                <Grid
                  sx={{
                    pl: 0.5,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    borderLeft: "1px solid gray",
                    gap: 2,
                  }}
                  item
                  xs={12}
                >
                  <CameraIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Box>
                    {" "}
                    {transformStringToTypography(
                      mobileDetail.key_specifications?.camera
                    )}
                  </Box>
                </Grid>
                <Grid
                  sx={{
                    pl: 0.5,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    textAlign: "left",
                    borderLeft: "1px solid gray",
                  }}
                  item
                  xs={12}
                >
                  <MemoryIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Box>
                    {" "}
                    {transformStringToTypographyForRam(
                      mobileDetail.key_specifications?.ram_chipset
                    )}
                  </Box>
                </Grid>
                <Grid
                  sx={{
                    pl: 0.5,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    gap: 2,
                    borderLeft: "1px solid gray",
                  }}
                  item
                  xs={12}
                >
                  <BatteryChargingFullIcon sx={{ fontSize: 30, mb: 1 }} />
                  <Box>
                    {" "}
                    {transformStringToTypography(
                      mobileDetail.key_specifications?.battery
                    )}
                  </Box>
                </Grid>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    display={"flex"}
                    gap={1}
                    alignItems={"center"}
                    textAlign={"left"}
                    variant="body2"
                  >
                    {" "}
                    <DateRangeIcon sx={{ fontSize: 20 }} />{" "}
                    {mobileDetail.release_date}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    display={"flex"}
                    gap={1}
                    alignItems={"center"}
                    textAlign={"left"}
                    variant="body2"
                  >
                    {" "}
                    <PhoneAndroidIcon sx={{ fontSize: 20 }} />{" "}
                    {mobileDetail?.key_specifications?.thickness}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    display={"flex"}
                    gap={1}
                    alignItems={"center"}
                    textAlign={"left"}
                    variant="body2"
                  >
                    <CodeIcon sx={{ fontSize: 20 }} />{" "}
                    {mobileDetail.key_specifications.os}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    display={"flex"}
                    gap={1}
                    alignItems={"center"}
                    textAlign={"left"}
                    variant="body2"
                  >
                    <StorageIcon sx={{ fontSize: 20 }} />{" "}
                    {mobileDetail.key_specifications.ram_storage}
                  </Typography>
                </Grid>
              </Grid>
            </SwiperSlide>
          </Swiper>
          <Box
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            onClick={() => {
              if (user) {
                if (!alreadyFan) {
                  axios
                    .put(`/api/article/mobile/details/${mobileDetail?.id}`, {
                      total_fans: mobileDetail?.total_fans
                        ? mobileDetail?.total_fans + 1
                        : 1,
                      id: mobileDetail?.id,
                    })
                    .then(async (response: any) => {
                      console.log("response in register ", response);
                      if (response?.data?.success) {
                        SnackbarOpen("Wow You Become a Fan ❤️", "success");
                        setMouseEnter(true);
                      }
                    })
                    .catch((error) => {
                      console.log("error in register ", error);
                    });
                  axios
                    .post(`/api/article/mobile/fans`, {
                      email: user?.email,
                      mobileId: mobileDetail?.id,
                    })
                    .then(async (response: any) => {
                      console.log("response in register ", response);
                      if (response?.data?.success) {
                        // SnackbarOpen("Wow You Become a Fan ❤️", "success");
                        setMouseEnter(true);
                        setIs_done(true);
                      }
                    })
                    .catch((error) => {
                      console.log("error in register ", error);
                    });
                } else {
                  SnackbarOpen("You ALready Become fan.😍", "warning");
                }
              } else {
                SnackbarOpen("Sorry!😓 Login First to become fan.", "error");
              }
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center",color:"white" }}>
              <FavoriteIcon
                className={`${alreadyFan || mouseEnter ? "text-red-600" : ""}`}
                sx={{ fontSize: 30 }}
              />
              <Typography sx={{ fontSize: 16,color:"white" }}>{totalFanCount}</Typography>
            </Box>
            <Typography sx={{ fontSize: 16,color:"white" }}>BECOME A FAN</Typography>
          </Box>
        </Grid>

        <Grid
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          item
          xs={12}
          sm={9}
        >
          <CardContent>
            <Grid container className="mb-4 ">
              <Grid xs={8}>
                <Typography
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                  variant="body2"
                >
                  {" "}
                  <DateRangeIcon sx={{ fontSize: 16 }} />{" "}
                  {mobileDetail.release_date}
                </Typography>

                <Typography
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                  variant="body2"
                >
                  {" "}
                  <PhoneAndroidIcon sx={{ fontSize: 16 }} />{" "}
                  {mobileDetail?.key_specifications?.thickness}
                </Typography>

                <Typography
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                  variant="body2"
                >
                  <CodeIcon sx={{ fontSize: 16 }} />{" "}
                  {mobileDetail.key_specifications.os}
                </Typography>
                <Typography
                  display={"flex"}
                  gap={1}
                  alignItems={"center"}
                  variant="body2"
                >
                  <StorageIcon sx={{ fontSize: 16 }} />{" "}
                  {mobileDetail.key_specifications.ram_storage}
                </Typography>
              </Grid>
              <Grid sx={{ borderLeft: "1px solid gray" }} xs={0.5}></Grid>
              <Grid xs={3.5}>
                <Box
                  onMouseEnter={() => setMouseEnter(true)}
                  onMouseLeave={() => setMouseEnter(false)}
                  onClick={() => {
                    if (user) {
                      if (!alreadyFan) {
                        axios
                          .put(
                            `/api/article/mobile/details/${mobileDetail?.id}`,
                            {
                              total_fans: mobileDetail?.total_fans
                                ? mobileDetail?.total_fans + 1
                                : 1,
                              id: mobileDetail?.id,
                            }
                          )
                          .then(async (response: any) => {
                            console.log("response in register ", response);
                            if (response?.data?.success) {
                              SnackbarOpen(
                                "Wow You Become a Fan ❤️",
                                "success"
                              );
                              setMouseEnter(true);
                            }
                          })
                          .catch((error) => {
                            console.log("error in register ", error);
                          });
                        axios
                          .post(`/api/article/mobile/fans`, {
                            email: user?.email,
                            mobileId: mobileDetail?.id,
                          })
                          .then(async (response: any) => {
                            console.log("response in register ", response);
                            if (response?.data?.success) {
                              // SnackbarOpen("Wow You Become a Fan ❤️", "success");
                              setMouseEnter(true);
                              setIs_done(true);
                            }
                          })
                          .catch((error) => {
                            console.log("error in register ", error);
                          });
                      } else {
                        SnackbarOpen("You ALready Become fan.😍", "warning");
                      }
                    } else {
                      SnackbarOpen(
                        "Sorry!😓 Login First to become fan.",
                        "error"
                      );
                    }
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <FavoriteIcon
                      className={`${
                        alreadyFan || mouseEnter ? "text-red-600" : ""
                      } text-white `}
                      sx={{ fontSize: 40 }}
                    />
                    <Typography sx={{ fontSize: 16,color:"white" }}>
                      {totalFanCount}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 16,color:"white" }}>BECOME A FAN</Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid container>
              <Grid sx={{ mt: 2.5 }} item xs={3.4}>
                <CheckBoxOutlineBlankIcon sx={{ fontSize: 30, mb: 1 }} />
                {transformStringToTypography(
                  mobileDetail.key_specifications?.pixel
                )}
              </Grid>
              <Grid
                sx={{ mt: 2.4, pl: 0.5, borderLeft: "1px solid gray" }}
                item
                xs={2.5}
              >
                <CameraIcon sx={{ fontSize: 30, mb: 1 }} />
                {transformStringToTypography(
                  mobileDetail.key_specifications?.camera
                )}
              </Grid>
              <Grid
                sx={{ mt: 2.4, pl: 0.5, borderLeft: "1px solid gray" }}
                item
                xs={3.5}
              >
                <MemoryIcon sx={{ fontSize: 30, mb: 1 }} />
                {transformStringToTypographyForRam(
                  mobileDetail.key_specifications?.ram_chipset
                )}
              </Grid>
              <Grid
                sx={{ mt: 2.4, pl: 0.5, borderLeft: "1px solid gray" }}
                item
                xs={2.5}
              >
                <BatteryChargingFullIcon sx={{ fontSize: 30, mb: 1 }} />
                {transformStringToTypography(
                  mobileDetail.key_specifications?.battery
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
      <Grid container>
        <Paper
          elevation={1}
          style={{
            background: mobileDetail.top_background_color
          }}
          className="w-full   flex justify-end gap-2 "
        >
         {mobileDetail?.selected_articles?.id ? (
            <Link href={`/review/${formatForUrl(mobileDetail?.selected_articles?.title)}`}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Review
              </Button>
            </Link>
          ) : null}
          {isOpinion ? null : (
            <Link href={`/mobile/${formattedTitle}/opinion`}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Opinions
              </Button>
            </Link>
          )}
          {isPicture || isOpinion ? (
            <Link href={`/mobile/${formattedTitle}`}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Specification
              </Button>
            </Link>
          ) : null}
          {isPicture ? null : (
            <Link href={`/mobile/${formattedTitle}/pictures`}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Picture
              </Button>
            </Link>
          )}
        </Paper>
      </Grid>
    </Card>
  );
};

export default IphoneCard;
