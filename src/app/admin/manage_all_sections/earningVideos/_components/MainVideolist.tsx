"use client";
import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { VideoListUrlDataType } from "@/types/RecentArticle";
import { formatDate } from "@/utils/utils";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";

export default function MainVideoDetailList({
  articles,
  user,
}: {
  articles: VideoListUrlDataType[];
  user: any;
}) {
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );



  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "video", headerName: "VideoId", width: 200 },
    { field: "income", headerName: "Income", width: 200 },
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
    user?.role === "admin" && {
      field: "delete",
      headerName: "Delete",
      renderCell: (params: any) => (
        <Button
          size="small"
          onClick={() => {
            if (window.confirm("Are you sure you want to Delete Article?")) {
              console.log("delete");
              handleOpen();
              axios
                .delete(`/api/earning/uploadurl/delete/${params?.row?.id}`)
                .then((response) => {
                  if (response?.data?.success) {
                    handleClose();
                    SnackbarOpen("Success Fully Delete url", "success");
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  handleClose();
                  console.error("Error creating url:", err);
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
  return <CommonTableComponent columnData={articles} columns={columns} />;
}
