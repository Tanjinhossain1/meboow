"use client";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { RhfDefaultInitialValues } from "./DefaultRhfData";
import { GlossaryType, NetworkBandsType } from "@/types/network-bands";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import EditorForArticle from "@/Component/Editor/EditorForArticle";
import { countries } from "@/app/network-bands/_components/Countries";
// import {} from 'next'

// const EditorForArticle = dynamic(() => import("../Editor/EditorForArticle"), {
//   ssr: false,
// });

export default function CreateGlossary({
  isEdit,
  user,
}: {
  user: any;
  isEdit?: {
    glossaryDetails: GlossaryType;
    isEdit: boolean;
  };
}) {
  const history = useRouter();

  const [filteredCountries, setFilteredCountries] = useState(countries);

  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const methods = useForm({
    defaultValues: RhfDefaultInitialValues(
      isEdit?.isEdit ? isEdit?.glossaryDetails : undefined
    ),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = methods;
  const display_name = watch("display_name");

  const onSubmit = async (allValues: any) => {
    handleOpen();
    const data = {
      ...allValues,
      display_name: allValues?.display_name.trim(),
      route: allValues?.route.trim(),
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
        id: isEdit?.glossaryDetails?.id,
        admin_detail_edit: {
          email: user?.email,
          name: user?.fullName,
          role: user?.role,
        },
      };
      await axios
        .put(`/api/glossary/create`, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          console.log("create success", response);
          if (response?.data?.success) {
            SnackbarOpen("Network Bands Updated SuccessFully", "success");

            handleClose();
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }
        })
        .catch((err) => {
          handleClose();
          console.log("error", err);
        });
    } else {
      await axios
        .post(`/api/glossary/create`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          console.log("create success", response);
          if (response?.data?.success) {
            SnackbarOpen("Network Created SuccessFully", "success");
            setTimeout(() => {
              handleClose();
              window.location.reload();
            }, 0);
          }
        })
        .catch((err) => {
          handleClose();
          console.log("error", err);
        });
    }
    handleClose();
    // http://localhost:3002/api/v1/article/create
  };

  // Sync the route field with display_name field initially
  useEffect(() => {
    // Only set route to display_name if route is empty
    methods?.setValue("route", display_name);
  }, [display_name, methods]);
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
            </div>
            <Grid sx={{ mt: 2, mb: 1 }} gap={1} container>
              <Grid xs={5.5}>
                <TextField
                  size="small"
                  {...register("display_name", {
                    required: "Display Name is Required",
                  })}
                  fullWidth
                  name="display_name"
                  id="filled-adornment-amount"
                  placeholder="Display Name"
                  error={!!errors.display_name}
                  helperText={errors.display_name?.message as string}
                />
              </Grid>
              <Grid xs={5.5}>
                <TextField
                  size="small"
                  {...register("route", {
                    required: "Route is Required",
                  })}
                  fullWidth
                  name="route"
                  id="filled-adornment-amount"
                  placeholder="Route"
                  error={!!errors.route}
                  helperText={errors.route?.message as string}
                />
              </Grid>
            </Grid>

            <Controller
              name={`content`}
              control={methods.control}
              render={({ field }: any) => (
                <EditorForArticle
                  {...field}
                  holderId={"1"}
                  onChange={(editorData: any) => field.onChange(editorData)} // Pass EditorJS data to React Hook Form
                />
              )}
            />
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
          </Container>
        </form>
      </FormProvider>
    </div>
  );
}
