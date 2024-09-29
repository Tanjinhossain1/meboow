"use client";
import React, { useState, useEffect, Fragment } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { SAMPLE_SERVICES_SINGLE_DETAIL } from "./SAMPLE_SERVICES_DETAIL";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import InfoIcon from "@mui/icons-material/Info";
import { categoriesProperName } from "./CategoryButtons";

function extractFirstServiceId(serviceString: string) {
  // Split the string by spaces or dashes
  const parts = serviceString.split(/[-\s]+/);

  // Find the first part that contains only numbers (the ID)
  for (let part of parts) {
    if (/^\d+$/.test(part)) {
      return part; // Return the first number found
    }
  }

  return ""; // Return null if no ID is found
}
function extractFirstLink(text: string) {
  // Regular expression to match URLs, handling "or" between links
  const urlRegex = /(https?:\/\/[^\s<]+)/g;

  // Decode the HTML entities for the URL (like &#58; to :)
  const decodedText = text?.replace(/&#58;/g, ":").replace(/\\\//g, "/");

  // Replace " or " between links with a space to handle it
  const cleanedText = decodedText?.replace(/\sor\s/g, " ");

  // Use the regular expression to find all URLs
  const matches = cleanedText.match(urlRegex);

  // Return all matches as a string, joined by ', ' (or any separator)
  return matches ? matches.join(" Or ") : "";
}

function extractValue(text: any, key: any) {
  // Decode the HTML entities for the URL (like &#58; to :)
  const decodedText = text?.replace(/&#58;/g, ":").replace(/\\\//g, "/");

  // Regular expressions for different keys
  const regexMap: any = {
    link: /(https?:\/\/[^\s<]+)/g, // Match a URL
    start: /Start:\s*([^\s<]+)/i, // Match the 'Start' value
    speed: /Speed:\s*([^\s<]+)/i, // Match the 'Speed' value
    refill: /Refill:\s*([^\s<]+)/i, // Match the 'Refill' value
    guarantee: /Guarantee:\s*([^\s<]+)/i,
  };

  // Get the appropriate regular expression
  const regex = regexMap[key.toLowerCase()];

  // Check if the regex exists and match against the decoded text
  const match = regex ? decodedText?.match(regex) : null;

  // If a match is found, return the first capture group, otherwise return null
  return match && match[1] ? match[1] : null;
}
interface ListOfServices {
  service: string;
  name: string;
  type: string;
  rate: string;
  min: string;
  max: string;
  dripfeed: boolean;
  refill: boolean;
  cancel: boolean;
  category: string;
}
const NewOrderForm = ({
  servicesOrCategories,
  selectedCategoryFromTop,
}: {
  servicesOrCategories: {
    categories: string[];
    services: ListOfServices[];
  };
  selectedCategoryFromTop: string;
}) => {
  console.log("first category  ", servicesOrCategories);
  // State for selected category and filtered services
  const [selectedCategory, setSelectedCategory] = useState<string>(
    servicesOrCategories.categories[0]
  );

  const [listOfCategories, setSelectedCategories] = useState<string[]>(
    servicesOrCategories.categories
  );

  const [selectedService, setSelectedService] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<
    typeof servicesOrCategories.services
  >([]);
  const [quantity, setQuantity] = useState<number | null>(null);

  // Update services based on the selected category
  useEffect(() => {
    if (selectedCategoryFromTop) {
      if (selectedCategoryFromTop === "Everythings") {
        setSelectedCategories(servicesOrCategories?.categories);
        setSelectedCategory(servicesOrCategories.categories[0]);
      } else if (selectedCategoryFromTop === "Others") {
        const excludedServices = [
          "Instagram", "Facebook", "YouTube", "Twitter", "Spotify",
          "TikTok", "Telegram", "Linkedin", "Discord", "Website Traffic"
        ];
        
        const servicesForCategoryFromTop = servicesOrCategories.categories.filter((service) =>
          !excludedServices.some(excluded => service.toLowerCase().includes(excluded.toLowerCase()))
        );
        setSelectedCategory(servicesForCategoryFromTop[0]);
        setSelectedCategories(servicesForCategoryFromTop);
      } else {
        const servicesForCategoryFromTop =
          servicesOrCategories.categories.filter((service) =>
            service.toLowerCase().includes(selectedCategoryFromTop.toLowerCase())
          );
        setSelectedCategory(servicesForCategoryFromTop[0]);
        setSelectedCategories(servicesForCategoryFromTop);
      }
    }
  }, [servicesOrCategories, selectedCategoryFromTop]);
  useEffect(() => {
    const servicesForCategory = servicesOrCategories.services.filter(
      (service) => service.category === selectedCategory
    );
    setSelectedService(
      `${servicesForCategory[0]?.service} - ${servicesForCategory[0]?.name} - $${servicesForCategory[0]?.rate} per 1000`
    );
    setFilteredServices(servicesForCategory);
  }, [listOfCategories]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Get form values using e.target (form.elements)
    const category = form.category.value;
    const service = form.service.value;
    const link = form.link.value;
    const quantity = form.quantity.value;
    const charge = form.charge.value.replace(/\$/g, '').trim();

    console.log({
      category,
      service,
      link,
      quantity,
      charge,
    });
    // Further actions, like API call for payment, can be handled here
  };

  return (
    <Fragment>
      <Grid container>
        <Grid xs={12} md={6}>
          <Box sx={{ p: 2, mt: 2 }} component={Paper}>
            <form onSubmit={handleSubmit}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }} gutterBottom>
                Category
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  sx={{ height: "40px" }}
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setSelectedCategory(e.target.value as string);
                    const servicesForCategory =
                      servicesOrCategories.services.filter(
                        (service) => service.category === selected
                      );
                    setSelectedService(
                      `${servicesForCategory[0]?.service} - ${servicesForCategory[0]?.name} - $${servicesForCategory[0]?.rate} per 1000`
                    );
                    setFilteredServices(servicesForCategory);
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 400, // Limit height for better scrolling
                      },
                    },
                  }}
                >
                  {listOfCategories.map((category) => (
                    <MenuItem selected key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography sx={{ fontSize: 18, fontWeight: 600 }} gutterBottom>
                Service
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Select
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 400, // Limit height for better scrolling
                      },
                    },
                  }}
                  sx={{ height: "40px" }}
                  name="service"
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value as string);
                  }}
                >
                  {filteredServices.map((service) => (
                    <MenuItem
                      selected
                      key={service.name}
                      value={`${service?.service} - ${service.name} - $${service?.rate} per 1000`}
                    >
                      {service?.service} - {service.name} - ${service?.rate} per
                      1000
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography sx={{ fontSize: 18, fontWeight: 600 }} gutterBottom>
                Link
              </Typography>
              <TextField
                required
                fullWidth
                size="small"
                placeholder="Link"
                name="link"
                sx={{ mb: 2 }}
              />

              <Typography sx={{ fontSize: 18, fontWeight: 600 }} gutterBottom>
                Quantity
              </Typography>
              <TextField
                fullWidth
                required
                size="small"
                type="number"
                name="quantity"
                onChange={(e) => setQuantity(+e.target.value)}
                helperText={
                  <Fragment>
                    <p className="text-red-500">
                      {quantity &&
                      SAMPLE_SERVICES_SINGLE_DETAIL[
                        extractFirstServiceId(selectedService)
                      ]?.min > quantity
                        ? "Minimum Value 10"
                        : quantity &&
                          SAMPLE_SERVICES_SINGLE_DETAIL[
                            extractFirstServiceId(selectedService)
                          ]?.max < quantity
                        ? "Don't accept More than Max value"
                        : ""}
                    </p>
                    <p className="text-black">
                      {
                        SAMPLE_SERVICES_SINGLE_DETAIL[
                          extractFirstServiceId(selectedService)
                        ]?.min_max_label
                      }
                    </p>
                  </Fragment>
                }
                // "Min: 500 - Max: 1 000 000"
                sx={{ mb: 2 }}
              />

              <Typography sx={{ fontSize: 18, fontWeight: 600 }} gutterBottom>
                Avg Time <InfoIcon sx={{ fontSize: 20 }} />
              </Typography>
              <TextField
                fullWidth
                size="small"
                // disabled
                type="text"
                name="avgTime"
                value={
                  SAMPLE_SERVICES_SINGLE_DETAIL[
                    extractFirstServiceId(selectedService)
                  ]?.average_time
                }
                sx={{ mb: 2 }}
              />

              <Typography sx={{ fontSize: 18, fontWeight: 600 }} gutterBottom>
                Charge
              </Typography>
              <TextField
                fullWidth
                // disabled
                size="small"
                name="charge"
                value={`$ ${
                  quantity
                    ? Number(
                        (SAMPLE_SERVICES_SINGLE_DETAIL[
                          extractFirstServiceId(selectedService)
                        ]?.orig_price *
                          quantity) /
                          1000
                      )
                    : ""
                }`}
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ backgroundColor: "#6f2df3", color: "#fff" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grid>{" "}
        <Grid xs={12} md={6}>
          <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-md rounded-sm border border-gray-200">
              <div className="bg-purple-700 text-white px-6 py-4 rounded-t-sm  items-center justify-between text-center">
                <p className="font-semibold text-lg bg-orange-500 rounded-full w-28 mx-auto py-1">
                  # {extractFirstServiceId(selectedService)}
                </p>
                <span className="text-lg font-bold  text-center">
                  {selectedService}
                </span>
              </div>

              <div className="p-6 space-y-6">
                {/* Example Link */}
                <div className="space-y-1">
                  <span className="text-gray-500 text-sm font-semibold">
                    Example Link
                  </span>
                  <div className="bg-gray-100 p-2 rounded-lg break-all text-gray-700">
                    <AddLinkIcon className="bg-pink-600 p-2 rounded-full text-white text-4xl mr-3" />
                    {extractFirstLink(
                      SAMPLE_SERVICES_SINGLE_DETAIL[
                        extractFirstServiceId(selectedService)
                      ]?.description || ""
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Time */}
                  <div className="space-y-1">
                    <span className="text-gray-500 text-sm font-semibold">
                      Start Time
                    </span>
                    <div className="bg-gray-100 p-2 rounded-lg break-all text-gray-700">
                      <RestartAltIcon className="bg-cyan-500 p-2 rounded-full text-white text-4xl mr-3" />
                      {extractValue(
                        SAMPLE_SERVICES_SINGLE_DETAIL[
                          extractFirstServiceId(selectedService)
                        ]?.description,
                        "start"
                      )}
                    </div>
                  </div>

                  {/* Speed */}
                  <div className="space-y-1">
                    <span className="text-gray-500 text-sm font-semibold">
                      Speed
                    </span>
                    <div className="bg-gray-100 p-2 rounded-lg break-all text-gray-700">
                      <LocalShippingIcon className="bg-purple-600 p-2 rounded-full text-white text-4xl mr-3" />
                      {extractValue(
                        SAMPLE_SERVICES_SINGLE_DETAIL[
                          extractFirstServiceId(selectedService)
                        ]?.description,
                        "speed"
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 text-sm font-semibold">
                      Guarantee
                    </span>
                    <div className="bg-gray-100 p-2 rounded-lg break-all text-gray-700">
                      <WorkspacePremiumIcon className="bg-green-600 p-2 rounded-full text-white text-4xl mr-3" />
                      {extractValue(
                        SAMPLE_SERVICES_SINGLE_DETAIL[
                          extractFirstServiceId(selectedService)
                        ]?.description,
                        "guarantee"
                      ) || <CloseIcon sx={{ color: "red" }} />}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 text-sm font-semibold">
                      Avarage Time
                    </span>
                    <div className="bg-gray-100 p-2 rounded-lg break-all text-gray-700">
                      <AccessTimeFilledIcon className="bg-blue-600 p-2 rounded-full text-white text-4xl mr-3" />
                      {
                        SAMPLE_SERVICES_SINGLE_DETAIL[
                          extractFirstServiceId(selectedService)
                        ]?.average_time
                      }
                    </div>
                  </div>
                </div>

                {/* More Details */}
                <div className="space-y-1">
                  <span className="text-gray-500 text-sm font-semibold">
                    More Details
                  </span>
                  <div className="bg-gray-100 p-2 rounded-lg break-all text-gray-700">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          SAMPLE_SERVICES_SINGLE_DETAIL[
                            extractFirstServiceId(selectedService)
                          ]?.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>{" "}
      </Grid>
    </Fragment>
  );
};

export default NewOrderForm;
