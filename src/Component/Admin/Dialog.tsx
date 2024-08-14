import {
  Button,
  Container,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import FileUpload from "@/Component/Forms/UploadImage";

export default function DialogComponent({
  handleDialogClose,
  handleBackdropClose,
  handleBackDropOpen,
  handleClick,
  isBrand,
}: {
  handleDialogClose: () => void;
  handleBackdropClose: () => void;
  handleBackDropOpen: () => void;
  handleClick: (text: string) => void;
  isBrand?: boolean;
}) {
  const fileUploadRef = useRef();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();  // Stop the event from propagating to the outer form
    handleBackDropOpen();
    const title = (event.target as any)?.title.value;
    // const value = (event.target as any)?.value.value;
    console.log(
      "submit data  ",

      {
        title,
        // value,
      }
    );
    console.log('fileUploadRef.current  ',fileUploadRef.current);
    const data = isBrand
      ? {
          title,
          image: fileUploadRef.current,
          //   value
        }
      : {
          title,
          //   value
        };
    await axios
      .post(isBrand ? `/api/brands/create` : `/api/category/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: any) => {
        if (response?.data?.success) {
          handleClick(
            isBrand
              ? "SUccessfully Brand Created"
              : "Successfully Category Created"
          );
          handleDialogClose();
          window.location.reload();
        }
      })
      .catch((err: any) => {
        handleBackdropClose();
        console.log("error", err);
      });

    handleBackdropClose();
  };
  return (
    <Container sx={{ p: 3 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 550 }}>
        {isBrand ? "Add Brands" : "Add Category"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
          <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
            Title <sup style={{ color: "red", fontSize: 20 }}>*</sup>
          </InputLabel>
          <FilledInput
            name="title"
            id="filled-adornment-amount"
            placeholder="Title"
            required
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        {
          isBrand ? 
        <FileUpload
        isSingleImage={{
          imageUrl:  "",
          isSingleImage: true,
          urls: "/api/v1/image/upload/article",
          getImageDatas(image) {
            fileUploadRef.current = image;
          },
        }}
          // runAfterChange={async (file) => {
          //   console.log("Uploading file brand", file);
          //   const formData = new FormData();
          //   formData.append("file", file);
          //   try {
          //     const response = await axios.post(
          //       `/api/v1/image/upload/brands`,
          //       formData,
          //       {
          //         headers: {
          //           "Content-Type": "multipart/form-data",
          //         },
          //       }
          //     );

          //     if (response.data.success === 1) {
          //       console.log("File uploaded successfully", response.data);
          //       fileUploadRef.current = response.data?.file?.url;
          //     } else {
          //       throw new Error("Upload failed");
          //     }
          //   } catch (error) {
          //     console.error("Error uploading file:", error);
          //     throw error;
          //   }
          // }}
          required
          name="titleImage"
        /> : null
      }
        <Container sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button color="error" onClick={handleDialogClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Container>
      </form>
    </Container>
  );
}
