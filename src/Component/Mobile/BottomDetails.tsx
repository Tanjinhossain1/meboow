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

  const handleNext = () => {
    if (index < accordionDetails.length - 5 && !transitioning) {
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
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper sx={{ p: 2 }} elevation={0}>
          <Typography
            sx={{ fontSize: 30, mb: 1, fontWeight: 600 }}
            variant="h6"
          >
            Specification
          </Typography>

          {/* Render Accordion */}
          <Box className="md:w-3/4    border  mb-2 rounded-b-xl ">
            <Box
              sx={{ mb: 2 }}
              className="bg-gradient-to-b  from-white  to-slate-200 "
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 550, ml: 2, mb: 1, mt: 2 }}
                >
                  {mobileArticles?.title}
                </Typography>
                <div className="flex justify-evenly">
                  <IconButton
                    className="bg-gray-300 mt-2 mr-2"
                    onClick={handlePrev}
                    disabled={index === 0}
                  >
                    <ArrowBackIosIcon className="h-6 w-7" />
                  </IconButton>

                  <IconButton
                    onClick={handleNext}
                    disabled={index >= accordionDetails?.length - 5}
                    className="bg-gray-300 mt-2 mr-2"
                  >
                    <ArrowForwardIosIcon className="h-6 w-6" />
                  </IconButton>
                </div>
              </Box>

              <Grid
                sx={{ pl: 1, mt: 2, pb: 1, position: "relative" }}
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
                      {accordionDetails.map((item, index) => {
                        return (
                          <Grid
                            className="min-w-[100px]   mr-2 flex-shrink-0"
                            key={index}
                            xs={2}
                          >
                            <Link
                              to={`item-${index}`}
                              smooth={true}
                              duration={500}
                            >
                              <Button
                                onClick={() => setSelectedIndex(index)}
                                size="small"
                                sx={{
                                  width: "100%",
                                  border: "1px solid lightgray",
                                  px: 1,
                                  borderRadius: 15,
                                  bgcolor:
                                    selectedIndex === index
                                      ? "#023359"
                                      : "white",
                                  color:
                                    selectedIndex === index ? "white" : "black",
                                }}
                              >
                                {index === 0 ? `Physical` : item?.name}
                              </Button>
                            </Link>
                          </Grid>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Grid>
            </Box>

            {accordionDetails.map((item, index) => {
              return (
                <Accordion
                  id={`item-${index}`}
                  key={index}
                  type="multiple"
                  defaultValue={[`item-${index}`]}
                  className="w-[98%] border m-2  mb-2 rounded-b-xl "
                >
                  <AccordionItem
                    className="border-0 m-0 p-0"
                    value={`item-${index}`}
                  >
                    <AccordionTrigger className="bg-[#d5e4f7]       hover:no-underline pr-2">
                      <Typography sx={{ ml: 2, fontWeight: 600 }}>
                        {item?.name}
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent style={{ margin: 0, padding: 0 }}>
                      <CommonFieldDisplay
                        details={(mobileArticles as any)[`${item.key}`]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </Box>
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }} elevation={0}>
          <Typography
            sx={{ fontSize: 30, mb: 1, fontWeight: 600 }}
            variant="h6"
          >
            Description
          </Typography>

          <CommonFieldDisplay details={mobileArticles.details} />
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
};

export default BottomMobileDetails;
