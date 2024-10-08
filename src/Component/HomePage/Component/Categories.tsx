import { CategoryTypes } from "@/types/category";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatForUrlWith_under_score } from "@/utils/utils";

export default function Categories({
  category,
}: {
  category: CategoryTypes[];
}) {
  return (
    <Paper
      className="lg:max-w-[1000px] mx-auto"
      sx={{ mt: 2, mb: 2 }}
      elevation={0}
    >
      <Typography
        sx={{
          fontSize: 25,
          fontWeight: 600,
          mb: 1,
        }}
      >
        Categories
      </Typography>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid gap={1} container>
          {category?.map((value: CategoryTypes, index: number) => (
            <Grid
              item
              key={value.id}
              xs={5.5}
              sm={3.5}
              md={2.5}
              lg={2}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                p: 2,
                borderRadius: "10px",
                bgcolor:
                  index === 0
                    ? "#e8f6ff"
                    : index === 1
                    ? "#eeeeff"
                    : index === 2
                    ? "#fff6df"
                    : index === 3
                    ? "#eef0f5"
                    : index === 4
                    ? "#fff2ea"
                    : index === 5
                    ? "#e8ffe8"
                    : index === 6
                    ? "#e0f7fa"
                    : "#eeeeee",
                ":hover": { bgcolor: "#f584b7" },
              }}
            >
              <Link aria-label={`Category ${value?.title}`} href={`/category/${formatForUrlWith_under_score(value.title)}`}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    mx: "auto",
                  }}
                >
                  {value.title === "Vehicles" ? (
                    <Image
                      alt={value.title}
                      src="/category/car.png"
                      height={40}
                      width={40}
                    />
                  ) : value.title === "News" ? (
                    <Image
                      alt={value.title}
                      src="/category/world-news.png"
                      height={40}
                      width={40}
                    />
                  ) :
                  value.title === "Sports" ? (
                    <Image
                      alt={value.title}
                      src="/category/basketball.png"
                      height={40}
                      width={40}
                    />
                  ) : value.title === "Jobs" ? (
                    <Image
                      alt={value.title}
                      src="/category/case.png"
                      height={40}
                      width={40}
                    />
                  ) : (
                    <Image
                      alt={value.title}
                      src="/category/phone.png"
                      height={40}
                      width={40}
                    />
                  )}
                </Box>
                <Typography variant="body1" mt={1}>
                  {value.title}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
