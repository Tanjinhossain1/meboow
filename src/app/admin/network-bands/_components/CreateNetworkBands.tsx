"use client";
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Controller,
  FormProvider,
  useForm,
} from "react-hook-form";
import { RhfDefaultInitialValues } from "./DefaultRhfData";
import { NetworkBandsType } from "@/types/network-bands";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import EditorForArticle from "@/Component/Editor/EditorForArticle";
import { countries } from "@/app/network-bands/_components/Countries";
// import {} from 'next'

// const EditorForArticle = dynamic(() => import("../Editor/EditorForArticle"), {
//   ssr: false,
// });

export default function CreateNetworkBands({
  networkBands,
  isEdit,
  user,
}: {
  networkBands:NetworkBandsType[]
  user: any;
  isEdit?: {
    networkBandsDetails: NetworkBandsType;
    isEdit: boolean;
  };
}) {
  const history = useRouter();

  const [country, setCountry] = React.useState(
    isEdit?.isEdit ? isEdit?.networkBandsDetails?.country : ""
  );
  const [filteredCountries, setFilteredCountries] = useState(countries); 

  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);



  const methods = useForm({
    defaultValues: RhfDefaultInitialValues(
      isEdit?.isEdit ? isEdit?.networkBandsDetails : undefined
    ),
  });
  const { handleSubmit, register } = methods;

  const handleChange = (event: any) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
  };
  useEffect(() => {
    if(isEdit?.isEdit){
      return;
    }
    // Extract country names from backend data
    const backendCountries = networkBands.map(item => item.country);

    // Filter out countries that are present in backend data
    const updatedCountries = countries.filter(country => !backendCountries.includes(country));
    
    setFilteredCountries(updatedCountries);
  }, [networkBands,isEdit]); // Empty dependency array means this runs once on component mount

  const onSubmit = async (allValues: any) => {
    handleOpen();
    const data = {
      ...allValues,
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
        id: isEdit?.networkBandsDetails?.id,
        admin_detail_edit: {
          email: user?.email,
          name: user?.fullName,
          role: user?.role,
        },
      };
      await axios
        .put(`/api/network-bands/create`, updateData, {
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
        .post(`/api/network-bands/create`, data, {
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

            <FormControl fullWidth sx={{mt:3,mb:2}}>
              <Select
               {...register("country")}
                value={isEdit?.isEdit ? country :country || filteredCountries[0]}
                disabled={isEdit?.isEdit}
                onChange={handleChange}
                displayEmpty
                required
                fullWidth
                defaultValue="Afghanistan"
                sx={{
                  backgroundColor: "#fff", // White background for the select field
                  fontSize: "14px", // Smaller font size for the select text
                  padding: "2px 8px", // Padding to make the select look compact
                  height: "30px", // Adjust height to match the design
                  boxShadow: "none",
                  border: "1px solid #A9A9A9", // Add border similar to the one in the image
                  "&:hover": {
                    border: "1px solid #A9A9A9",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the default border
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 80 * 5, // Height for 5 items (adjust this for your needs)
                      fontSize: "12px", // Smaller font size for the dropdown items
                    },
                  },
                }}
              >
                {filteredCountries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
