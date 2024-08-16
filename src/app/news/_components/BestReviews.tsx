import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useRef, useEffect, Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/utils";

const articles = [
  { id: 1, title: "Article 1", image: "/path/to/image1.jpg" },
  { id: 2, title: "Article 2", image: "/path/to/image2.jpg" },
  { id: 3, title: "Article 3", image: "/path/to/image3.jpg" },
  { id: 4, title: "Article 4", image: "/path/to/image4.jpg" },
  { id: 5, title: "Article 5", image: "/path/to/image5.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  { id: 6, title: "Article 6", image: "/path/to/image6.jpg" },
  // Add more articles as needed
];

export default function ArticleSlider({
  bestArticles,
}: {
  bestArticles: RecentArticleDataType[];
}) {
  const [progress, setProgress] = useState(bestArticles.length >=3 ? 0:100);
  const swiperRef = useRef<any>(null);

  const updateProgress = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const totalSlides = swiper.slides.length;
      const visibleSlides = swiper.params.slidesPerView;
      const currentIndex = swiper.activeIndex;
      const progressRatio = (currentIndex + visibleSlides) / totalSlides;
      setProgress(progressRatio);
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.on("slideChange", updateProgress);
      updateProgress(); // Initial update

      return () => {
        swiper.off("slideChange", updateProgress);
      };
    }
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Typography className="text-xl font-bold text-gray-800 mb-4">
        Best Articles
      </Typography>
      <div className="relative">
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        {/* Slider */}
        <Swiper
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={30}
          loop={false}
          onSlideChange={updateProgress}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {bestArticles?.map((article) => (
            <SwiperSlide key={article.id}>
              {/* Content Section */}
              <Grid sx={{ display: "flex" }} container spacing={2}>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <div style={{ width: "100%" }}>
                    <Link
                      href={`/details/${article?.id}/${
                        article.category
                      }`}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                        alt="Article Image"
                        layout="responsive"
                        width={10} // Aspect ratio: width
                        height={40} // Aspect ratio: height
                        className="object-cover"
                      />
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: 12, textAlign: "left" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 text-gray-500 inline-block mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 4h10M4 12h16m-7 4h8m-8 4h8m-8-8h8m-8-4h8"
                      />
                    </svg>
                    {formatDate(article.updateAt)}
                  </Typography>
                  <Link
                    href={`/details/${article?.id}/${
                      article.category
                    }`}
                  >
                    <p className="text-sm font-bold hover:text-red-600 text-gray-700 overflow-hidden text-ellipsis line-clamp-3 text-left">
                      {article.title}
                    </p>
                  </Link>
                  <Link
                    href={`/details/${article?.id}/${
                      article.category
                    }`}
                  >
                    <p className="text-[12px] hover:text-red-600 mt-2 text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
                      {article?.description}
                    </p>
                  </Link>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
