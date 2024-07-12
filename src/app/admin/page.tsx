"use client";
import React from "react";
import { Container, Box, Paper, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <Container>
      <Button variant="contained" onClick={() => router.back()} sx={{ mt: 2 }}>
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
      </Box>
    </Container>
  );
};

export default Dashboard;
