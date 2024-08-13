import { MobileTagsType } from "@/types/mobiles";
import { Chip, Grid } from "@mui/material";
import React from "react";

export default function Tags({tags}:{tags?: MobileTagsType[]}) {
  return (
    <Grid gap={2} sx={{my:4}} container>
        {
            tags?.map(tag =>{
                return  <Chip
                key={tag.id}
                label={tag.name}
                component="a"
                href={`/search?search=${tag.name}`}
                variant="outlined"
                clickable
              />
            })
        }
    </Grid>
  );
}
