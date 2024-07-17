import { useState } from "react";
import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  MobileStepper,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { MobileArticleType } from "@/types/mobiles";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const ImageDisplay = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImageStatus, setIsSelectedImageStatus] =
    useState<boolean>(false);
  const [selectIndexForDialog, setSelectedIndexForDialog] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (index: number) => {
    setSelectedIndexForDialog(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setThumbsSwiper(null);
  };

  const handleMouseEnter = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setCurrentIndex(selectedIndex);
  };
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % mobileArticles.image.length
    );
    setSelectedIndex(
      (prevIndex) => (prevIndex + 1) % mobileArticles.image.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + mobileArticles.image.length) %
        mobileArticles.image.length
    );
    setSelectedIndex(
      (prevIndex) =>
        (prevIndex - 1 + mobileArticles.image.length) %
        mobileArticles.image.length
    );
  };
  return (
    <Grid item xs={12} sm={5} md={4} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          height: "500px",
          py: 4,
          mx: 4,
        }}
      >
        <Box
          onClick={handlePrev}
          sx={{
            ":hover": {
              bgcolor: "lightgray",
              borderRadius: 15,
              fontSize: 15,
              textAlign: "center",
              p: 1,
              cursor: "pointer",
            },
            p: 1,
          }}
        >
          <ArrowBackIosIcon />
        </Box>

        <Box
          sx={{
            width: "70%",
            height: "70%",
            maxWidth: 300,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            loading="lazy"
            height={300}
            width={300}
            src={mobileArticles.image[currentIndex]}
            alt={mobileArticles.title}
            onClick={() => handleClickOpen(currentIndex)}
          />
        </Box>

        <Box
          onClick={handleNext}
          sx={{
            ":hover": {
              bgcolor: "lightgray",
              borderRadius: 15,
              fontSize: 15,
              textAlign: "center",
              p: 1,
              cursor: "pointer",
            },
            p: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </Box>
      </Box>
      <Grid container>
        <Grid xs={3}></Grid>
        <Grid alignItems="center" xs={4}>
          <MobileStepper
            variant="dots"
            steps={mobileArticles?.image?.length}
            position="static"
            activeStep={currentIndex}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={<></>}
            backButton={<></>}
          />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{ mt: 2 }}
        onMouseLeave={handleMouseLeave}
      >
        {mobileArticles.image.slice(0, 4).map((item, index) => (
          <Grid
            item
            xs={4.5}
            sm={2.5}
            md={2.5}
            key={index}
            sx={{ width: 30, height: 60 }}
            className="p-4 m-1 bg-gray-200 rounded-lg"
            onClick={() => handleClickOpen(index)}
          >
            <div
              className="h-11 mx-auto sm:ml-3 bg-card rounded-lg flex items-center justify-center"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Image
                loading="lazy"
                height={200}
                width={200}
                className="w-6 sm:w-6 md:w-8 lg:w-6 h-full"
                src={item}
                alt={mobileArticles.title}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => setIsSelectedImageStatus(true)}
          >
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {mobileArticles?.image &&
                mobileArticles?.image?.map((item: string, index: number) => {
                  return (
                    <SwiperSlide style={{ height: "500px" }} key={index}>
                      <Box sx={{ height: "500px" }}>
                        <Image
                          loading="lazy"
                          height={200}
                          width={200}
                          //   layout="responsive"
                          src={
                            !selectedImageStatus
                              ? mobileArticles.image[selectIndexForDialog]
                              : item
                          }
                          alt={mobileArticles.title}
                        />
                      </Box>
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={10}
              freeMode={true}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 10,
                },
              }}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {mobileArticles?.image &&
                mobileArticles?.image?.map((item: string, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <Box
                        sx={{ width: 80, height: 80 }}
                        className=" pt-2 pl-3 m-1 bg-gray-200 rounded-lg flex-shrink-0"
                        key={index}
                      >
                        <div
                          className="w-8 h-16  mx-auto sm:ml-3 bg-card rounded-lg flex items-center justify-center"
                        >
                          <Image
                            loading="lazy"
                            height={50}
                            width={50}
                            className="w-full h-full"
                            src={item}
                            alt={mobileArticles.title}
                          />
                        </div>
                      </Box>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default ImageDisplay;
