"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";

const PaymentForm = ({
  servicesOrCategories,
}: {
  servicesOrCategories: {
    categories: string[];
    services: {
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
    }[];
  };
}) => {
  console.log("first category  ", servicesOrCategories);
  // State for selected category and filtered services
  const [selectedCategory, setSelectedCategory] = useState<string>(
    servicesOrCategories.categories[0]
  );
  const [selectedService, setSelectedService] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<
    typeof servicesOrCategories.services
  >([]);

  // Update services based on the selected category
  useEffect(() => {
    const servicesForCategory = servicesOrCategories.services.filter(
      (service) => service.category === selectedCategory
    );
    setSelectedService(servicesForCategory[0]?.name)
    setFilteredServices(servicesForCategory);
  }, [selectedCategory, servicesOrCategories.services]);

  // New state to store the selected service
  console.log('filteredServices', filteredServices)
  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Get form values using e.target (form.elements)
    const category = form.category.value;
    const service = form.service.value;
    const link = form.link.value;
    const quantity = form.quantity.value;
    const charge = form.charge.value;

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
    <Box sx={{ p: 2, mt: 2 }} component={Paper}>
      <form onSubmit={handleSubmit}>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Category
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            sx={{ height: "40px" }}
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, // Limit height for better scrolling
                },
              },
            }}
          >
            {servicesOrCategories.categories.map((category) => (
              <MenuItem selected key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Service
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            sx={{ height: "40px" }}
            name="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as string)}
          >
            {
              filteredServices.map((service) => (
                <MenuItem selected key={service.name} value={service.name}>
                  {service.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Link
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Link"
          name="link"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Quantity
        </Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          name="quantity"
          defaultValue={500}
          helperText="Min: 500 - Max: 1 000 000"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Avg Time
        </Typography>
        <TextField
          fullWidth
          size="small"
          disabled
          type="text"
          name="avgTime"
          defaultValue={"5 min"}
          helperText="Min: 500 - Max: 1 000 000"
          sx={{ mb: 2 }}
        />

        <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
          Charge
        </Typography>
        <TextField
          fullWidth
          size="small"
          name="charge"
          value="$0.3278"
          disabled
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="small"
          sx={{ backgroundColor: "#6f2df3", color: "#fff" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;
// "use client";

// import React from "react";
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Box,
//   FormControl,
//   Typography,
//   Paper,
// } from "@mui/material";

// const PaymentForm = ({
//   servicesOrCategories,
// }: {
//   servicesOrCategories: {
//     categories: string[];
//     services: {
//       service: string;
//       name: string;
//       type: string;
//       rate: string;
//       min: string;
//       max: string;
//       dripfeed: boolean;
//       refill: boolean;
//       cancel: boolean;
//       category: string;
//     };
//   };
// }) => {
//   console.log("servicesOrCategories ", servicesOrCategories);
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;

//     // Get form values using e.target (form.elements)
//     const category = form.category.value;
//     const service = form.service.value;
//     const link = form.link.value;
//     const quantity = form.quantity.value;
//     const charge = form.charge.value;

//     console.log({
//       category,
//       service,
//       link,
//       quantity,
//       charge,
//     });

//     // Further actions, like API call for payment, can be handled here
//   };

//   return (
//     <Box sx={{ p: 2, mt: 2 }} component={Paper}>
//       <form onSubmit={handleSubmit}>
//         <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
//           Category
//         </Typography>
//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <Select
//             sx={{ height: "40px" }}
//             MenuProps={{
//               PaperProps: {
//                 style: {
//                   maxHeight: 400, // Limit height for better scrolling
//                 },
//               },
//             }}
//             name="category"
//             defaultValue={servicesOrCategories?.categories[0]}
//           >
//             {servicesOrCategories.categories.map((category) => (
//               <MenuItem selected key={category} value={category}>
//                 {category}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
//           Service
//         </Typography>
//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <Select sx={{ height: "40px" }} name="service" defaultValue="7839">
//             <MenuItem value="7839">
//               7839 - USA Traffic from Google.com [Organic]
//             </MenuItem>
//             {/* Add other services here */}
//           </Select>
//         </FormControl>

//         <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
//           Link
//         </Typography>
//         <TextField
//           fullWidth
//           size="small"
//           placeholder="Link"
//           name="link"
//           sx={{ mb: 2 }}
//         />

//         <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
//           Quantity
//         </Typography>
//         <TextField
//           fullWidth
//           size="small"
//           type="number"
//           name="quantity"
//           defaultValue={500}
//           helperText="Min: 500 - Max: 1 000 000"
//           sx={{ mb: 2 }}
//         />

//         <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
//           Avg Time
//         </Typography>
//         <TextField
//           fullWidth
//           size="small"
//           disabled
//           type="text"
//           name="avgTime"
//           defaultValue={"5 min"}
//           helperText="Min: 500 - Max: 1 000 000"
//           sx={{ mb: 2 }}
//         />

//         <Typography sx={{ fontSize: 20, fontWeight: 500 }} gutterBottom>
//           Charge
//         </Typography>
//         <TextField
//           fullWidth
//           size="small"
//           name="charge"
//           value="$0.3278"
//           disabled
//           sx={{ mb: 2 }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           size="small"
//           sx={{ backgroundColor: "#6f2df3", color: "#fff" }}
//         >
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default PaymentForm;
