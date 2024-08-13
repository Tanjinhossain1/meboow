"use client";
import {
  Accordion,
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
  AccordionDetails,
  AccordionSummary,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Box,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import FileUpload from "@/Component/Forms/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BrandTypes, CategoryTypes } from "@/types/category";
import DialogComponent from "@/Component/Admin/Dialog";
import { DatePicker } from "antd";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import {
  MobileArticleDefaultFormType,
  MobileArticleType,
} from "@/types/mobiles";
import { RhfDefaultInitialValues } from "./DefaultRhfData";
import { RemoveCircle } from "@mui/icons-material";

const OtherDetailsForms = [
  {
    holderId: "1",
    title: "Physical Specification",
    key: "physicalSpecification",
  },
  {
    holderId: "2",
    title: "Network",
    key: "network",
  },
  {
    holderId: "3",
    title: "Display",
    key: "display",
  },
  {
    holderId: "4",
    title: "Processor",
    key: "processor",
  },
  {
    holderId: "5",
    title: "Memory",
    key: "memory",
  },
  {
    holderId: "6",
    title: "Main Camera",
    key: "mainCamera",
  },
  {
    holderId: "7",
    title: "Selfie Camera",
    key: "selfieCamera",
  },
  {
    holderId: "8",
    title: "OS",
    key: "os",
  },
  {
    holderId: "9",
    title: "Connectivity",
    key: "connectivity",
  },
  {
    holderId: "10",
    title: "Features",
    key: "features",
  },
  {
    holderId: "11",
    title: "Battery",
    key: "battery",
  },
];
export default function ExpertView({
  rhfMethods,
}: {
  rhfMethods: UseFormReturn<MobileArticleDefaultFormType, any, undefined>;
}) {
  const { register } = useFormContext();

  const {
    fields: score_fields,
    append: score_field_append,
    remove: score_field_remove,
  } = useFieldArray({
    control: rhfMethods.control,
    name: "expert_view.specific_final_score",
  });

  const {
    fields: consFields,
    append: consAppend,
    remove: consRemove,
  } = useFieldArray({
    control: rhfMethods.control,
    name: "expert_view.cons",
  });

  const {
    fields: prosFields,
    append: prosAppend,
    remove: prosRemove,
  } = useFieldArray({
    control: rhfMethods.control,
    name: "expert_view.pros",
  });
  const handleKeyPress = (e: any, append: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      append({ list: "" });
    }
  };

  return (
    <Fragment>
      <Grid gap={1} container>
        {/* <Grid xs={12}>
          {" "}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            Total Score
          </Typography>
        </Grid> */}
        {/* <Grid xs={5}>
          <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
            <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
              Total Score <sup style={{ color: "red", fontSize: 20 }}>*</sup>
            </InputLabel>
            <FilledInput
              size="small"
              {...register("expert_view.total_score", { required: true })}
              //   name="title"
              id="filled-adornment-amount"
              placeholder="Total Score"
              required
              inputProps={{ step: 0.1 }}
              type="number"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
            />
          </FormControl>
        </Grid> */}
        <Grid xs={12}>
          {" "}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            Spec Score
          </Typography>
        </Grid>
        {/* <Grid container>
          {score_fields.map((field, index) => {
            // {OtherDetailsForms.map((otherDetails, index) => {

            return (
              <Fragment key={index}>
                <Grid xs={3}>
                  <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
                    {/* <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
                    {field.name ? field.name : "Field name "}
                    <sup style={{ color: "red", fontSize: 20 }}>*</sup>
                  </InputLabel>  
                    <Grid gap={1} container>
                      <Grid xs={6.5}>
                        <TextField
                          {...rhfMethods.register(
                            `expert_view.specific_final_score.${index}.name`
                          )}
                          label="Display Name"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          sx={{ mb: 3 }}
                        />
                      </Grid>
                      <Grid sx={{display:"flex"}} xs={5}>
                        <TextField
                          size="small"
                          {...register(
                            `expert_view.specific_final_score.${index}.value`,
                            {
                              required: true,
                            }
                          )}
                          onKeyPress={(e) =>
                            handleKeyPress(e, score_field_append)
                          }
                          inputProps={{ step: 0.1 }}
                          //   name="title"
                          id="filled-adornment-amount"
                          placeholder={"Value"}
                          required
                          type="number"
                           
                        />
                        {index > 0 && (
                          <IconButton
                            color="error"
                            onClick={() => prosRemove(index)}
                          >
                            <RemoveCircle />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Fragment>
            );
          })}
        </Grid> */}
         {OtherDetailsForms?.map((otherDetails, index) => {
          return (
            <Fragment key={index}>
              <Grid xs={1.8}>
                <FormControl sx={{ my: 2, width: "100%" }} variant="filled">
                  <InputLabel sx={{ mb: 1 }} htmlFor="filled-adornment-amount">
                    {otherDetails?.title}
                    <sup style={{ color: "red", fontSize: 20 }}>*</sup>
                  </InputLabel>
                  <FilledInput
                    size="small"
                    {...register(
                      `expert_view.specific_score.${otherDetails?.key}`,
                      {
                        required: true,
                      }
                    )}
                    inputProps={{ step: 0.1 }}
                    //   name="title"
                    id="filled-adornment-amount"
                    placeholder={otherDetails?.title}
                    required
                    type="number"
                    startAdornment={
                      <InputAdornment position="start"></InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Fragment>
          );
        })}  

        <Grid xs={12}>
          {" "}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            List of Pros
          </Typography>
        </Grid>
        {prosFields?.map((field, index) => (
          <Grid item xs={2} key={field.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                // border: "1px solid gray",
                // p: 2,
                borderRadius: 1,
              }}
            >
              <TextField
                {...rhfMethods.register(`expert_view.pros.${index}.list`)}
                label="Pros"
                variant="outlined"
                size="small"
                fullWidth
                onKeyPress={(e) => handleKeyPress(e, prosAppend)}
              />
              {index > 0 && (
                <IconButton color="error" onClick={() => prosRemove(index)}>
                  <RemoveCircle />
                </IconButton>
              )}
            </Box>
          </Grid>
        ))}
        <Grid xs={12}>
          {" "}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            List of Cons
          </Typography>
        </Grid>
        {consFields?.map((field, index) => (
          <Grid item xs={2} key={field.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                // border: "1px solid gray",
                // p: 2,
                borderRadius: 1,
              }}
            >
              <TextField
                {...rhfMethods.register(`expert_view.cons.${index}.list`)}
                label=" Cons"
                variant="outlined"
                size="small"
                fullWidth
                onKeyPress={(e) => handleKeyPress(e, consAppend)}
              />
              {index > 0 && (
                <IconButton color="error" onClick={() => consRemove(index)}>
                  <RemoveCircle />
                </IconButton>
              )}
            </Box>
          </Grid>
        ))}
        <Grid xs={12}>
          {" "}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            Verdict
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={
              <span>
                Verdict <sup style={{ color: "red", fontSize: 12 }}>*</sup>
              </span>
            }
            multiline
            rows={4}
            {...rhfMethods.register(`expert_view.verdict`)}
            // name={"verdict"}
            sx={{ width: "100%" }}
            variant="outlined"
            // value={value}
            // onChange={onChange}
          />
        </Grid>
        <Grid xs={12}>
          {" "}
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            Give Article Url
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={
              <span>
                Url{" "}
                {/* Url <sup style={{ color: "red", fontSize: 12 }}>*</sup> */}
              </span>
            }
            rows={4}
            {...rhfMethods.register(`expert_view.article_urls`)}
            // name={"verdict"}
            sx={{ width: "100%" }}
            size="small"
            // value={value}
            // onChange={onChange}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
