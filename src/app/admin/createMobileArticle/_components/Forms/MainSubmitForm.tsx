"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
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
  TextField,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
} from "@mui/material";
import { BrandTypes } from "@/types/category";
import TopForm from "./TopForm";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import DynamicForm from "./BottomForms";
import axios from "axios";
import {} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { MobileArticleType } from "@/types/mobiles";
import { RhfDefaultInitialValues } from "./DefaultRhfData";
import ExpertView from "./ExpertView";
import EditorForCreateArticle from "./EditorForSpecification/EditorForSpecification";
import DevicesDetails from "./DevicesDetails";

export default function MainSubmitForm({
  brands,
  isEdit,
}: {
  brands: BrandTypes[];
  isEdit?: {
    isEdit: boolean;
    mobileArticles: MobileArticleType[];
  };
}) {
  const [value, setValue] = useState("");

  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [imageError, setImageError] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [showSuccessText, setShowSuccessText] = useState<string>("");
  const [showErrorText, setShowErrorText] = useState<string>("");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);

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
  const ContentEditorRef = useRef<any>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const methods = useForm({
    defaultValues: RhfDefaultInitialValues(
      isEdit?.isEdit && isEdit?.mobileArticles[0]
        ? isEdit?.mobileArticles[0]
        : undefined
    ),
  });

// If `mobileArticle` changes after the form is rendered, you may need to call `reset` to update the form values.
useEffect(() => {
  if (isEdit?.isEdit && isEdit?.mobileArticles[0]) {
    methods.reset(RhfDefaultInitialValues(isEdit?.mobileArticles[0]));
  }
}, [isEdit?.isEdit,isEdit?.mobileArticles,methods]);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "prices",
  });
  const {
    fields: custom_fields,
    append: custom_field_append,
    remove: custom_field_remove,
  } = useFieldArray({
    control: methods.control,
    name: "custom_specification_fields",
  });

  const fileUploadRef = useRef<string[]>([]);
  const displayFileUploadRef = useRef<string[]>([]);

  const { handleSubmit, register } = methods;

  const handleBackdropClose = () => {
    setOpenBackDrop(false);
  };
  const handleBackDropOpen = () => {
    setOpenBackDrop(true);
  };

  const onSubmit = async (data: any) => {
    if (!fileUploadRef.current[0]) {
      // setImageError(true);
      setErrorOpen(true);
      setShowErrorText("Please Select Image");
      return;
    }
    if (!displayFileUploadRef.current) {
      // setImageError(true);
      setErrorOpen(true);
      setShowErrorText("Please Select Display Image");
      return;
    }

    handleBackDropOpen();
    const physicalSpecificationData =
      await PhysicalSpecificationEditorRef.current?.save();
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
    const contentData = await ContentEditorRef.current?.save();

    const formData = {
      ...data,
      image: fileUploadRef.current,
      display_image: displayFileUploadRef.current,
      physicalSpecification: physicalSpecificationData,

      network: networkData,
      display: displayData,
      processor: processorData,
      memory: memoryData,
      mainCamera: mainCameraData,
      selfieCamera: selfieCameraData,
      os: osData,
      connectivity: connectivityData,
      features: featuresData,
      battery: batteryData,
      details: detailsData,
      content: contentData,
    };
    console.log("Form Data:", formData);
    if (isEdit?.isEdit) {
      const editFieldData = {
        ...formData,
        id: isEdit?.mobileArticles[0].id,
      };
      console.log("Form Data:", editFieldData);
      axios
        .put(`/api/article/mobile`, editFieldData)
        .then((response) => {
          console.log("Article created successfully:", response);
          // Do something with the response if needed
          if (response?.data?.success) {
            setOpen(true);
            setShowSuccessText(
              `Article ${isEdit?.isEdit ? "Update" : "Created"} successfully`
            );
            setTimeout(() => {
              handleBackdropClose();
              window.location.reload();
            }, 10);
          }
        })
        .catch((err) => {
          console.error("Error creating article:", err);
          handleBackdropClose();
          // Handle error if needed
        });
    } else {
      axios
        .post(`/api/article/mobile`, formData)
        .then((response) => {
          console.log("Article created successfully:", response);
          // Do something with the response if needed
          if (response?.data?.success) {
            setOpen(true);
            setShowSuccessText(
              `Article ${isEdit?.isEdit ? "Update" : "Created"} successfully`
            );
            setTimeout(() => {
              handleBackdropClose();
              window.location.reload();
            }, 10);
          }
        })
        .catch((err) => {
          console.error("Error creating article:", err);
          handleBackdropClose();
          // Handle error if needed
        });
    }
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
  const OtherDetailsForms = [
    // {
    //   holderId: "1",
    //   title: "Physical Specification",
    //   componentRef: PhysicalSpecificationEditorRef,
    //   key: "physicalSpecification",
    // },
    // {
    //   holderId: "2",
    //   title: "Network",
    //   componentRef: NetworkEditorRef,
    //   key: "network",
    // },
    // {
    //   holderId: "3",
    //   title: "Display",
    //   componentRef: DisplayEditorRef,
    //   key: "display",
    // },
    // {
    //   holderId: "4",
    //   title: "Processor",
    //   componentRef: ProcessorEditorRef,
    //   key: "processor",
    // },
    // {
    //   holderId: "5",
    //   title: "Memory",
    //   componentRef: MemoryEditorRef,
    //   key: "memory",
    // },
    // {
    //   holderId: "6",
    //   title: "Main Camera",
    //   componentRef: MainCameraEditorRef,
    //   key: "mainCamera",
    // },
    // {
    //   holderId: "7",
    //   title: "Selfie Camera",
    //   componentRef: SelfieCameraEditorRef,
    //   key: "selfieCamera",
    // },
    // {
    //   holderId: "8",
    //   title: "OS",
    //   componentRef: OSEditorRef,
    //   key: "os",
    // },
    // {
    //   holderId: "9",
    //   title: "Connectivity",
    //   componentRef: ConnectivityEditorRef,
    //   key: "connectivity",
    // },
    // {
    //   holderId: "10",
    //   title: "Features",
    //   componentRef: FeaturesEditorRef,
    //   key: "features",
    // },
    // {
    //   holderId: "11",
    //   title: "Battery",
    //   componentRef: BatteryEditorRef,
    //   key: "battery",
    // },
    {
      holderId: "18",
      title: "Content",
      componentRef: ContentEditorRef,
      key: "content",
    },
    {
      holderId: "12",
      title: "Details",
      componentRef: DetailsEditorRef,
      key: "details",
    },
  ];

  return (
    <Fragment>
      <FormProvider {...methods}>
        <form className="w-3/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <TopForm
            isEdit={isEdit}
            fileUploadRef={fileUploadRef}
            displayFileUploadRef={displayFileUploadRef}
            brandsData={brands}
          />
          <DevicesDetails isEdit={isEdit} />
          {imageError ? (
            <Typography sx={{ color: "red", fontSize: 20 }}>
              Select Image
            </Typography>
          ) : null}

          {OtherDetailsForms?.map((otherDetails, index) => {
            return (
              <Fragment key={index}>
                <Grid className="md:max-w-[1000px] mx-auto" sx={{ mt: 1 }} container>
                  {/* <Grid xs={1.2}></Grid> */}
                  <Grid xs={12}>
                    <Accordion
                      defaultExpanded
                      // expanded={expanded === `panel${index + 1}`}
                      // onChange={handleChange(`panel${index + 1}`)}
                    >
                      <AccordionSummary
                        aria-controls={`panel${index + 1}d-content`}
                        id={`panel${index + 1}d-header`}
                      >
                        <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                          {otherDetails.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <DynamicForm
                          holderId={otherDetails.holderId}
                          editorRef={otherDetails.componentRef}
                          defaultEditorData={
                            isEdit?.isEdit
                              ? (isEdit?.mobileArticles[0] as any)[
                                  `${otherDetails.key}`
                                ]
                              : undefined
                          }
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  {/* <Grid xs={2}></Grid> */}
                </Grid>
              </Fragment>
            );
          })}

          <Fragment>
            <Grid
              className="md:max-w-[1000px] mx-auto"
              sx={{ mt: 1 }}
              container
            > 
              <Grid xs={12}>
                <Accordion
                  defaultExpanded
                  // expanded={expanded === `panel${index + 1}`}
                  // onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    aria-controls={`panelmed-content`}
                    id={`panelmed-header`}
                  >
                    <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                      Expert View
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ExpertView rhfMethods={methods} />
                  </AccordionDetails>
                </Accordion>
              </Grid> 
            </Grid>
          </Fragment>

          <Grid  className="md:max-w-[1000px] mx-auto"  sx={{ mt: 1 }} container>
            <Accordion
              defaultExpanded
              
              // expanded={expanded === "panel0"}
              // onChange={handleChange("panel0")}
            >
              <AccordionSummary
                aria-controls="panel0d-content"
                id="panel0d-header"
               
              >
                <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                  Prices
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    {fields?.map((field, index) => (
                      <Grid item xs={12} key={field.id}>
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
                            {...methods.register(`prices.${index}.gbs`)}
                            label="GBs"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                          <TextField
                            {...methods.register(`prices.${index}.start_from`)}
                            label="Start From"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                          {index > 0 && (
                            <IconButton
                              color="error"
                              onClick={() => remove(index)}
                            >
                              <RemoveCircle />
                            </IconButton>
                          )}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => append({ gbs: "", start_from: "" })}
                      startIcon={<AddCircle />}
                    >
                      Add Price
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
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
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {showErrorText}
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
