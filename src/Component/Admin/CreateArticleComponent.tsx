"use client";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
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

const Editor = dynamic(
  () => import("../../../src/Component/Editor/EditorForCreateArticle"),
  { ssr: false }
);

export default function CreateArticleComponent({
  categories,
  brandsData,
}: {
  categories: CategoryTypes[];
  brandsData: BrandTypes[];
}) {
  const history = useRouter();
  const editorRef = useRef<EditorJS | null>(null);
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [age, setAge] = React.useState("");
  const [brands, setBrands] = React.useState("");
  const [latestDevice, setLatestDevice] = React.useState("");

  const [unFormatFile, setUnFormatFile] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageLoad, setImageLoad] = useState<boolean>(false);
  const [imageRequiredError, setImageRequiredError] = useState<boolean>(false);
  const [showSuccessText, setShowSuccessText] = useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);
  const [showInNews, setShowInNews] = React.useState("");

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
  useEffect(() => {
    if (unFormatFile) {
      const fileData = new FormData();
      fileData.append("file", unFormatFile);
      fileData.append("upload_preset", "computer-services");
      fileData.append("cloud_name", "djvcnudls");

      fetch("https://api.cloudinary.com/v1_1/djvcnudls/image/upload", {
        method: "POST",
        body: fileData,
      })
        .then((res) => res.json())
        .then((fileRepsData) => {
          if (fileRepsData?.url) {
            setImageLoad(false);
            setImage(fileRepsData?.url);
          }
          console.log("image fileRepsData  ", fileRepsData);
        })
        .catch((err) => {
          setImageLoad(false);
          console.log(err);
        });
    }
  }, [unFormatFile]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      setImageRequiredError(true);
      return;
    }
    handleBackDropOpen();
    const fieldData = await editorRef.current?.save();
    const title = (event.target as any)?.title.value;
    const description = (event.target as any)?.description.value;
    const category = (event.target as any)?.category.value;
    const latestDeviceValue = (event.target as any)?.latestDevice.value;
    const brands = (event.target as any)?.brands?.value;
    const deviceName = (event.target as any)?.deviceName?.value;
    const newsValue = (event.target as any)?.showInNews?.value;
    console.log(
      "submit data  ",

      {
        title: title,
        category: category,
        image: image,
        content: fieldData?.blocks,
        latestDevice: latestDeviceValue,
        brands: brands,
        showInNews: newsValue,
      }
    );
    const data = {
      title: title,
      category: category,
      description: description,
      image: image,
      content: fieldData?.blocks,
      latestDevice: latestDeviceValue,
      brands: brands,
      deviceName: deviceName,
      showInNews: newsValue,
    };
    if (image) {
      setImageRequiredError(false);
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
            }, 1000);
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

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Container sx={{ width: "90%", mx: "auto" }}>
          <div id="top">
            <Button
              onClick={() => history.push("/admin")}
              variant="contained"
              color="success"
              sx={{ mt: 1,mr:1 }}
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
          </div>
          <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
            <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
              Title <sup style={{ color: "red", fontSize: 20 }}>*</sup>
            </InputLabel>
            <FilledInput
              name="title"
              id="filled-adornment-amount"
              placeholder="Title"
              required
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>

          <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
            <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
              Device Name <sup style={{ color: "red", fontSize: 20 }}>*</sup>
            </InputLabel>
            <FilledInput
              name="deviceName"
              id="filled-adornment-amount"
              placeholder="Name"
              required
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>

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
              name="showInNews"
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
              Latest Device <sup style={{ color: "red", fontSize: 20 }}>*</sup>
            </InputLabel>

            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={latestDevice}
              required
              name="latestDevice"
              onChange={handleLatestChange}
            >
              <MenuItem value={"latest"}>Latest</MenuItem>
              <MenuItem value={"old"}>Old</MenuItem>
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
            label={
              <span>
                Description <sup style={{ color: "red", fontSize: 12 }}>*</sup>
              </span>
            }
            multiline
            rows={4}
            name={"description"}
            sx={{ width: "100%" }}
            variant="outlined"
            // value={value}
            // onChange={onChange}
          />
          <FileUpload
            runAfterChange={(file) => {
              setImageLoad(true);
              setUnFormatFile(file);
            }}
            required
            name="titleImage"
          />
          {image === null && imageRequiredError === true ? (
            <Typography style={{ color: "red", display: "inline" }}>
              Image Required
            </Typography>
          ) : (
            ""
          )}
        </Container>
        {/* <button>submit</button> */}

        <Container component="div" sx={{ width: "100%", mt: 2 }}>
          <Editor editorRef={editorRef} />
        </Container>
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
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogComponent
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
