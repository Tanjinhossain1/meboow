"use client";
import PhoneFinder from "@/Component/Common/PhoneFinder";
import { SampleBrands } from "@/Component/HomePage/Banner";
import LatestDevices from "@/Component/HomePage/Component/LatestDevices";
import { BrandTypes } from "@/types/category";
import { MobileArticleType } from "@/types/mobiles";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { countries } from "./Countries";
import { fetchCountryName } from "@/services/articleServices";


export default function MainComponent({
  brands,
  latestDeviceMobiles,
}: {
  brands: BrandTypes[];
  latestDeviceMobiles: MobileArticleType[];
}) {
  const [country, setCountry] = React.useState("");
  const [countryDetail, setCountryDetail] = React.useState("");
  const [location, setLocation] = useState<any | null>(null);

  const handleChange = (event: any) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setCountryDetail(selectedCountry);
  };

  useEffect(() => {
    async function fetchCountry() {
      const res = await fetch('/api/get-user-location');
      const data = await res.json();
      const country = await fetchCountryName(data?.country)
      setLocation(country);
    }

    fetchCountry();
  }, []);
  return (
    <Paper className="md:max-w-[1000px] mx-auto">
      <Grid container>
        <Grid
          sx={{
            my: 1,
            ml: 1.5,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          xs={12}
          sm={3.8}
        >
          <PhoneFinder brands={SampleBrands} />
        </Grid>
        <Grid
          sx={{
            my: 1,
            ml: 1,
            backgroundImage: "url(/network.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)", // Apply grayscale filter
            position: "relative", // Ensure the text is positioned relative to the image
            // border: "4px solid rgba(128, 128, 128, 0.8)", // Add gray border
            // borderRadius: "8px", // Optional: add some border-radius for a smoother look
          }}
          xs={12}
          sm={7.8}
        >
          <div
            style={{
              position: "absolute",
              bottom: "50px", // Position the text at the bottom
              left: "10px",
              color: "white", // Set text color to white
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add a semi-transparent background for better text readability
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "30px",
            }}
          >
          Network coverage  {location || countryDetail ? `in ${countryDetail || location}` : ""}
          </div>
        </Grid>

        <Grid
          sx={{
            my: 1,
            ml: 1.5,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          xs={12}
          sm={3.8}
        >
          <LatestDevices mobiles={latestDeviceMobiles} />
        </Grid>
        <Grid
          sx={{
            my: 1,
            ml: 1,
          }}
          xs={12}
          sm={7.8}
        >
          <Typography sx={{ fontSize: 15 }}>
            A key part of any mobile phone specification is its operating
            frequency bands. The supported frequency bands determine whether a
            certain handset is compatible with a certain network carrier.
          </Typography>
          <Typography sx={{ fontSize: 15, mt: 2 }}>
            Beside the mobile phone specifications, Safari List is happy to also
            provide you with its own country-based frequency band directory.{" "}
            {`It's`} not operator-specific and {`it's`} helpful if you are
            choosing a handset to use in your home country or if you are making
            sure your phone will work in the country you are heading to.
          </Typography>

          <Box
            sx={{
              backgroundColor: "#D3D3D3", // Light gray background
              padding: "8px 16px", // Padding to match the spacing in the image
              borderRadius: "4px", // Rounded corners
              border: "1px solid #A9A9A9", // Gray border
              maxWidth: "700px", // Limit the width
              display: "flex",
              flexDirection: "column", // Change to column to stack items vertically
              mt:2
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // marginBottom: "8px",
              }}
            >
              <Box sx={{ flexGrow: 1,  }}>
                <label
                  style={{
                    fontSize: "14px",
                    marginRight: "16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Please select the country you are interested in:
                </label>
              </Box>
              <FormControl sx={{ minWidth: "200px" }}>
                <Select
                  value={country || location}
                  onChange={handleChange}
                  displayEmpty
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
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> 
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
