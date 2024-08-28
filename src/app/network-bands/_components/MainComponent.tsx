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
import {
  fetchCountryName,
  fetchNetworkBands,
} from "@/services/articleServices";
import { NetworkBandsType } from "@/types/network-bands";
import Link from "next/link";
import { formatForUrl } from "@/utils/utils";
import { useRouter } from "next/navigation";

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}

export default function MainComponent({
  brands,
  latestDeviceMobiles,
  isEdit,
}: {
  brands: BrandTypes[];
  latestDeviceMobiles: MobileArticleType[];
  isEdit?: {
    isEdit: boolean;
    country: string;
  };
}) {
  const router = useRouter();
  const [country, setCountry] = React.useState<string | null>(null);
  const [countryDetails, setCountryDetails] = useState<NetworkBandsType | null>(
    null
  );

  const handleChange = (event: any) => {
    const selectedCountry = event.target.value;
    router.push(`/network-bands/${formatForUrl(selectedCountry)}`);
    // setCountry(selectedCountry);
    // setCountryDetail(selectedCountry);
  };

  useEffect(() => {
    async function fetchCountry() {
      if (isEdit?.isEdit) {
        const countryDetails = await fetchNetworkBands({
          country: isEdit?.country ? isEdit?.country : undefined,
        });
        console.log("first country ", countryDetails, isEdit?.country);
        setCountryDetails(countryDetails?.data[0]);
        setCountry(isEdit?.country);
      } else {
        const res = await fetch("/api/get-user-location");
        const data = await res.json();
        if (data?.country !== "Unknown") {
          const countryName = await fetchCountryName(data?.country);
          const countryDetails = await fetchNetworkBands({
            country: countryName ? countryName : undefined,
          });
          console.log("first country ", countryDetails, countryName);
          setCountryDetails(countryDetails?.data[0]);
          setCountry(countryName);
        }
      }
    }

    fetchCountry();
  }, [isEdit]);
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
            display: {
              xs: "none",
              sm: "block",
            },
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
            Network coverage {country ? `in ${country}` : ""}
          </div>
        </Grid>
        <Grid
          sx={{
            my: 1,
            ml: 1,
            mr: 1,
            backgroundImage: "url(/network.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)", // Apply grayscale filter
            position: "relative", // Ensure the text is positioned relative to the image
            // border: "4px solid rgba(128, 128, 128, 0.8)", // Add gray border
            // borderRadius: "8px", // Optional: add some border-radius for a smoother look
            display: {
              xs: "block",
              sm: "none",
            },
            height: "200px",
          }}
          xs={12}
        >
          <div
            style={{
              // position: "absolute",
              bottom: "50px", // Position the text at the bottom
              left: "10px",
              color: "white", // Set text color to white
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add a semi-transparent background for better text readability
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "30px",
            }}
          >
            Network coverage {country ? `in ${country}` : ""}
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
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "flex",
                },
                alignItems: "center",
                // marginBottom: "8px",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
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
                  value={country || "Afghanistan"}
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
                      <Link
                        style={{ width: "100%" }}
                        href={`/network-bands/${formatForUrl(country)}`}
                      >
                        {country}
                      </Link>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          {country && countryDetails ? (
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: 24 }}>
              {countryDetails?.country}
            </Typography>
          ) : country ? (
            <Typography sx={{ fontWeight: 600 }}>
              Sorry, we {`don't`} have any statistics for the coverage in{" "}
              {country} Minor Outlying Island.
            </Typography>
          ) : null}
          {countryDetails?.content?.blocks?.map((block: any) => {
            if (block.type === "paragraph") {
              return (
                <div
                  style={{ marginTop: "30px" }}
                  key={block.id}
                  dangerouslySetInnerHTML={{
                    __html: formatText(block.data.text),
                  }}
                />
              );
            } else if (block.type === "header") {
              const TagLevel: any = `h${
                block.data.level === 1 ? 2 : block.data.level
              }`;
              console.log(
                "hea der de   ",
                block,
                TagLevel,
                block.data.level,
                `text-${
                  block.data.level === 1
                    ? "4xl"
                    : block.data.level === 2
                    ? "3xl"
                    : "2xl"
                }`
              );

              return (
                <TagLevel
                  className={`text-${
                    block.data.level === 1
                      ? "4xl"
                      : block.data.level === 2
                      ? "3xl"
                      : "2xl"
                  } font-bold`} // Tailwind classes
                  key={block.id}
                  dangerouslySetInnerHTML={{
                    __html: block.data.text,
                  }}
                />
                // <TagLevel
                //   className={`text-${
                //     block.data.level === 1
                //       ? "4xl"
                //       : block.data.level === 2
                //       ? "3xl"
                //       : "2xl"
                //   }`} // Adjust Tailwind classes as needed
                //   key={block.id}
                //   dangerouslySetInnerHTML={{
                //     __html: block.data.text,
                //   }}
                // ></TagLevel>
              );
            } else if (block.type === "image") {
              return (
                <Image
                  loading="lazy"
                  key={block.id}
                  layout="responsive"
                  width={block.data.height}
                  height={block.data.height}
                  src={block.data.file.url}
                  alt={block.data.file.url}
                ></Image>
              );
            } else if (block.type === "list") {
              return block.data.style === "unordered" ? (
                <ul key={block.id}>
                  {block.data.items.map((item: any) => {
                    return (
                      <li
                        style={{
                          marginTop: "10px",
                        }}
                        key={item}
                        dangerouslySetInnerHTML={{ __html: item }}
                      ></li>
                    );
                  })}
                </ul>
              ) : (
                <ol key={block.id}>
                  {block.data.items.map((item: any) => {
                    return (
                      <li
                        key={item}
                        dangerouslySetInnerHTML={{ __html: item }}
                      ></li>
                    );
                  })}
                </ol>
              );
            } else if (block.type === "table") {
              return (
                <table
                  key={block.id}
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    borderRadius: "10px",
                    border: "1px solid #dddddd",
                  }}
                >
                  <thead>
                    {/* {block.data.withHeadings && ( */}
                    <tr>
                      {block.data.content[0].map(
                        (heading: any, index: number) => (
                          <th
                            key={index}
                            style={{
                              padding: "8px",
                              textAlign: "left",
                              width: index === 0 ? "200px" : "auto",
                              fontWeight: index === 0 ? 400 : 600,
                              // backgroundColor: "#e6e6e6",
                              borderRight:
                                index === 0 ? "1px solid #dddddd" : undefined,
                            }}
                            dangerouslySetInnerHTML={{
                              __html: heading,
                            }}
                          ></th>
                        )
                      )}
                    </tr>
                    {/* )} */}
                  </thead>
                  <tbody>
                    {block.data.content.map((row: any, index: number) => {
                      if (index !== 0) {
                        return (
                          <tr
                            style={{
                              borderRight:
                                index === 0 ? "1px solid #dddddd" : undefined,
                              // backgroundColor:
                              //   index % 2 === 0
                              //     ? "#e6e6e6"
                              //     : "#f5f5f5",
                            }}
                            key={index}
                          >
                            {row.map((cell: any, cellIndex: any) => (
                              <td
                                key={cellIndex}
                                style={{
                                  padding: "8px",
                                  textAlign: "left",
                                  // border: "1px solid #dddddd",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: cell,
                                }}
                              ></td>
                            ))}
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              );
            }
          })}
          {countryDetails ? (
            <Typography sx={{ mt: 2 }}>
              If you manifest to find any wrong records in our frequency bands
              listing, please do no longer hesitate to touch us at data
              <Link
                style={{ textDecoration: "underline" }}
                href={"safarilistofficial@gmail.com"}
              >
                {" "}
                safarilistofficial@gmail.com
              </Link>
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}
