"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MobileArticleType } from "@/types/mobiles";

import "./mobilestyles.css";
import CommonFieldDisplay from "./CommonFieldDisplay";
import { Link, animateScroll as scroll } from "react-scroll";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NewCommonFieldDisplay from "./NewCommonFieldDisplay";

const BottomMobileDetails = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const accordionDetails = [
    {
      name: "Physical Specification",
      key: "physicalSpecification",
    },
    {
      name: "Network",
      key: "network",
    },
    {
      name: "Display",
      key: "display",
    },
    {
      name: "Processor",
      key: "processor",
    },
    {
      name: "Memory",
      key: "memory",
    },
    {
      name: "Main Camera",
      key: "mainCamera",
    },
    {
      name: "Selfie Camera",
      key: "selfieCamera",
    },
    {
      name: "OS",
      key: "os",
    },
    {
      name: "Connectivity",
      key: "connectivity",
    },
    {
      name: "Features",
      key: "features",
    },
  ];

  const extractedData = mobileArticles?.content?.blocks
    .filter((item: any) => item.type === "table" && item.data.withHeadings)
    .map((item: any) => item.data.content[0][0]); // Extract the first string of the first row and first index

  const handleNext = () => {
    if (index < extractedData?.length - 5 && !transitioning) {
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
    <Grid sx={{ my: 1 }} container>
      <Typography sx={{ fontSize: 23, mb: 1, fontWeight: 600 }} variant="h6">
        Specification
      </Typography>
      <Grid container className="w-full   border  mb-2 rounded-b-xl ">
        <Grid
          sx={{ mb: 2 }}
          xs={12}
          className="bg-gradient-to-b  from-white  to-slate-200 "
        >
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: 17, fontWeight: 550, ml: 2, mb: 1, mt: 2 }}
            >
              {mobileArticles?.title}
            </Typography>
            <div className="flex justify-evenly">
              <IconButton
                 
                onClick={handlePrev}
                disabled={index === 0}
              >
                <ArrowBackIosIcon className="h-5 w-5" />
              </IconButton>

              <IconButton
                onClick={handleNext}
                disabled={index >= extractedData?.length - 5}
                 
              >
                <ArrowForwardIosIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </Grid>

          <Grid
          xs={12}
            sx={{
              pl: 1,
              position: "relative",
              mb:1
              // width: "100%", // Set the Grid width to 100%
            }}
            container
          >
            <div className="flex justify-center items-center w-full ">
              <div className="w-full overflow-hidden relative">
                <div
                  className={`flex w-full transition-transform duration-500 ${
                    transitioning ? "ease-in-out" : ""
                  }`}
                  style={{
                    transform: `translateX(-${(index * 100) / 5}%)`,
                  }} // Adjusting the transform percentage
                >
                  {extractedData.map((item: string, index: number) => {
                    return (
                      <Grid
                        className="min-w-[100px]  mr-2 flex-shrink-0"
                        key={index}
                        xs={2}
                      >
                        <Link to={`item-${item}`} smooth={true} duration={500}>
                          <Button
                            onClick={() => setSelectedIndex(index)}
                            size="small"
                            sx={{
                              width: "100%",
                              border: "1px solid lightgray",
                              // px: 0.5,
                              // pt:0.5,
                              p:0,
                              pt:0.3,
                              borderRadius: 15,
                              fontSize:11,
                              bgcolor:
                                selectedIndex === index ? "#023359" : "white",
                              color:
                                selectedIndex === index ? "white" : "black",
                            }}
                          >
                            {item}
                          </Button>
                        </Link>
                      </Grid>
                    );
                  })}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        {mobileArticles?.content ? (
          <NewCommonFieldDisplay details={mobileArticles?.content} />
        ) : null}
      </Grid>
      {
        mobileArticles?.details?.blocks &&  mobileArticles?.details?.blocks[0] ?
        <Paper sx={{ p: 2, mt: 2 }} elevation={0}>
        <Typography sx={{ fontSize: 30, mb: 1, fontWeight: 600 }} variant="h6">
          Description
        </Typography>
        <CommonFieldDisplay details={mobileArticles.details} />
      </Paper>
      : null}
    </Grid>
  );
};

export default BottomMobileDetails;
