"use client";
import { MobileArticleType } from "@/types/mobiles";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { lazy, useEffect, useState } from "react";
import { countries } from "./Countries";
import {
  fetchCountryName,
  fetchNetworkBands,
} from "@/services/articleServices";
import { NetworkBandsType } from "@/types/network-bands";
import Link from "next/link";
import { formatForUrl } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { SampleBrands } from "@/Component/HomePage/ContentBox";

const LatestDevices = lazy(
  () => import("@/Component/HomePage/Component/LatestDevices")
);
const PhoneFinder = lazy(() => import("@/Component/Common/PhoneFinder"));

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}

export default function MainComponent({
  latestDeviceMobiles,
  isEdit,
}: {
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
  };

  useEffect(() => {
    async function fetchCountry() {
      if (isEdit?.isEdit) {
        const countryDetails = await fetchNetworkBands({
          country: isEdit?.country ? isEdit?.country : undefined,
        });
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
            position: "relative", // Keep the container relative for text overlay
            width: "100%",
            height: "320px", // Set a fixed height for the container
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          xs={12}
          sm={7.8}
        >
          {/* Using Next.js Image component for optimized image handling */}
          <Image
            src="/network.jpeg"
            alt="Network coverage"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 75vw, 50vw"
            quality={75}
            loading="lazy"
            style={{
              filter: "grayscale(100%)",
              objectFit: "cover",
              objectPosition: "center",
            }} // Apply object-fit and object-position here
          />

          {/* Text content overlay */}
          <h1
            style={{
              position: "absolute",
              bottom: "50px",
              left: "10px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "30px",
            }}
          >
            Network coverage {country ? `in ${country}` : ""}
          </h1>
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
          <LatestDevices mobiles={latestDeviceMobiles?.slice(0, 6)} />
        </Grid>
        <Grid
          sx={{
            my: 1,
            ml: 1,
          }}
          xs={12}
          sm={7.8}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 24,
              fontWeight: 600,
              mb: 2,
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            Network Coverage {country ? `in ${country}` : ""}
          </Typography>

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
                  aria-label="Select Country"
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
                  {countries.map((countryName) => (
                    <MenuItem
                      key={countryName}
                      value={countryName}
                      style={{
                        padding: 0, // Remove padding from the MenuItem to rely on the Link for full control
                      }}
                    >
                      <Link
                        aria-label={`Network Band: ${countryName}`}
                        href={`/network-bands/${formatForUrl(countryName)}`}
                        style={{
                          display: "inline-block", // Allow padding and dimensions
                          width: "100%", // Ensure it takes up the full width
                          minHeight: "48px", // Ensure minimum touch target height (48px for better touch)
                          padding: "16px 12px", // Add padding for larger touch area
                          textDecoration: "none", // Ensure the link style remains clean
                          color: "inherit", // Maintain text color
                          boxSizing: "border-box", // Ensures padding is counted within the width and height
                        }}
                      >
                        {countryName}
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
              );
            } else if (block.type === "image") {
              return (
                <Image
                  loading="lazy"
                  quality={70}
                  key={block.id}
                  layout="responsive"
                  width={block.data.height}
                  height={block.data.height}
                  src={block.data.file.url}
                  alt={block.data.file.url}
                />
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
