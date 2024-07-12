"use client";
import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  Card,
} from "@mui/material";
import Image from "next/image";
import { RecentArticleDataType } from "@/types/RecentArticle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

export default function TopLatestMobile({articles,page,limit}:{articles:RecentArticleDataType[],page:string,limit:string}) {
    const history  = useRouter()
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
    <Paper sx={{ p: 2, mb: 2, width: "100%" }} elevation={0}>
    <Typography sx={{ fontSize: 25, mb: 2, fontWeight: 600 }}>
      Top Latest Mobile
    </Typography>
    <div className="flex justify-center items-center p-4 w-full ">
      <IconButton onClick={handlePrev} disabled={index === 0}>
        <ArrowBackIosIcon className="h-6 w-7" />
      </IconButton>
      <div className="w-full overflow-hidden relative">
        <div
          className={`flex transition-transform duration-500 ${
            transitioning ? "ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${(index * 100) / 5}%)` }} // Adjusting the transform percentage
        >
          {articles &&
            articles.map((data: RecentArticleDataType) => {
              return (
                <Card key={data.id} className="m-2 w-2/12 flex-shrink-0">
                  {" "}
                  {/* Ensuring 5 items are shown */}
                  <Image
                    style={{ cursor: "pointer" }}
                    alt=""
                    src={data.image}
                    width={200}
                    height={100}
                    onClick={() => {
                      const joinTitle = data.title
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join("-");
                      history.push(
                        `/details/${data.id}/${
                          data.category
                        }/${joinTitle}?${new URLSearchParams({
                          page: `${Number(page) + 1}`,
                          limit: limit,
                        })}`,
                        {
                          scroll: false,
                        }
                      );
                    }}
                  />
                  <Typography>{data?.deviceName}</Typography>
                </Card>
              );
            })}
        </div>
      </div>
      <IconButton
        onClick={handleNext}
        disabled={index >= articles.length - 5}
      >
        <ArrowForwardIosIcon className="h-6 w-6" />
      </IconButton>
    </div>
  </Paper>
  )
}
