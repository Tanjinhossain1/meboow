import React from "react";
import { Container, Box, Paper, Typography, Button, Grid } from "@mui/material";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Dashboard = async () => {
  // const router = useRouter();

  const session = await auth();
  const user = session?.user; 

  if (!user) redirect("/");
  return (
    <Container>
      <Button variant="contained" onClick={() => redirect('/')} sx={{ mt: 2 }}>
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
              onClick={() => redirect("/admin/createArticle")}
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
              onClick={() => redirect("/admin/createMobileArticle")}
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
