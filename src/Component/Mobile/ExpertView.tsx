"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { MobileArticleType } from "@/types/mobiles";
import { Progress } from "antd";
import Image from "next/image";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useRouter } from "next/navigation";
import { formatDate_into_month_date_string } from "@/utils/utils";
 
const ExpertViewComponent = ({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType;
}) => {
  const router = useRouter();
  const colors = [
    "#ff0000", // red for 1
    "#f96500", // orange for 2
    "#db8f00", // yellow for 3
    "#dbaf00", // chartreuse for 4
    "#00ad9f", // green for 5
    "#00c0de", // spring green for 6
    "#b8d833", // cyan for 7
    "#62b299", // azure for 8
    "#62b299", // blue for 9
    "#62b299", // violet for 10
  ];
  console.log('mobileArticles  ',mobileArticles)
  const transformKey = (key:string) => {
    return key
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  return (
    <Grid sx={{ my: 1 }} container>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
      <Grid xs={12} md={10} lg={9.8} xl={7}>
        <Paper elevation={0}>
          <Box className="lg:w-3/4" sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
             <Box>
             <Typography sx={{ fontSize: 25, fontWeight: 600 }} variant="h4">
                Expert View
              </Typography>
              <Typography sx={{ fontSize: 12,color:"gray" }}  >
                on {formatDate_into_month_date_string(mobileArticles.updatedAt)}
              </Typography>
              </Box>
              <Box
                sx={{
                  // display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
                  mt: 2,
                  border: "1px solid #75b09a",
                  borderRadius: 1,
                  bgcolor: "#f4faf7",
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Grid alignItems={"center"} xs={12} container>
                  <Grid xs={2}>
                    <Progress
                      // style={{ fontSize: "30px" }}
                      strokeColor={"#62b299"}
                      type="circle"
                      percent={(8 / 10) * 100}
                      format={(percent) => undefined}
                      size={25}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                      sx={{ fontSize: 18, ml: 1 }}
                    >
                      <b>{mobileArticles?.expert_view?.total_score}</b>/<span>10</span>
                    </Typography>
                  </Grid>
                  <Grid xs={4}>
                    <Box>
                      <Typography
                        variant="caption"
                        component="div"
                        color="textSecondary"
                        sx={{ fontSize: 12, m: 0, ml: 1 }}
                      >
                        Expert
                      </Typography>
                      <Typography
                        variant="caption"
                        component="div"
                        color="textSecondary"
                        sx={{ fontSize: 12, m: 0, ml: 1, mt: -0.8 }}
                      >
                        Score
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            {/* <Typography variant="subtitle2">
                Feb 11, 2024
            </Typography> */}
            <Grid sx={{ mb: 4 }} container spacing={2} alignItems="center">
              {Object.entries(mobileArticles?.expert_view?.specific_score)?.map(([key, value]) => {
                const fillPercentage = (+value / 10) * 100;
                const colorIndex = Math.floor(+value) - 1;
                return (
                 value > 0 ? <Grid
                    alignItems={"center"}
                    textAlign={"center"}
                    item
                    xs={4}
                    sm={2}
                    key={key}
                  >
                    <Progress
                      style={{ fontSize: "30px" }}
                      strokeColor={colors[colorIndex]}
                      type="circle"
                      percent={(+value / 10) * 100}
                      format={(percent) => +value}
                      size={40}
                    />
                    <Typography sx={{ textAlign: "center" }} variant="body1">
                      {key === "physicalSpecification" ? "Physical" : transformKey(key)}
                    </Typography>
                  </Grid>:null
                );
              })}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} style={{ display: "flex" }}>
                <Paper sx={{ p: 2, bgcolor: "#f4faf7", flex: 1 }} elevation={0}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={"/expert-view/like.png"}
                      height={25}
                      width={25}
                      style={{ marginBottom: "5px" }}
                      alt="like"
                    />{" "}
                    <Typography
                      sx={{ fontSize: 25, ml: 2, mb: 0.2 }}
                      variant="h6"
                    >
                      <b>P</b>ros
                    </Typography>
                  </Box>
                  <Box
                    className="custom-list-pros"
                    sx={{ pl: 2, listStyleType: "disc" }}
                    component="ul"
                  >
                    {mobileArticles?.expert_view?.pros.map((pro:{list:string}, index) => (
                      <Typography component="li" key={index}>
                        {pro.list}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} style={{ display: "flex" }}>
                <Paper sx={{ p: 2, bgcolor: "#fff8f9", flex: 1 }} elevation={0}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={"/expert-view/dislike.png"}
                      height={25}
                      width={25}
                      style={{ marginBottom: "5px" }}
                      alt="like"
                    />{" "}
                    <Typography
                      sx={{ fontSize: 25, ml: 2, mb: 0.2 }}
                      variant="h6"
                    >
                      <b>C</b>ons
                    </Typography>
                  </Box>
                  <Box
                    className="custom-list-cons"
                    sx={{ pl: 2, listStyleType: "disc" }}
                    component="ul"
                  >
                    {mobileArticles?.expert_view?.cons.map((con:{list:string}, index) => (
                      <Typography component="li" key={index}>
                        {con.list}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <Image
                  alt="verdict"
                  src={"/comment.png"}
                  width={30}
                  height={10}
                />
                <Typography sx={{ fontSize: 23, fontWeight: 600, ml: 2 }}>
                  Verdict
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 15 }}>
                {mobileArticles?.expert_view?.verdict}
              </Typography>
              <Typography
                onClick={() => router.push(mobileArticles?.expert_view?.article_urls)}
                sx={{
                  textAlign: "end",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#007fdb",
                  ":hover": {
                    textDecoration: "underline",
                    textDecorationColor: "#007fdb",
                  },
                }}
              >
                Read {mobileArticles?.title} Review
                <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 20 }} />
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid xs={0} md={1} lg={1.1} xl={2.5}></Grid>
    </Grid>
  );
};

export default ExpertViewComponent;
