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
import { formatDate } from "@/utils/utils";

export default function Opinion({
  mobileDetail,
  user,
  allMobilesOpinion,
}: {
  mobileDetail: MobileArticleType;
  allMobilesOpinion?: MobileOpinionType[];
  user: any;
}) {
  const router = useRouter();
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

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
    axios
      .post(`/api/article/mobile/opinion`, finalValue)
      .then((response) => {
        console.log("Article created successfully:", response);
        // Do something with the response if needed
        if (response?.data?.success) {
          handleClose();
          SnackbarOpen("Successfully Post Your Opinion", "success");
          router.push(`/mobile/detail/${mobileDetail?.id}/opinion`);
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
    <Fragment>
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            Opinion
          </Typography>
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt:2,
          }}
          className="md:w-3/4 mx-auto"
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
      <Grid
        sx={{ mt: 2, border: "1px solid gray", mx: "auto", width: "90%" }}
        container
      >
        <Paper sx={{ width: "100%" }} elevation={1}>
          <Typography sx={{ fontSize: 20, fontWeight: 600, p: 1 }}>
            {mobileDetail?.title} - USER OPINIONS AND REVIEWS
          </Typography>
        </Paper>
        <Grid sx={{ bgcolor: "lightgray" }} container>
          {allMobilesOpinion?.map((comment: MobileOpinionType,index:number) => (
            <Paper sx={{ width: "100%",mt: index >= 1 ? 3:1 }} elevation={1}>
              <Grid sx={{ p: 1 }} key={comment.id} container>
                <Avatar sx={{ bgcolor: "#E91E63" }}>
                  {comment.name.slice(0, 1)}
                </Avatar>

                <Grid xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {comment.name}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {formatDate(comment.updatedAt)}
                    </Typography>
                  </Box>
                </Grid>

                <Typography sx={{ mt: 1 }}>{comment.comments}</Typography>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
      {/* <Grid container>
     {
        allMobilesOpinion?.map((opinion)=>{
            return(
                <Grid xs={12} container key={opinion?.id}>
                    <Typography>{opinion?.name} - {opinion?.comments}</Typography>
                    <hr />
                </Grid>
            )
        })
      }
     </Grid> */}
    </Fragment>
  );
}
