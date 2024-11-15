import { MobileTagsType } from "@/types/mobiles";
import { formatForUrlWith_under_score } from "@/utils/utils";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import React from "react";

export default function Tags({
  tags,
  pageTag,
}: {
  tags?: MobileTagsType[];
  pageTag?: { name: string }[];
}) {
  return (
    <Grid gap={2} sx={{ my: 4 }} container>
      {pageTag
        ? pageTag?.map((tag, index) => {
            return (
              <Chip
                key={index}
                label={tag.name}
                component="a"
                href={`/search?search=${encodeURIComponent(formatForUrlWith_under_score(tag.name))}`}
                variant="outlined"
                clickable
              />
            );
          })
        : tags?.map((tag) => {
            return (
              <Chip
                key={tag.id}
                label={tag.name}
                component="a"
                href={`/search?search=${encodeURIComponent(formatForUrlWith_under_score(tag.name))}`}
                variant="outlined"
                clickable
              />
            );
          })}
    </Grid>
  );
}
