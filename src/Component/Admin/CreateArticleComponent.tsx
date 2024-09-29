"use client";
import {
  Alert,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import FileUpload from "@/Component/Forms/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DialogComponent from "./Dialog";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { unstable_noStore } from "next/cache";
import { MobileArticleType } from "@/types/mobiles";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { RhfDefaultInitialValues } from "./DefaultRhfData";
import { RemoveCircle } from "@mui/icons-material";
// import {} from 'next'

const EditorForArticle = dynamic(() => import("../Editor/EditorForArticle"), {
  ssr: false,
});

export default function CreateArticleComponent({
  categories,
  brandsData,
  isEdit,
  user,
}: {
  categories: CategoryTypes[];
  brandsData: BrandTypes[];
  user: any;
  isEdit?: {
    articleDetail: RecentArticleDataType;
    isEdit: boolean;
  };
}) {
  const history = useRouter();
  const editorRef = useRef<EditorJS | null>(null);
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  console.log("isEdit?.articleDetail  ", categories);

  const [age, setAge] = React.useState(
    isEdit?.isEdit ? isEdit?.articleDetail?.category : ""
  );
  const [brands, setBrands] = React.useState(
    isEdit?.isEdit ? isEdit?.articleDetail?.brands : ""
  );
  const [latestDevice, setLatestDevice] = React.useState(
    isEdit?.isEdit ? isEdit?.articleDetail?.latestDevice : ""
  );
  const [best_reviews, setBest_reviews] = React.useState(
    isEdit?.isEdit ? isEdit?.articleDetail?.best_reviews : ""
  );

  const methods = useForm({
    defaultValues: RhfDefaultInitialValues(
      isEdit?.isEdit ? isEdit?.articleDetail : undefined
    ),
  });
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "articles", // The name must match the structure in defaultValues
  // });
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = methods;
  const { title } = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pages",
  });
  const {
    fields: tagFields,
    append: tagAppend,
    remove: tagRemove,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [loading, setLoading] = useState(false);
  let debounceTimeout: NodeJS.Timeout;
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<MobileArticleType[]>([]);
  const [finalValueSelectedArticle, setFinalValueSelectedArticle] =
    useState<MobileArticleType | null>(
      isEdit?.isEdit && isEdit?.articleDetail
        ? isEdit?.articleDetail?.selected_mobile
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
  useEffect(() => {
    if (title && !isEdit?.isEdit) {
      methods?.setValue("route", title);
    }
  }, [title]);
  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/article/mobile?searchTerm=${query}`
      );
      setOptions(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteArticleFunc = () => {
    handleBackDropOpen();
    axios
      .delete(`/api/article/delete/${isEdit?.articleDetail?.id}`)
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
  const [imageRequiredError, setImageRequiredError] = useState<boolean>(false);
  const [showSuccessText, setShowSuccessText] = useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);
  const [showInNews, setShowInNews] = React.useState(
    isEdit?.isEdit ? isEdit?.articleDetail?.showInNews : ""
  );

  const [deleteMobileArticle, setDeleteMobileArticle] = React.useState(false);

  const handleClickDeleteMobileArticle = () => {
    setDeleteMobileArticle(true);
  };

  const handleCloseMobileArticleDialog = () => {
    setDeleteMobileArticle(false);
  };

  const imageRef = useRef<string | null>(null);

  const handleBrandDialogClickOpen = () => {
    setBrandDialogOpen(true);
  };

  const handleBrandDialogClose = () => {
    setBrandDialogOpen(false);
  };

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleBackdropClose = () => {
    setOpenBackDrop(false);
  };
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleBrandChange = (event: SelectChangeEvent) => {
    setBrands(event.target.value);
  };

  const handleLatestChange = (event: SelectChangeEvent) => {
    setLatestDevice(event.target.value);
  };
  const handleBest_reviewsChange = (event: SelectChangeEvent) => {
    setBest_reviews(event.target.value);
  };
  const handleNewsChange = (event: SelectChangeEvent) => {
    setShowInNews(event.target.value);
  };

  const handleClick = (text: string) => {
    setOpen(true);
    setShowSuccessText(text);
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

  const onSubmit = async (allValues: any) => {
    if (!imageRef.current) {
      setImageRequiredError(true);
      return;
    } else {
      setImageRequiredError(false);
    }
    handleBackDropOpen();
    const fieldData = await editorRef.current?.save();
    // const title = (event.target as any)?.title.value;
    // const description = (event.target as any)?.description.value;
    // const category = (event.target as any)?.category.value;
    // const latestDeviceValue = (event.target as any)?.latestDevice.value;
    // const brands = (event.target as any)?.brands?.value;
    // const deviceName = (event.target as any)?.deviceName?.value;
    // const newsValue = (event.target as any)?.showInNews?.value;
    // const bestReviews = (event.target as any)?.best_reviews?.value;

    const data = {
      ...allValues,
      title: allValues?.title.trim(),
      route: allValues?.route.trim(),
      image: imageRef.current,
      content: fieldData,
      brands: brands,
      selected_mobile: finalValueSelectedArticle,
      admin_detail: {
        email: user?.email,
        name: user?.fullName,
        role: user?.role,
      },
    };
    console.log(
      "submit data  ",

      data
    );

    if (isEdit?.isEdit) {
      const updateData = {
        ...data,
        id: isEdit?.articleDetail?.id,
        admin_detail_edit: {
          email: user?.email,
          name: user?.fullName,
          role: user?.role,
        },
      };
      await axios
        .put(`/api/article/create`, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          console.log("create success", response);
          if (response?.data?.success) {
            handleClick("Article Updated SuccessFully");

            handleBackdropClose();
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }
        })
        .catch((err) => {
          handleBackdropClose();
          console.log("error", err);
        });
    } else {
      await axios
        .post(`/api/article/create`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          console.log("create success", response);
          if (response?.data?.success) {
            handleClick("Article Created SuccessFully");
            setTimeout(() => {
              handleBackdropClose();
              window.location.reload();
            }, 0);
          }
        })
        .catch((err) => {
          handleBackdropClose();
          console.log("error", err);
        });
    }
    handleBackdropClose();
    // http://localhost:3002/api/v1/article/create
  };

  const handleKeyPress = (e: any, tagA: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      tagA({ name: "" });
    }
  };
  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const words = pasteData.split(/\s+/); // Split by spaces

    // Set the first field with the full pasted value
    // methods.setValue(`tags.${index}.name`, pasteData);

    // Dynamically fill the next fields with the words
    words.forEach((word, i) => {
      // if (i === 0) return; // Skip the first word (handled above)
      
      // If more fields are needed, append them
      if (i >= tagFields.length) {
        tagAppend({ name: "" });
      }

      // Set the value for the following fields
      methods.setValue(`tags.${i}.name`, word);
    });
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Container className="max-w-[1000px] mx-auto">
            <div id="top">
              <Button
                onClick={() => history.push("/admin")}
                variant="contained"
                color="success"
                sx={{ mt: 1, mr: 1 }}
              >
                Back To Dashboard
              </Button>
              <Button
                onClick={() => history.push("/")}
                variant="contained"
                color="error"
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
            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <TextField
                size="small"
                {...register("title", {
                  required: "title is Required",
                })}
                id="filled-adornment-amount"
                placeholder="Title"
                error={!!errors.title}
                helperText={errors.title?.message as string}
              />
            </FormControl>
            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              <TextField
                size="small"
                {...register("route", {
                  required: "Route is Required",
                })}
                id="filled-adornment-amount"
                placeholder="Route"
                error={!!errors.route}
                helperText={errors.route?.message as string}
              />
            </FormControl>

            <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
              {/* <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
              Device Name <sup style={{ color: "red", fontSize: 20 }}>*</sup>
            </InputLabel> */}
              <TextField
                size="small"
                {...register("deviceName")}
                // name="release_date"
                id="filled-adornment-amount"
                placeholder="Device Name"
                error={!!errors.deviceName}
                helperText={errors.deviceName?.message as string}
              />
              {/* <FilledInput
              defaultValue={
                isEdit?.isEdit ? isEdit?.articleDetail?.deviceName : ""
              }
              name="deviceName"
              id="filled-adornment-amount"
              placeholder="Name"
              required
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            /> */}
            </FormControl>
            <Autocomplete
              {...register("selected_mobile")}
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
                setValue("selected_mobile", newValue as any); // Use setValue from React Hook Form to update form state
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
                  label="Search Mobiles"
                  variant="outlined"
                  fullWidth
                  // name="selected_mobile"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: loading ? (
                      <CircularProgress size={20} />
                    ) : null,
                  }}
                />
              )}
            />

            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Show In News <sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={showInNews}
                {...register("showInNews")}
                // name="showInNews"
                onChange={handleNewsChange}
              >
                <MenuItem value={"show"}>YES</MenuItem>
                <MenuItem value={"notShow"}>NO</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Best Reviews<sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                {...register("best_reviews")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={best_reviews}
                name="best_reviews"
                onChange={handleBest_reviewsChange}
              >
                <MenuItem value={"YES"}>YES</MenuItem>
                <MenuItem value={"NO"}>NO</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Is Trending <sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                {...register("latestDevice")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={latestDevice}
                name="latestDevice"
                onChange={handleLatestChange}
              >
                <MenuItem value={"latest"}>YES</MenuItem>
                <MenuItem value={"old"}>NO</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Category <sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                {...register("category")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                required
                name="category"
                onChange={handleChange}
              >
                {categories?.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.title}>
                      {category.title}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value={"mobile"}>Mobile</MenuItem> */}
              </Select>

              <IconButton onClick={handleDialogClickOpen}>
                <AddCircleIcon color="success" titleAccess="Add Category" />
              </IconButton>
            </FormControl>

            {age === "Mobiles" ? (
              <FormControl
                variant="filled"
                sx={{ my: 1, minWidth: "100%", display: "flex" }}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Brands <sup style={{ color: "red", fontSize: 20 }}>*</sup>
                </InputLabel>

                <Select
                  {...register("brands")}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={brands}
                  name="brands"
                  onChange={handleBrandChange}
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

                <IconButton onClick={handleBrandDialogClickOpen}>
                  <AddCircleIcon color="success" titleAccess="Add Brand" />
                </IconButton>
              </FormControl>
            ) : null}

            <TextField
              {...register("description")}
              label={
                <span>
                  Description{" "}
                  <sup style={{ color: "red", fontSize: 12 }}>*</sup>
                </span>
              }
              multiline
              rows={4}
              defaultValue={
                isEdit?.isEdit ? isEdit?.articleDetail?.description : ""
              }
              required
              name={"description"}
              sx={{ width: "100%" }}
              variant="outlined"
              // value={value}
              // onChange={onChange}
            />
            <Grid container xs={12}>
              <Grid xs={1}>
                <FileUpload
                  isSingleImage={{
                    imageUrl: isEdit?.isEdit
                      ? isEdit?.articleDetail?.image
                      : "",
                    isSingleImage: true,
                    urls: "/api/v1/image/upload/article",
                    getImageDatas(image) {
                      imageRef.current = image;
                    },
                  }}
                  required
                  name="titleImage"
                />
              </Grid>
            </Grid>
            {imageRef.current === null && imageRequiredError === true ? (
              <Typography style={{ color: "red", display: "inline" }}>
                Image Required
              </Typography>
            ) : (
              ""
            )}
            <Paper className="max-w-[1000px] mx-auto p-1 mt-1">
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ mb: 1, fontWeight: 600, fontSize: 20 }}
                  component="h2"
                >
                  Tags
                </Typography>
                <Grid container spacing={2}>
                  {tagFields?.map((field, index) => (
                    <Grid item xs={3} key={field.id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          // border: "1px solid gray",
                          // p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <TextField
                          {...methods.register(`tags.${index}.name`)}
                          label="Name"
                          variant="outlined"
                          size="small"
                          fullWidth
                          onKeyPress={(e) => handleKeyPress(e, tagAppend)}
                          onPaste={(e) => handlePaste(e, index)}
                        />
                        {index > 0 && (
                          <IconButton
                            color="error"
                            onClick={() => tagRemove(index)}
                          >
                            <RemoveCircle />
                          </IconButton>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
            {fields.map((item, index) => (
              <div key={item.id} className="max-w-[1000px] mx-auto ">
                <h3>Page {index + 1}</h3>

                {/* Title Field */}
                <Controller
                  name={`pages.${index}.title`}
                  control={control}
                  render={({ field }: any) => (
                    <TextField
                      {...field}
                      label="Title"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />

                {/* Content Field (EditorJS) */}
                <Controller
                  name={`pages.${index}.content`}
                  control={control}
                  render={({ field }: any) => (
                    <EditorForArticle
                      {...field}
                      holderId={item.id}
                      onChange={(editorData: any) => field.onChange(editorData)} // Pass EditorJS data to React Hook Form
                    />
                  )}
                />

                {/* Remove Page Button */}
                {fields.length > 1 && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => remove(index)}
                    className="mt-3"
                  >
                    Remove Page {index + 1}
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                append({ page: fields.length + 1, title: "", content: null })
              }
              className="mt-4"
            >
              Add New Page
            </Button>
          </Container>
          {/* <button>submit</button> */}

          {/* Add New Page Button */}

          {/* <Container component="div" sx={{ width: "100%", mt: 2 }}>
            <Editor
              defaultData={
                isEdit?.isEdit ? isEdit?.articleDetail?.content : undefined
              }
              editorRef={editorRef}
            />
          </Container> */}
          <Container component="main" sx={{ textAlign: "end" }} maxWidth="sm">
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                padding: "10px 20px",
                mt: 2,
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#303f9f",
                  // transform: "scale(1.05)",
                },
                "&:active": {
                  backgroundColor: "#283593",
                  transform: "scale(0.95)",
                },
              }}
            >
              Submit
            </Button>
            <div id="bottom">
              <a href="#top">
                {" "}
                <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
                  Go Up
                </Button>
              </a>
            </div>
          </Container>
        </form>
      </FormProvider>
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
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogComponent
          user={user}
          handleClick={handleClick}
          handleBackdropClose={handleBackdropClose}
          handleBackDropOpen={handleBackDropOpen}
          handleDialogClose={handleDialogClose}
        />
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
