"use client";
import {
  Accordion,
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  Grid,
  IconButton,
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
  Autocomplete,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FileUpload from "@/Component/Forms/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BrandTypes } from "@/types/category";
import DialogComponent from "@/Component/Admin/Dialog";
import { useFormContext } from "react-hook-form";
import { MobileArticleType } from "@/types/mobiles";
import ColorPickerComponent from "./ColorPickForTop";
import { RecentArticleDataType } from "@/types/RecentArticle";
import UploadMultipleImageField from "@/Component/Forms/MultipleUpload";

import {
  Dialog as UIDialog,
  DialogContent as UIDialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle as UIDialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function TopForm({
  brandsData,
  fileUploadRef,
  displayFileUploadRef,
  isEdit,
  gradient,
  setGradient,
  user,
}: {
  brandsData: BrandTypes[];
  fileUploadRef: any;
  displayFileUploadRef: any;
  gradient: any;
  setGradient: any;
  isEdit?: {
    isEdit: boolean;
    mobileArticles: MobileArticleType[];
  };
  user?: any;
}) {
  const history = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [loading, setLoading] = useState(false);
  let debounceTimeout: NodeJS.Timeout;
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<RecentArticleDataType[]>([]);

  const [selectedMultipleUploadsBrand, setSelectedMultipleUploadsBrand] =
    useState<string | null>(null);
  // Access localStorage only after the component mounts
  useEffect(() => {
    const storedBrand = localStorage.getItem("selectedBrand");
    if (storedBrand) {
      setSelectedMultipleUploadsBrand(storedBrand);
    }
  }, []);

  const [finalValueSelectedArticle, setFinalValueSelectedArticle] =
    useState<RecentArticleDataType | null>(
      isEdit?.isEdit && isEdit?.mobileArticles[0]
        ? isEdit?.mobileArticles[0]?.selected_articles
        : null
    );

  const handleSearchChange = (
    event: React.ChangeEvent<{}> | null,
    newInputValue: string
  ) => {
    setSearchTerm(newInputValue); // Use the second argument instead of event.target.value
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Debounce the API call to avoid too many requests
    debounceTimeout = setTimeout(() => {
      if (newInputValue) {
        fetchData(newInputValue);
      }
    }, 500); // Adjust debounce timing if necessary
  };

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/v1/article/all?searchTerm=${query}`
      );
      setOptions(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = methods;
  const [deleteMobileArticle, setDeleteMobileArticle] = React.useState(false);

  // const handleSelect = (event: any, value: any) => {
  //   setFinalValueSelectedArticle(value);
  // };

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
    isEdit?.isEdit
      ? isEdit?.mobileArticles[0].brands
      : localStorage.getItem("selectedBrand")
      ? localStorage.getItem("selectedBrand")
      : ""
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

  useEffect(() => {
    if (brands !== "" && brands) {
      setValue("brands", brands);
    } else {
      setValue("brands", null);
    }
  }, [brands, setValue]);
  return (
    <div>
      <div style={{ width: "100%" }}>
        <Grid
          className="md:max-w-[1000px] mx-auto"
          sx={{ width: "100%", mx: "auto" }}
        >
          <div style={{ marginBottom: "20px" }} id="top">
            <Button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to back to Dashboard?")
                ) {
                  history.push("/admin");
                }
              }}
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
            {user?.role === "admin" && isEdit?.isEdit ? (
              <Button
                color="error"
                variant="contained"
                sx={{ mt: 1, ml: 2 }}
                onClick={handleClickDeleteMobileArticle}
              >
                Delete
              </Button>
            ) : null}
            {
              isEdit?.isEdit ? null :
            <UIDialog>
              <DialogTrigger asChild>
                <Button variant="contained" color="info" sx={{ mt: 1, ml: 2 }}>
                  {selectedMultipleUploadsBrand &&
                  selectedMultipleUploadsBrand !== ""
                    ? "Remove Brand Or Change "
                    : "Chose Brand For Multiple Uploads"}
                </Button>
              </DialogTrigger>
              <UIDialogContent className="sm:max-w-[425px] ">
                <DialogHeader>
                  <UIDialogTitle>Share</UIDialogTitle>
                  <DialogDescription className="text-2xl">
                    Choose Brand For Multiple Uploads
                  </DialogDescription>
                </DialogHeader>
                {selectedMultipleUploadsBrand &&
                selectedMultipleUploadsBrand !== "" ? (
                  <Chip
                    onClick={() => {
                      // Store the title in local storage
                      localStorage.setItem("selectedBrand", "");
                      setBrands("");
                      setSelectedMultipleUploadsBrand(null);
                      // window.location.reload();
                    }}
                    sx={{ bgColor: "white", color: "white" }}
                    label={`Remove ${selectedMultipleUploadsBrand}`}
                    clickable
                    variant="outlined"
                  />
                ) : null}
                <div className="grid grid-cols-4 gap-4 bg-white p-2">
                  {brandsData.map((name, index) => {
                    return (
                      <DialogClose key={index} asChild>
                        <Chip
                          onClick={() => {
                            if (name?.title) {
                              // Store the title in local storage
                              localStorage.setItem(
                                "selectedBrand",
                                name?.title
                              );
                              setSelectedMultipleUploadsBrand(name?.title);
                              setBrands(name?.title);
                            }
                            // window.location.reload();
                          }}
                          label={name?.title}
                          clickable
                          variant="outlined"
                        />
                      </DialogClose>
                    );
                  })}
                </div>
              </UIDialogContent>
            </UIDialog>
            }
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
                            defaultValue={
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
                      <Autocomplete
                        {...register("selected_articles")}
                        options={Array.isArray(options) ? options : []}
                        getOptionLabel={(option) => option.title || ""}
                        value={finalValueSelectedArticle || null}
                        sx={{
                          ".MuiInputBase-root": {
                            height: "40px", // Set the height for the entire input base
                            fontSize: "14px", // Optional: decrease font size
                            padding: "0 10px", // Adjust padding inside input
                          },
                          ".MuiOutlinedInput-input": {
                            padding: "8px 14px", // Adjust padding for the text input
                          },
                        }}
                        onChange={(event, newValue) => {
                          setFinalValueSelectedArticle(newValue);
                          setValue("selected_articles", newValue); // Use setValue from React Hook Form to update form state
                        }}
                        inputValue={searchTerm}
                        onInputChange={handleSearchChange} // Modified
                        loading={loading}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              ".MuiInputLabel-root": {
                                top: "-5px", // Adjust the label positioning
                              },
                              ".MuiInputBase-input": {
                                padding: "8px", // Padding inside the input
                                height: "40px", // Force input height
                                fontSize: "14px", // Optional: decrease font size
                              },
                            }}
                            {...params}
                            label="Search Articles"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: loading ? (
                                <CircularProgress size={20} />
                              ) : null,
                            }}
                          />
                        )}
                      />
                      {/* <FormControl sx={{ width: "100%" }} variant="filled">
                        <TextField
                          size="small"
                          {...register("key_specifications.review")}
                          // name="key_specifications.os"
                          id="filled-adornment-amount"
                          placeholder="review"
                          // error={!!(errors?.key_specifications as any)?.review}
                          // helperText={(errors?.key_specifications as any)?.review?.message as string}
                        />
                      </FormControl> */}
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
                          value={brands ? brands : ""}
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
                      <UploadMultipleImageField
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
          user={user}
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
