"use client";
import React, { useContext, useState } from "react";
import { Button, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate, formatForUrlWith_under_score } from "@/utils/utils";
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

export default function MainBrandsList({
  category,
  user,
}: {
  category: CategoryTypes[];
  user: any;
}) {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const [copied, setCopied] = useState(false);

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const handleCopy = async (params: CategoryTypes) => {
    try {
      const textToCopy = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/category/${formatForUrlWith_under_score(params?.title)}`;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedId(params?.id);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const [categoryDialogOpen, setCategoryDialogOpen] = React.useState(false);

  const [categorySelectedForEdit, setCategorySelectedForEdit] = React.useState<
    CategoryTypes | undefined
  >(undefined);

  const handleCategoryDialogClickOpen = (row: CategoryTypes) => {
    setCategorySelectedForEdit(row);
    setCategoryDialogOpen(true);
  };

  const handleCategoryDialogClose = () => {
    setCategoryDialogOpen(false);
  };
  const successFunc = (text: string) => {
    SnackbarOpen("Success Fully Edit Category", "success");
    window.location.reload();
  };
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
        <Button
          onClick={() => handleCategoryDialogClickOpen(params?.row)}
          variant="contained"
          color="success"
        >
          Edit
        </Button>
      ),
      width: 100,
    },
    {
      field: "copy",
      headerName: "Copy",
      renderCell: (params: any) => (
        <div>
          <Button
            color={copiedId === params.row.id ? "success" : "info"}
            size="small"
            variant="contained"
            onClick={() => handleCopy(params?.row)}
            className="copy-button"
          >
            {copiedId === params.row.id ? "Copied!" : "Copy URL"}
          </Button>
        </div>
      ),
      width: 100,
    },
    user?.role === "admin" && {
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
          user={user}
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
