"use client";
import React, { Fragment, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { BrandTypes } from "@/types/category";
import TopForm from "./TopForm";
import { FormProvider, useForm } from "react-hook-form";
import DynamicForm from "./BottomForms";
import {
  BatteryDefaultData,
  CameraDefaultData,
  ConnectivityDefaultData,
  DesignDefaultData,
  DisplayDefaultData,
  PerformanceDefaultData,
  SensorsDefaultData,
  SoftwareDefaultData,
  SoundDefaultData,
  StorageDefaultData,
} from "./DefaultRhfData";
import axios from "axios";

export default function MainSubmitForm({ brands }: { brands: BrandTypes[] }) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [imageError, setImageError] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [showSuccessText, setShowSuccessText] = useState<string>("");
  
  const PhysicalSpecificationEditorRef = useRef<any>(null);
  const NetworkEditorRef = useRef<any>(null);
  const DisplayEditorRef = useRef<any>(null);
  const ProcessorEditorRef = useRef<any>(null);
  const MemoryEditorRef = useRef<any>(null);
  const MainCameraEditorRef = useRef<any>(null);
  const SelfieCameraEditorRef = useRef<any>(null);
  const OSEditorRef = useRef<any>(null);
  const ConnectivityEditorRef = useRef<any>(null);
  const FeaturesEditorRef = useRef<any>(null);
  const BatteryEditorRef = useRef<any>(null);
  const DetailsEditorRef = useRef<any>(null);



  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const methods = useForm();
  //   {
  //   defaultValues: {
  //     performance: PerformanceDefaultData,
  //   },
  // }
  const fileUploadRef = useRef();
  const { handleSubmit } = methods;

  
  const handleBackdropClose = () => {
    setOpenBackDrop(false);
  };
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };

  const onSubmit = async (data: any) => {
    if (!fileUploadRef.current) {
      setImageError(true);
      return;
    }
    handleBackDropOpen()
    const physicalSpecificationData = await PhysicalSpecificationEditorRef.current?.save();
    const networkData = await NetworkEditorRef.current?.save();
    const displayData = await DisplayEditorRef.current?.save();
    const processorData = await ProcessorEditorRef.current?.save();
    const memoryData = await MemoryEditorRef.current?.save();
    const mainCameraData = await MainCameraEditorRef.current?.save();
    const selfieCameraData = await SelfieCameraEditorRef.current?.save();
    const osData = await OSEditorRef.current?.save();
    const connectivityData = await ConnectivityEditorRef.current?.save();
    const featuresData = await FeaturesEditorRef.current?.save();
    const batteryData = await BatteryEditorRef.current?.save();
    const detailsData = await DetailsEditorRef.current?.save();

    const formData = {
      ...data,
      image: fileUploadRef.current,
      physicalSpecification: physicalSpecificationData?.blocks,

      network: networkData?.blocks,
      display: displayData?.blocks,
      processor: processorData?.blocks,
      memory: memoryData?.blocks,
      mainCamera: mainCameraData?.blocks,
      selfieCamera: selfieCameraData?.blocks,
      os: osData?.blocks,
      connectivity: connectivityData?.blocks,
      features: featuresData?.blocks,
      battery: batteryData?.blocks,
      details: detailsData?.blocks,
    };

    console.log("Form Data:", formData);

    axios
      .post(`/api/article/mobile`, formData)
      .then((response) => {
        console.log("Article created successfully:", response);
        // Do something with the response if needed
        if (response?.data?.success) {
          setOpen(true);
          setShowSuccessText("Article created successfully");
          setTimeout(() => {
            handleBackdropClose();
            window.location.reload();
          }, 200);
        }
      })
      .catch((err) => {
        console.error("Error creating article:", err);
        handleBackdropClose()
        // Handle error if needed
      });
    // Send data to server or process it further as needed
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
    <Fragment>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TopForm fileUploadRef={fileUploadRef} brandsData={brands} />
          {imageError ? <Typography sx={{color:"red",fontSize:20}}>Select Image</Typography> : null}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Physical Specification
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm
                  holderId="1"
                   editorRef={PhysicalSpecificationEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Design */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Network
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="2"  editorRef={NetworkEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Display   */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Display
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="3" editorRef={DisplayEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Camera   */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Processor
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="4" editorRef={ProcessorEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Battery    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  aria-controls="panel5d-content"
                  id="panel5d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Memory
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="5" editorRef={MemoryEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Storage    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel6"}
                onChange={handleChange("panel6")}
              >
                <AccordionSummary
                  aria-controls="panel6d-content"
                  id="panel6d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Main Camera
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="6" editorRef={MainCameraEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Software    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel7"}
                onChange={handleChange("panel7")}
              >
                <AccordionSummary
                  aria-controls="panel7d-content"
                  id="panel7d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Selfie Camera
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="7" editorRef={SelfieCameraEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Connectivity    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel8"}
                onChange={handleChange("panel8")}
              >
                <AccordionSummary
                  aria-controls="panel8d-content"
                  id="panel8d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  OS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="8" editorRef={OSEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Sound    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel9"}
                onChange={handleChange("panel9")}
              >
                <AccordionSummary
                  aria-controls="panel9d-content"
                  id="panel9d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Connectivity
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="9" editorRef={ConnectivityEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Sensors    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel10"}
                onChange={handleChange("panel10")}
              >
                <AccordionSummary
                  aria-controls="panel10d-content"
                  id="panel10d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="10" editorRef={FeaturesEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
          {/* Battery    */}
          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel10"}
                onChange={handleChange("panel10")}
              >
                <AccordionSummary
                  aria-controls="panel10d-content"
                  id="panel10d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Battery
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="11" editorRef={BatteryEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>

          <Grid sx={{ mt: 1 }} container>
            <Grid xs={1.2}></Grid>
            <Grid xs={9.8}>
              <Accordion
                expanded={expanded === "panel10"}
                onChange={handleChange("panel10")}
              >
                <AccordionSummary
                  aria-controls="panel10d-content"
                  id="panel10d-header"
                >
                  <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DynamicForm holderId="12" editorRef={DetailsEditorRef}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>

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
    </Fragment>
  );
}
