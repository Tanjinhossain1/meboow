import { useState } from "react";
import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  Slider,
  MobileStepper,
  IconButton,
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

import "./styles.css";

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

  const [open, setOpen] = useState(false);

  const [SliderIndex, setSliderIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleSliderNext = () => {
    if (SliderIndex < mobileArticles?.image?.length - 5 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setSliderIndex((prevIndex) => prevIndex + 2);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
  };

  const handleSliderPrev = () => {
    if (SliderIndex > 0 && !transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setSliderIndex((prevIndex) => prevIndex - 5);
        setTransitioning(false);
      }, 500); // Match with the transition duration
    }
  };

  const handleClickOpen = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setCurrentIndex(selectedIndex);
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setCurrentIndex(index);
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

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSelectedIndex(newValue);
    }
  };
  console.log("currentIndex ", currentIndex, selectedIndex);
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
            // display: { sm: "flex", xs: "none" },
          }}
        >
          <ArrowBackIosIcon />
        </Box>

        <Box
          sx={{
            width: "70%",
            height: "70%",
            maxWidth: 300,
            // mx: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            height={300}
            width={300}
            src={mobileArticles.image[currentIndex]}
            alt={mobileArticles.title}
            onClick={() => handleClickOpen(currentIndex)}
            // style={{ objectFit: "cover" }}
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
            // display: { sm: "flex", xs: "none" },
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
          >
            <div
              className="h-11 mx-auto sm:ml-3 bg-card rounded-lg flex items-center justify-center"
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => {
                handleClick(index);
                handleClickOpen(index);
              }}
            >
              <Image
                height={200}
                width={200}
                className="w-6 sm:w-6 md:w-8 lg:w-6 h-full"
                src={item}
                alt={mobileArticles.title}
                // style={{ objectFit: "cover" }}
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
                    <SwiperSlide style={{height:"500px"}} key={index}>
                      <Box sx={{ height: "500px" }}>
                        <Image
                          height={200}
                          width={200}
                          //   layout="responsive"
                          src={item}
                          alt={mobileArticles.title}
                          //   style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <Swiper
              onSwiper={(swiper) => setThumbsSwiper(swiper)}
              spaceBetween={10}
              slidesPerView={10}
              freeMode={true}
              breakpoints={{
                0:{
                    slidesPerView: 3,
                },
                640: {  // screens >= 640px
                  slidesPerView: 3,
                },
                768: {  // screens >= 768px
                  slidesPerView: 5,
                },
                1024: { // screens >= 1024px
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
                          //   onMouseEnter={() => handleMouseEnter(index)}
                          onClick={() => {
                            handleClick(index);
                            handleClickOpen(index);
                          }}
                        >
                          <Image
                            height={50}
                            width={50}
                            className="w-full h-full"
                            src={item}
                            alt={mobileArticles.title}
                            // style={{ objectFit: "cover" }}
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

// import { useState } from "react";
// import { Grid, Box } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import Image from "next/image";
// import { MobileArticleType } from "@/types/mobiles";

// const ImageDisplay = ({
//   mobileArticles,
// }: {
//   mobileArticles: MobileArticleType;
// }) => {
//   const [currentImage, setCurrentImage] = useState(mobileArticles.image[0]);
//   const [selectedImage, setSelectedImage] = useState(mobileArticles.image[0]);

//   const handleMouseEnter = (image: any) => {
//     console.log('first image hover   ',image)
//     setCurrentImage(image);
//   };

//   const handleMouseLeave = () => {
//     setCurrentImage(selectedImage);
//   };

//   const handleClick = (image: any) => {
//     setSelectedImage(image);
//     setCurrentImage(image);
//   };

//   return (
//     <Grid item xs={4.5} sm={5} md={4} sx={{ textAlign: "center" }}>
//       <Box
//         sx={{
//           textAlign: "center",
//           display: "flex",
//           alignItems: "center",
//           height: "500px",
//         //   width: {
//         //     xs: "350px",
//         //   },
//           py: 4,
//           mx: {
//             xs:0,
//             sm:3
//           },
//           //     sm:{

//           //   },

//         }}
//       >
//         <Box
//           sx={{
//             ":hover": {
//               bgcolor: "lightgray",
//               borderRadius: 15,
//               fontSize: 15,
//               textAlign: "center",
//               p: 1,
//             },
//             p: 1,
//             display: { sm: "flex", xs: "none" },
//           }}
//         >
//           <ArrowBackIosIcon sx={{ textAlign: "center" }} />
//         </Box>

//         <Box
//           sx={{
//             width: "70%",
//             height: "70%",
//             maxWidth: 300,
//             mx: "auto",
//             display: { sm: "flex", xs: "none" },
//             alignItems: "center",
//           }}
//         >
//           <Image
//             height={300}
//             width={300}
//             // layout="responsive"
//             src={currentImage}
//             alt={mobileArticles.title}
//             // style={{ objectFit: "cover" }}
//           />
//         </Box>
//         <Box
//           sx={{
//             width: "350px",
//             maxWidth: 300,
//             height: "300px",
//             // mx: "auto",
//             // height: "100%",
//             display: { sm: "none", xs: "flex" },
//           }}
//         >
//           <Image
//             height={300}
//             width={300}
//             // layout="responsive"
//             src={currentImage}
//             alt={mobileArticles.title}
//             // style={{ objectFit: "cover" }}
//           />
//         </Box>
//         <Box
//           sx={{
//             ":hover": {
//               bgcolor: "lightgray",
//               borderRadius: 15,
//               fontSize: 15,
//               textAlign: "center",
//               p: 1,
//             },
//             p: 1,
//             display: { sm: "flex", xs: "none" },
//           }}
//         >
//           <ArrowForwardIosIcon sx={{ textAlign: "center" }} />
//         </Box>
//       </Box>

//       <Grid
//         container
//         spacing={1}
//         justifyContent="center"
//         sx={{ mt: 2 }}
//         onMouseLeave={handleMouseLeave}
//       >
//         {mobileArticles.image.slice(0, 4).map((item, index) => (
//           <Grid
//             item
//             xs={4.5}
//             sm={2.5}
//             md={2.5}
//             key={index}
//             sx={{ width: 30, height: 60 }}
//             className="p-4 m-1   bg-gray-200 rounded-lg"
//           >
//             <div
//               className="h-11  mx-auto ml:1 sm:ml-3 bg-card rounded-lg flex items-center justify-center"
//               onMouseEnter={() => handleMouseEnter(item)}
//               onClick={() => handleClick(item)}
//             >
//               <Image
//                 height={200}
//                 width={200}
//                 className="w-full sm:w-6    md:w-8 lg:w-6 h-full  "
//                 src={item}
//                 alt={mobileArticles.title}
//                 // style={{ objectFit: "cover" }}
//               />
//             </div>
//           </Grid>
//         ))}
//       </Grid>
//     </Grid>
//   );
// };

// export default ImageDisplay;
