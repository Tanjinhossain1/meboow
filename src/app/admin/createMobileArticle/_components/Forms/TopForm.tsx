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


export default function TopForm({
   
  brandsData,
}: {
  brandsData: BrandTypes[];
}) {
  const history = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [brands, setBrands] = React.useState("");

  const [unFormatFile, setUnFormatFile] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imageLoad, setImageLoad] = useState<boolean>(false);
  const [imageRequiredError, setImageRequiredError] = useState<boolean>(false);
  const [showSuccessText, setShowSuccessText] = useState<string>("");
  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);

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
      <div  style={{ width: "100%" }}>
        <Grid sx={{ width: "80%", mx: "auto" }}>
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
        </Grid>
      </div>
      

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
