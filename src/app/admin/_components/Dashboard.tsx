
'use client'
import React from "react";
import { Container, Box, Paper, Typography, Button, Grid } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = ({user}:any) => {
    const router = useRouter()
    if (!user) redirect("/");
  
  return (
    <Container>
      <Button variant="contained" onClick={() => router.push("/")} sx={{ mt: 2 }}>
        Back
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Grid gap={2} container>
          <Grid xs={5.5}>
            <Paper
              onClick={() => router.push("/admin/createArticle")}
              sx={{
                width: "100%",
                p: 2,
                mb: 4,
                cursor: "pointer",
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Create Article
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={5.5}>
            <Paper
              onClick={() => router.push("/admin/createMobileArticle")}
              sx={{
                width: "100%",
                p: 2,
                cursor: "pointer",
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Create Phone Details
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid gap={2} container>
          <Grid xs={5.5}>
            <Link href={`/admin/manage_all_sections/articles`}>
            <Paper 
              sx={{
                width: "100%",
                p: 2,
                mb: 4, 
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Manage Articles
              </Typography>
            </Paper>
            </Link>
          </Grid>
          <Grid xs={5.5}>
            <Link href={`/admin/manage_all_sections/mobile`}>
            <Paper 
              sx={{
                width: "100%",
                p: 2,
                mb: 4, 
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Manage Mobiles
              </Typography>
            </Paper>
            </Link>
          </Grid> 
          <Grid xs={5.5}>
            <Link href={`/admin/manage_all_sections/brands`}>
            <Paper 
              sx={{
                width: "100%",
                p: 2,
                mb: 4, 
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Brands
              </Typography>
            </Paper>
            </Link>
          </Grid> 
          <Grid xs={5.5}>
            <Link href={`/admin/manage_all_sections/category`}>
            <Paper 
              sx={{
                width: "100%",
                p: 2,
                mb: 4, 
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Categories
              </Typography>
            </Paper>
            </Link>
          </Grid> 
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
