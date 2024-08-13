import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { Fragment, useContext } from "react";
import SnackbarProviderContext from "../SnackbarProvider";
import BackdropProviderContext from "../BackdropProvider";

export default function CreateTag() {
    
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

    const submitHandler = (event: any) => {
        event.preventDefault();
        const name = event.target.name.value;
        handleOpen();
    const finalValue = {
        name
    };
    axios
      .post(`/api/article/mobile/tags`, finalValue)
      .then((response) => {
        console.log("Article created successfully:", response);
        // Do something with the response if needed
        if (response?.data?.success) {
          handleClose();
          SnackbarOpen("Successfully Create Tag", "success");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error creating article:", err);
        SnackbarOpen(err?.message || "Error Creating Tag", "error");
        handleClose();
        // Handle error if needed
      });
    console.log(finalValue);
    }
  return (
    <Fragment>
      <Grid sx={{p:2}}> 
        <form onSubmit={submitHandler}>
          <TextField
            name="name"
            id="outlined-basic"
            label="Tag Name"
            variant="outlined"
            size="small"
          />
          <Button type="submit" variant="contained">Create Tag</Button>
        </form>
      </Grid>
    </Fragment>
  );
}
