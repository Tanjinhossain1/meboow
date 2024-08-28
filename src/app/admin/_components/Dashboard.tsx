"use client";
import React from "react";
import { Container, Box, Paper, Typography, Button, Grid } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = ({ user }: any) => {
  const router = useRouter();
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <Container className="md:max-w-[1000px] mx-auto">
      <Link href="/">
        <Button variant="contained" sx={{ mt: 2 }}>
          Back
        </Button>
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Grid gap={2} container>
          <Grid xs={3.5}>
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
          <Grid xs={3.5}>
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
       {
        user?.role === "admin" ? <> <Grid xs={3.5}>
        <Link href={`/admin/network-bands`}>
          <Paper
            sx={{
              width: "100%",
              p: 2,
              mb: 4,
              ":hover": { bgcolor: "lightgray" },
            }}
          >
            <Typography variant="h6" component="h2">
              Create Network Bands
            </Typography>
          </Paper>
        </Link>
      </Grid>
      <Grid xs={3.5}>
        <Link href={`/admin/glossary`}>
          <Paper
            sx={{
              width: "100%",
              p: 2,
              mb: 4,
              ":hover": { bgcolor: "lightgray" },
            }}
          >
            <Typography variant="h6" component="h2">
              Create Glossary
            </Typography>
          </Paper>
        </Link>
      </Grid></> : null
       }
        </Grid>
        <Grid gap={2} container>
        <Grid xs={12}>
          <Typography sx={{ fontSize: 24 ,fontWeight:600}}>Manages</Typography>
        </Grid>
          <Grid xs={3.5}>
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
          <Grid xs={3.5}>
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
          <Grid xs={3.5}>
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
          <Grid xs={3.5}>
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
         {
          user?.role === "admin" ? 
          <> <Grid xs={3.5}>
          <Link href={`/admin/manage_all_sections/network-bands`}>
            <Paper
              sx={{
                width: "100%",
                p: 2,
                mb: 4,
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Network Bands
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid xs={3.5}>
          <Link href={`/admin/manage_all_sections/glossary`}>
            <Paper
              sx={{
                width: "100%",
                p: 2,
                mb: 4,
                ":hover": { bgcolor: "lightgray" },
              }}
            >
              <Typography variant="h6" component="h2">
                Glossary
              </Typography>
            </Paper>
          </Link>
        </Grid></> : null
         }
          {user?.role === "admin" ? (
            <Grid xs={3.5}>
              <Link href={`/admin/manage_all_sections/users`}>
                <Paper
                  sx={{
                    width: "100%",
                    p: 2,
                    mb: 4,
                    ":hover": { bgcolor: "lightgray" },
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Users
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
