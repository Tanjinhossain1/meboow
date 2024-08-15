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
import { CategoryTypes } from "@/types/category";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogComponent from "@/Component/Admin/Dialog";

export default function MainBrandsList({ category }: { category: CategoryTypes[] }) {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const [categoryDialogOpen, setCategoryDialogOpen] = React.useState(false);

  const [categorySelectedForEdit,setCategorySelectedForEdit] = React.useState<CategoryTypes | undefined>(undefined)

  const handleCategoryDialogClickOpen = (row:CategoryTypes) => {
    setCategorySelectedForEdit(row)
    setCategoryDialogOpen(true);
  };

  const handleCategoryDialogClose = () => {
    setCategoryDialogOpen(false);
  };
  const successFunc = (text: string) => {
    SnackbarOpen("Success Fully Edit Category", "success");
    window.location.reload();
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 400 },
    // {
    //   field: "createdAt",
    //   headerName: "Create Date",
    //   renderCell: (params: any) => (
    //     <Typography alignItems={"center"} sx={{ mt: 2 }}>
    //       {formatDate(params?.row?.createdAt)}
    //     </Typography>
    //   ),
    //   width: 200,
    // },
    {
      field: "actions",
      headerName: "Edit",
      renderCell: (params: any) => (
          <Button onClick={()=>handleCategoryDialogClickOpen(params?.row)} variant="contained" color="success">
            Edit
          </Button> 
      ),
      width: 100,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            if (window.confirm("Are you sure you want to Delete Category?")) {
              console.log("delete");
              handleOpen();
              axios
                .delete(`/api/category/delete/${params?.row?.id}`)
                .then((response) => {
                  if (response?.data?.success) {
                    handleClose();
                    SnackbarOpen("Success Fully Delete Category", "success");
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  handleClose();
                  console.error("Error creating Category:", err);
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
      <CommonTableComponent columnData={category} columns={columns} />;
      <Dialog
        open={categoryDialogOpen}
        onClose={handleCategoryDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogComponent
          categorySelectedForEdit={categorySelectedForEdit}
          handleClick={successFunc}
          handleBackdropClose={handleClose}
          handleBackDropOpen={handleOpen}
          handleDialogClose={handleCategoryDialogClose}
        />
      </Dialog>
    </>
  );
}
