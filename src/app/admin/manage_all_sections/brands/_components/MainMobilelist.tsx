"use client";
import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate } from "@/utils/utils";
import Link from "next/link";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import { MobileArticleType } from "@/types/mobiles";
import { BrandTypes } from "@/types/category";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogComponent from "@/Component/Admin/Dialog";

export default function MainBrandsList({ brands ,user}: { brands: BrandTypes[],user:any }) {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);

  const [brandSelectedForEdit,setBrandSelectedForEdit] = React.useState<BrandTypes | undefined>(undefined)

  const handleBrandDialogClickOpen = (row:BrandTypes) => {
    setBrandSelectedForEdit(row)
    setBrandDialogOpen(true);
  };

  const handleBrandDialogClose = () => {
    setBrandDialogOpen(false);
  };
  const successFunc = (text: string) => {
    SnackbarOpen("Success Fully Edit Brand", "success");
    window.location.reload();
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "createdAt",
      headerName: "Create Date",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>
          {formatDate(params?.row?.createdAt)}
        </Typography>
      ),
      width: 200,
    },
    {
      field: "actions",
      headerName: "Edit",
      renderCell: (params: any) => (
          <Button onClick={()=>handleBrandDialogClickOpen(params?.row)} variant="contained" color="success">
            Edit
          </Button> 
      ),
      width: 100,
    },
    user?.role === "admin"&&{
      field: "delete",
      headerName: "Delete",
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to Delete Brand?")) {
              console.log("delete");
              handleOpen();
              axios
                .delete(`/api/brands/delete/${params?.row?.id}`)
                .then((response) => {
                  if (response?.data?.success) {
                    handleClose();
                    SnackbarOpen("Success Fully Delete Brand", "success");
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  handleClose();
                  console.error("Error creating Brand:", err);
                });
            }
          }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <CommonTableComponent columnData={brands} columns={columns} />;
      <Dialog
        open={brandDialogOpen}
        onClose={handleBrandDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogComponent
        user={user}
          isBrand
          brandSelectedForEdit={brandSelectedForEdit}
          handleClick={successFunc}
          handleBackdropClose={handleClose}
          handleBackDropOpen={handleOpen}
          handleDialogClose={handleBrandDialogClose}
        />
      </Dialog>
    </>
  );
}
