"use client";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MobileArticleType, MobileOpinionType } from "@/types/mobiles";
import axios from "axios";
import BackdropProviderContext from "@/Component/BackdropProvider";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import { useRouter } from "next/navigation";
import { formatDate, formatForUrl } from "@/utils/utils";
import { RecentArticleDataType } from "@/types/RecentArticle";

export default function Opinion({
  mobileDetail,
  user,
  allMobilesOpinion,
  isArticle,
  articleDetail,
}: {
  mobileDetail?: MobileArticleType;
  allMobilesOpinion?: MobileOpinionType[];
  user: any;
  isArticle?: boolean;
  articleDetail?: RecentArticleDataType;
}) {
  const router = useRouter();
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);
  const formattedTitle = mobileDetail?.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

  const methods = useForm({
    defaultValues: user
      ? {
          name: user?.fullName,
          email: user?.email,
          comments: "",
        }
      : {
          name: "",
          email: "",
          comments: "",
        },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    handleOpen();
    const finalValue = {
      ...data,
      mobileId: mobileDetail?.id,
    };
    const finalValueArticle = {
      ...data,
      articleId: articleDetail?.id,
    };
    axios
      .post(
        isArticle ? `/api/article/opinion` : `/api/article/mobile/opinion`,
        isArticle ? finalValueArticle : finalValue
      )
      .then((response) => {
        console.log("Oninion created successfully:", response);
        // Do something with the response if needed
        if (response?.data?.success) {
          handleClose();
          SnackbarOpen("Successfully Post Your Opinion", "success");
          router.push(
            isArticle
              ? articleDetail?.category === "Mobiles"
                ? `/review/${formatForUrl(articleDetail?.title)}`
                : `/article/${formatForUrl(
                    articleDetail?.title ? articleDetail?.title : ""
                  )}`
              : `/mobile/${formattedTitle}/opinion`
          );
        }
      })
      .catch((err) => {
        console.error("Error creating article:", err);
        SnackbarOpen(err?.message || "Error Post Your Opinion", "error");
        handleClose();
        // Handle error if needed
      });
    console.log(finalValue);
  };
  return (
    <Grid container>
      <Grid
        sx={{
          mt: 2,
          border: "1px solid gray",
          mx: "auto",
          width: isArticle ? "100%" : "90%",
          mb: 4,
        }}
        container
      >
        <Paper sx={{ width: "100%" }} elevation={1}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, p: 1 }}>
            {mobileDetail?.title} - <i>USER OPINIONS AND REVIEWS</i>
          </Typography>
        </Paper>
        <Grid sx={{ bgcolor: "lightgray" }} container>
          {allMobilesOpinion && allMobilesOpinion[0] ? null : (
            <Typography sx={{ textAlign: "center" }}>No Opinion Yet</Typography>
          )}
          {allMobilesOpinion?.map(
            (comment: MobileOpinionType, index: number) => (
              <Paper
                key={comment?.id}
                sx={{ width: "100%", mt: index >= 1 ? 3 : 1 }}
                elevation={1}
              >
                <Grid sx={{ p: 1 }} key={comment.id} container>
                  <Grid xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#E91E63" }}>
                          {comment.name.slice(0, 1)}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {comment.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {formatDate(comment.updatedAt)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Typography sx={{ mt: 1 }}>{comment.comments}</Typography>
                </Grid>
              </Paper>
            )
          )}
        </Grid>
      </Grid>
      <Grid sx={{ mt: isArticle ? 3 : 0 }} xs={12}>
        <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
          {isArticle ? "Post Your Opinion" : "Give your Opinion"}
        </Typography>
      </Grid>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
          className={isArticle ? `w-full` : `md:w-3/4 mx-auto`}
        >
          <Grid gap={2} container>
            <Grid xs={12} md={5.8}>
              <TextField
                size="small"
                fullWidth
                label="Name"
                variant="outlined"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message as string}
              />
            </Grid>
            <Grid xs={12} md={5.8}>
              <TextField
                size="small"
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message as string}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Comments"
                variant="outlined"
                multiline
                rows={4}
                {...register("comments", { required: "Comments are required" })}
                error={!!errors.comments}
                helperText={errors.comments?.message as string}
              />
            </Grid>
          </Grid>

          <Button
            sx={{ bgcolor: "#023359" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            POST OPINION
          </Button>
        </Box>
      </FormProvider>
    </Grid>
  );
}
