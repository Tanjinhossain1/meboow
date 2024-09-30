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
import React, { useRef, useState } from "react";
import FileUpload from "@/Component/Forms/UploadImage";
import { BrandTypes, CategoryTypes } from "@/types/category";

export default function DialogComponent({
  handleDialogClose,
  handleBackdropClose,
  handleBackDropOpen,
  handleClick,
  isBrand,
  brandSelectedForEdit,
  categorySelectedForEdit,
  user
}: {
  handleDialogClose: () => void;
  handleBackdropClose: () => void;
  handleBackDropOpen: () => void;
  handleClick: (text: string) => void;
  user:any;
  isBrand?: boolean;
  brandSelectedForEdit?: BrandTypes;
  categorySelectedForEdit?: CategoryTypes;
}) {
  const fileUploadRef = useRef();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault(); // Stop the event from propagating to the outer form
    handleBackDropOpen();
    setIsLoading(true)
    const title = (event.target as any)?.title.value;
    // const value = (event.target as any)?.value.value;
    console.log(
      "submit data  ",

      {
        title,
        // value,
      }
    );
    console.log("fileUploadRef.current  ", fileUploadRef.current);
    const data = isBrand
      ? brandSelectedForEdit
        ? {
            title,
            image: fileUploadRef.current,
            id: brandSelectedForEdit?.id,
            admin_detail_edit: {
              email: user?.email,
              name: user?.fullName,
              role: user?.role,
            },
            //   value
          }
        : {
            title,
            image: fileUploadRef.current,
            admin_detail: {
              email: user?.email,
              name: user?.fullName,
              role: user?.role,
            },
          }
      : categorySelectedForEdit ? {
        title,
        id: categorySelectedForEdit?.id,
        admin_detail_edit: {
          email: user?.email,
          name: user?.fullName,
          role: user?.role,
        },
      } :{
          title,
          admin_detail: {
            email: user?.email,
            name: user?.fullName,
            role: user?.role,
          },
        };
    if ( categorySelectedForEdit || brandSelectedForEdit) {
      await axios
        .put(categorySelectedForEdit ? `/api/category/create` :`/api/brands/create`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response: any) => {
          if (response?.data?.success) {
            handleClick(isBrand ? "SUccessfully Edit Brand" : "");
            handleDialogClose();
            setIsLoading(false)
          }
        })
        .catch((err: any) => {
          handleBackdropClose();
          setIsLoading(false)
          console.log("error", err);
        });
    }
    if (!brandSelectedForEdit && !categorySelectedForEdit) {
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
            setIsLoading(false)
            window.location.reload();
          }
        })
        .catch((err: any) => {
          handleBackdropClose();
          setIsLoading(false)
          console.log("error", err);
        });
    }

    handleBackdropClose();
    setIsLoading(false)
  };
  return (
    <Container sx={{ p: 3 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 550 }}>
        {isBrand
          ? brandSelectedForEdit
            ? "Edit Brand"
            : "Add Brands"
          : categorySelectedForEdit ? "Edit Category":"Add Category"}
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
            defaultValue={
              brandSelectedForEdit ? brandSelectedForEdit?.title :categorySelectedForEdit ? categorySelectedForEdit?.title : undefined
            }
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        {isBrand ? (
          <FileUpload
            isSingleImage={{
              imageUrl: brandSelectedForEdit ? brandSelectedForEdit?.image : "",
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
          />
        ) : null}
        <Container sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button color="error" onClick={handleDialogClose} variant="contained">
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Container>
      </form>
    </Container>
  );
}
