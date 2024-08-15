"use client";
import {
  Accordion,
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
  AccordionDetails,
  AccordionSummary,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormHelperText,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import FileUpload from "@/Component/Forms/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BrandTypes, CategoryTypes } from "@/types/category";
import DialogComponent from "@/Component/Admin/Dialog";
import { DatePicker } from "antd";
import { useFormContext } from "react-hook-form";
import { MobileArticleType } from "@/types/mobiles";
import ColorPickerComponent from "./ColorPickForTop";

export default function TopForm({
  brandsData,
  fileUploadRef,
  displayFileUploadRef,
  isEdit,
  gradient,
  setGradient,
}: {
  brandsData: BrandTypes[];
  fileUploadRef: any;
  displayFileUploadRef: any;
  gradient:any;
  setGradient:any;
  isEdit?: {
    isEdit: boolean;
    mobileArticles: MobileArticleType[];
  };
}) {
  const history = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = methods;
  const [deleteMobileArticle, setDeleteMobileArticle] = React.useState(false);

  const handleClickDeleteMobileArticle = () => {
    setDeleteMobileArticle(true);
  };

  const handleCloseMobileArticleDialog = () => {
    setDeleteMobileArticle(false);
  };
  const DeleteArticleFunc = () => {
    handleBackDropOpen();
    axios
      .delete(`/api/article/mobile/delete/${isEdit?.mobileArticles[0].id}`)
      .then((response) => {
        if (response?.data?.success) {
          setOpen(true);
          setShowSuccessText(`Article Delete successfully`);
          handleBackdropClose();
          history.push("/");
        }
      })
      .catch((err) => {
        console.error("Error creating article:", err);

        handleBackdropClose();
        // Handle error if needed
      });

    handleCloseMobileArticleDialog();
  };

  const [brands, setBrands] = React.useState(
    isEdit?.isEdit ? isEdit?.mobileArticles[0].brands : ""
  );
  const [showSuccessText, setShowSuccessText] = useState<string>("");
  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleBrandDialogClickOpen = () => {
    setBrandDialogOpen(true);
  };

  const handleBrandDialogClose = () => {
    setBrandDialogOpen(false);
  };

  const handleBackdropClose = () => {
    setOpenBackDrop(false);
  };
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };

  const handleBrandChange = (event: SelectChangeEvent) => {
    setBrands(event.target.value);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Grid
          className="md:max-w-[1000px] mx-auto"
          sx={{ width: "100%", mx: "auto" }}
        >
          <div style={{ marginBottom: "20px" }} id="top">
            <Button
              onClick={() => history.push("/admin")}
              variant="contained"
              color="success"
              sx={{ mt: 1, mr: 1 }}
            >
              Back To Dashboard
            </Button>
            <Button
              onClick={() => {
                if (window.confirm("Are you sure you want to back to Home?")) {
                  history.push("/");
                }
              }}
              variant="contained"
              color="info"
              sx={{ mt: 1 }}
            >
              Back To Home
            </Button>
            <a style={{ textDecoration: "none" }} href="#bottom">
              {" "}
              <Button
                color="secondary"
                variant="contained"
                sx={{ mt: 1, ml: 2 }}
              >
                Go Bottom
              </Button>
            </a>
            {isEdit?.isEdit ? (
              <Button
                color="error"
                variant="contained"
                sx={{ mt: 1, ml: 2 }}
                onClick={handleClickDeleteMobileArticle}
              >
                Delete
              </Button>
            ) : null}
          </div>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                Top Display Specifications
              </Typography>
            </AccordionSummary>
            <Grid container>
              <Grid xs={9.8}>
                <AccordionDetails>
                  <Grid gap={1} container>
                    <Grid xs={3.5}>
                      <FormControl
                        sx={{ width: "100%" }}
                        // variant="filled"
                      >
                        <TextField
                          size="small"
                          {...register("title", {
                            required: "Title is Required",
                          })}
                          name="title"
                          id="filled-adornment-amount"
                          placeholder="Title"
                          error={!!errors.title}
                          helperText={errors.title?.message as string}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("market_status", {
                            required: "Market Status is Required",
                          })}
                          name="market_status"
                          id="filled-adornment-amount"
                          placeholder="Market Status"
                          error={!!errors.market_status}
                          helperText={errors.market_status?.message as string}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("release_date", {
                            required: "Market Status is Required",
                          })}
                          name="release_date"
                          id="filled-adornment-amount"
                          placeholder="Release Date"
                          error={!!errors.release_date}
                          helperText={errors.release_date?.message as string}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={2}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <FormControl variant="outlined">
                          <InputLabel id="number-select-label">
                            Total Score
                          </InputLabel>
                          <Select
                            {...register("expert_view.total_score")}
                            // {...register("expert_view.total_score", {
                            //   required: "Score is Required",
                            // })}
                            labelId="number-select-label"
                            label="Total Score"
                            value={
                              isEdit?.isEdit
                                ? isEdit?.mobileArticles[0]?.expert_view
                                    ?.total_score
                                : undefined
                            }
                            // required
                            sx={{ height: "40px" }}
                            // error={!!(errors.expert_view as any)?.total_score}
                            // helperText={errors.total_score?.message as string}
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(
                              (number) => (
                                <MenuItem key={number} value={number}>
                                  {number}
                                </MenuItem>
                              )
                            )}
                          </Select>
                          {(errors.expert_view as any)?.total_score && (
                            <FormHelperText sx={{ color: "red" }}>
                              {(errors.expert_view as any)?.total_score.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </FormControl>
                    </Grid>
                    {/* <Grid xs={1}></Grid> */}
                    <Grid xs={2}>
                      <FileUpload
                        isSingleImage={{
                          isSingleImage: true,
                          urls: "/api/v1/image/upload/mobile/display-image",
                          imageUrl: isEdit?.mobileArticles[0].display_image
                            ? isEdit?.mobileArticles[0].display_image
                            : "",
                          getImageDatas: (image) => {
                            console.log("Images uploaded ", image);
                            displayFileUploadRef.current = image;
                          },
                        }}
                        title="Display Image"
                        required
                        name="displayImage"
                      />
                    </Grid>

                    <Grid xs={3}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.thickness", {
                            required: "Thickness is Required",
                          })}
                          // name="key_specifications.thickness"
                          id="filled-adornment-amount"
                          placeholder="Thickness"
                          error={
                            !!(errors?.key_specifications as any)?.thickness
                          }
                          helperText={
                            (errors?.key_specifications as any)?.thickness
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.os", {
                            required: "Os is Required",
                          })}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="Os"
                          error={!!(errors?.key_specifications as any)?.os}
                          helperText={
                            (errors?.key_specifications as any)?.os
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3.5}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.ram_storage", {
                            required: " Storage is Required",
                          })}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder=" Storage"
                          error={
                            !!(errors?.key_specifications as any)?.ram_storage
                          }
                          helperText={
                            (errors?.key_specifications as any)?.ram_storage
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3.5}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.pixel", {
                            required: "Pixel is Required",
                          })}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="Pixel"
                          error={!!(errors?.key_specifications as any)?.pixel}
                          helperText={
                            (errors?.key_specifications as any)?.pixel
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={3.5}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.camera", {
                            required: "Camera is Required",
                          })}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="Camera"
                          error={!!(errors?.key_specifications as any)?.camera}
                          helperText={
                            (errors?.key_specifications as any)?.camera
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.ram_chipset", {
                            required: "Ram Chipset is Required",
                          })}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="Ram Chipset"
                          error={
                            !!(errors?.key_specifications as any)?.ram_chipset
                          }
                          helperText={
                            (errors?.key_specifications as any)?.ram_chipset
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid xs={3.5}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.battery", {
                            required: "Battery is Required",
                          })}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="Battery"
                          error={!!(errors?.key_specifications as any)?.battery}
                          helperText={
                            (errors?.key_specifications as any)?.battery
                              ?.message as string
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.review")}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="review"
                          // error={!!(errors?.key_specifications as any)?.review}
                          // helperText={(errors?.key_specifications as any)?.review?.message as string}
                        />
                      </FormControl>
                    </Grid>
                    <Grid xs={4}>
                      <FormControl
                        // variant="filled"
                        variant="outlined"
                        sx={{ minWidth: "100%", display: "flex" }}
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Brands{" "}
                          <sup style={{ color: "red", fontSize: 20 }}>*</sup>
                        </InputLabel>

                        <Select
                          {...register("brands", {
                            required: "Brand Required",
                          })}
                          labelId="demo-simple-select-filled-label"
                          // id="demo-simple-select-filled"
                          value={brands}
                          defaultValue="dk"
                          error={!!errors?.brands}
                          name="brands"
                          onChange={handleBrandChange}
                          placeholder=" Select Brands"
                          sx={{ height: "40px" }}
                          size="small"
                          label="Brands"

                          // required
                        >
                          {brandsData?.map((brand) => {
                            return (
                              <MenuItem key={brand.id} value={brand.title}>
                                {brand.title}
                              </MenuItem>
                            );
                          })}
                          {/* <MenuItem value={"mobile"}>Mobile</MenuItem> */}
                        </Select>
                        {(errors?.brands as any) && (
                          <FormHelperText sx={{ color: "red" }}>
                            {(errors?.brands as any).message}
                          </FormHelperText>
                        )}
                        <IconButton onClick={handleBrandDialogClickOpen}>
                          <AddCircleIcon
                            color="success"
                            titleAccess="Add Brand"
                          />
                        </IconButton>
                      </FormControl>
                    </Grid>
                    <Grid xs={8}>
                      <FileUpload
                        isAdminImages
                        isMultiple={{
                          isMultiple: true,
                          urls: "/api/v1/image/upload/mobile",
                          defaultImageUrls: isEdit?.mobileArticles[0].image
                            ? isEdit?.mobileArticles[0].image
                            : [],
                          getImageDatas: (images) => {
                            console.log("Images uploaded ", images);
                            fileUploadRef.current = images;
                          },
                        }}
                        required
                        title="Pictures"
                        name="titleImage"
                      />
                    </Grid>
                    <Grid xs={12}>
                      <ColorPickerComponent
                        gradient={gradient}
                        setGradient={setGradient}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Grid>
              <Grid xs={2}></Grid>
            </Grid>
          </Accordion>
        </Grid>
      </div>
      <Dialog
        open={deleteMobileArticle}
        onClose={handleCloseMobileArticleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete you {"don't"} back this article.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMobileArticleDialog}>Disagree</Button>
          <Button color="error" onClick={DeleteArticleFunc} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={brandDialogOpen}
        onClose={handleBrandDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogComponent
          isBrand
          handleClick={handleBrandDialogClickOpen}
          handleBackdropClose={handleBackdropClose}
          handleBackDropOpen={handleBackDropOpen}
          handleDialogClose={handleBrandDialogClose}
        />
      </Dialog>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {showSuccessText}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        onClick={handleBackdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
