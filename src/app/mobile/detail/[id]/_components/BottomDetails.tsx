"use client";
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MobileArticleType } from "@/types/mobiles";
import CommonFieldDisplay from "./CommonFieldDisplay";

const BottomMobileDetails = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
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
          {accordionDetails.map((item, index) => {
            return (
              <Accordion
                key={index}
                type="multiple"
                defaultValue={[`item-${index}`]}
                className="w-full"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="bg-[#d5e4f7] p-3 mb-4   hover:no-underline pr-2">
                    <Typography sx={{ ml: 2 }}>{item?.name}</Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CommonFieldDisplay
                      details={(mobileArticles as any)[`${item.key}`]}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
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
