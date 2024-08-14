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
}: {
  mobileDetail: MobileArticleType;
  isPicture?: boolean;
  isOpinion?: boolean;
}) => {
  const colorIndex = Math.floor(+mobileDetail.expert_view.total_score) - 1;
  return (
    <Card className="w-full  mx-auto mt-2  ">
      <Box className=" justify-between items-center p-1 mb-4  ">
        <Typography className="font-bold text-xl ">
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
            pagination={{ clickable: true }} // Enable clickable pagination dots
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
          >
            <SwiperSlide>
              <Grid spacing={1} container>
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
            <Box className="mb-4">
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
            </Box>

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
          className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 flex justify-end gap-2 "
        >
          {mobileDetail?.key_specifications?.review ? (
            <Link href={mobileDetail?.key_specifications?.review}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Review
              </Button>
            </Link>
          ) : null}
          {isOpinion ? null : (
            <Link href={`/mobile/detail/${mobileDetail?.id}/opinion`}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Opinions
              </Button>
            </Link>
          )}
          {isPicture || isOpinion ? (
            <Link href={`/mobile/detail/${mobileDetail?.id}`}>
              <Button sx={{ color: "white" }} className="hover:bg-red-600 px-3">
                Specification
              </Button>
            </Link>
          ) : null}
          {isPicture ? null : (
            <Link href={`/mobile/detail/${mobileDetail?.id}/pictures`}>
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
