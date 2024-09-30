import { CategoryTypes } from "@/types/category";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

export default function SubCategory({
  categories,
}: {
  categories: CategoryTypes[];
}) {
  const [isLoading, setIsLoading] =
    React.useState<boolean>(false);

  const { control, register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      id: 0,
      sub_categories: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_categories",
  });

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const selected = categories.find(
      (category) => category?.title === event.target.value
    );

    console.log("first category selected  ", event.target.value, selected);
    // If the category has sub_categories, set them in the form
    if (selected) {
      setValue(
        "sub_categories",
        selected?.sub_categories?.length
          ? selected.sub_categories
          : [{ title: "" }]
      );
      setValue("title", selected.title);
      setValue("id", selected.id);
    } else {
      reset({ sub_categories: [{ title: "" }], title: "", id: 0 });
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const trimmedData = {
        ...data,
        sub_categories: data.sub_categories.map((subCategory: any) => ({
          title: subCategory.title.trim(),
        })),
      };
    try {
      const response = await axios.put(`/api/category/create`, trimmedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false)
      console.log("response received  ", response);
      window.location.reload();
    } catch (error) {
        setIsLoading(false)
      console.error("Error updating category:", error);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      append({ title: "" }); // Add a new field when Enter is pressed
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          variant="filled"
          sx={{ my: 1, minWidth: "100%", display: "flex" }}
        >
          <InputLabel id="category-select-label">
            Category <sup style={{ color: "red", fontSize: 20 }}>*</sup>
          </InputLabel>

          <Select
            {...register("title")}
            labelId="category-select-label"
            id="category-select"
            onChange={handleCategoryChange}
            required
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Controller
              {...register(`sub_categories.${index}.title`)}
              control={control}
              defaultValue={field.title || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Sub Category ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  onKeyDown={handleKeyDown} // Add this to detect the Enter key
                />
              )}
            />
            <IconButton
              onClick={() => remove(index)}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
