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
  FormHelperText,
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
    title: "Design",
    key: "design",
  },
  {
    holderId: "3",
    title: "Display",
    key: "display",
  },
  {
    holderId: "2",
    title: "Performance",
    key: "performance",
  },
  {
    holderId: "4",
    title: "Camera",
    key: "camera",
  },
  {
    holderId: "5",
    title: "Connectivity",
    key: "connectivity",
  },
  {
    holderId: "6",
    title: "Features",
    key: "features",
  },
  {
    holderId: "7",
    title: "Battery",
    key: "battery",
  },
  {
    holderId: "8",
    title: "Usability",
    key: "usability",
  },
];
export default function ExpertView({
  rhfMethods,
}: {
  rhfMethods: UseFormReturn<MobileArticleDefaultFormType, any, undefined>;
}) {
  const { register,formState:{errors} } = useFormContext();

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
  const handlePaste = (event:any) => {
    const pasteData = event.clipboardData.getData("text");
    const pasteArray = pasteData.split("\n").filter((item:any) => item.trim());

    // If there's only one field, we replace it with the first pasted value
    if (prosFields.length === 1 && !prosFields[0].list) {
      prosRemove(0);
    }

    pasteArray.forEach((item:any) => prosAppend({ list: item.trim() }));

    event.preventDefault();
  };
  const handlePasteCons = (event:any) => {
    const pasteData = event.clipboardData.getData("text");
    const pasteArray = pasteData.split("\n").filter((item:any) => item.trim());

    // If there's only one field, we replace it with the first pasted value
    if (consFields.length === 1 && !consFields[0].list) {
      consRemove(0);
    }

    pasteArray.forEach((item:any) => consAppend({ list: item.trim() }));

    event.preventDefault();
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
              <Grid xs={2}>
                <FormControl sx={{ my: 2, width: "100%" }} variant="outlined">
                  <InputLabel id="number-select-label">{otherDetails?.title}</InputLabel>
                  <Select
                    {...register(
                      `expert_view.specific_score.${otherDetails?.key}`,
                      {
                        required: "Required Field",
                      }
                    )}
                    fullWidth
                    labelId="number-select-label"
                    label={otherDetails?.title}
                    sx={{ height: "40px" }}
                    error={!!(errors.expert_view as any)?.specific_score?.[otherDetails?.key]}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(
                      (number) => (
                        <MenuItem key={number} value={number}>
                          {number}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {(errors.expert_view as any)?.specific_score?.[otherDetails?.key] && (
                            <FormHelperText sx={{color:"red"}}>
                              {(errors.expert_view as any)?.specific_score?.[otherDetails?.key].message}
                            </FormHelperText>
                          )}
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
                onPaste={index === 0 ? handlePaste : undefined}
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
                onPaste={index === 0 ? handlePasteCons : undefined}
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
