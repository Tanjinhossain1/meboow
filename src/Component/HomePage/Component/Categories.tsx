import { CategoryTypes } from '@/types/category'
import { Box, Grid, Paper, Typography } from '@mui/material'
import Image from 'next/image' 
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Categories({category}:{category:CategoryTypes[]}) {
    const router = useRouter()
  return (
    <Paper
    className="lg:max-w-[1000px] mx-auto"
    sx={{ mt:2, mb: 2 }}
    elevation={0}
  >
    <Typography
      sx={{
        fontSize: 25,
        // fontFamily: "Arial, sans-serif",
        fontWeight: 600,
        mb: 1,
      }}
    >
      Categories
    </Typography>
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid gap={1} container>
        {category.map((value: CategoryTypes, index: number) => (
          <Grid
            item
            key={value.id}
            xs={5.5}
            sm={3.5}
            md={2.5}
            lg={2}
            onClick={() => router.push(`/category/${value.title}`)}
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
              ) : // <NewspaperIcon sx={{ fontSize: 40 }} />
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
          </Grid>
        ))}
      </Grid>
    </Box>
  </Paper>
  )
}
