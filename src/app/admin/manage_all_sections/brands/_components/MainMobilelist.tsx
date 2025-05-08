"use client";
import React, { useContext, useState } from "react";
import { Button, Typography } from "@mui/material";
import { formatDate, formatForUrlWith_under_score } from "@/utils/utils";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import { BrandTypes } from "@/types/category";
import {
  Dialog,
} from "@mui/material";
import DialogComponent from "@/Component/Admin/Dialog";

export default function MainBrandsList({
  brands,
  user,
}: {
  brands: BrandTypes[];
  user: any;
}) {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const handleCopy = async (params: BrandTypes) => {
    try {
      const textToCopy = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/mobile/brand-wise/${formatForUrlWith_under_score(params?.title)}`;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedId(params?.id);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const [brandDialogOpen, setBrandDialogOpen] = React.useState(false);

  const [brandSelectedForEdit, setBrandSelectedForEdit] = React.useState<
    BrandTypes | undefined
  >(undefined);

  const handleBrandDialogClickOpen = (row: BrandTypes) => {
    setBrandSelectedForEdit(row);
    setBrandDialogOpen(true);
  };

  const handleBrandDialogClose = () => {
    setBrandDialogOpen(false);
  };
  const successFunc = (text: string) => {
    SnackbarOpen("Success Fully Edit Brand", "success");
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
          onClick={() => handleBrandDialogClickOpen(params?.row)}
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
