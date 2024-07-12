"use client"
import React, { Fragment } from "react";
import { Button, Container } from "@mui/material";
import { BrandTypes } from "@/types/category";
import TopForm from "./TopForm";

export default  function MainSubmitForm({brands}:{brands:BrandTypes[]}) {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted", e.target);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TopForm brandsData={brands}  />
        <Container component="main" sx={{ textAlign: "end" }} maxWidth="sm">
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              padding: "10px 20px",
              mt: 2,
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "background-color 0.3s, transform 0.3s",
              "&:hover": {
                backgroundColor: "#303f9f",
                // transform: "scale(1.05)",
              },
              "&:active": {
                backgroundColor: "#283593",
                transform: "scale(0.95)",
              },
            }}
          >
            Submit
          </Button>
          <div id="bottom">
            <a href="#top">
              {" "}
              <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
                Go Up
              </Button>
            </a>
          </div>
        </Container> 
      </form>
    </Fragment>
  );
}
