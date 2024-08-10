import { MobileArticleType } from "@/types/mobiles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useFormContext } from "react-hook-form";

export default function DevicesDetails({
  isEdit,
}: {
  isEdit?: {
    isEdit: boolean;
    mobileArticles: MobileArticleType[];
  };
}) {
  const { register } = useFormContext();

  const [is_daily_interest, setIs_daily_interest] = React.useState(
    isEdit?.isEdit && isEdit?.mobileArticles[0] ? isEdit?.mobileArticles[0]?.is_daily_interest : ""
  );
  const [is_by_fans, setIs_by_fans] = React.useState(
    isEdit?.isEdit && isEdit?.mobileArticles[0] ? isEdit?.mobileArticles[0]?.is_by_fans : ""
  );
  const [is_latest_device, setIs_latest_device] = React.useState(
    isEdit?.isEdit && isEdit?.mobileArticles[0] ? isEdit?.mobileArticles[0]?.is_latest_device : ""
  );

  const handleInterestChange = (event: SelectChangeEvent) => {
    setIs_daily_interest(event.target.value);
  };
  const handleIs_by_fansChange = (event: SelectChangeEvent) => {
    setIs_by_fans(event.target.value);
  };
  const handleIs_latest_deviceChange = (event: SelectChangeEvent) => {
    setIs_latest_device(event.target.value);
  };

  return (
    <Fragment>
      <Paper className="mx-auto w-3/4" sx={{p:2,my:2}}>
        <Typography sx={{fontSize:24,fontWeight:600}}>Devices Details</Typography>
        <Grid gap={1}  container>
          <Grid xs={3.7}>
            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Is Daily Interest{" "}
                <sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                {...register("is_daily_interest")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={is_daily_interest}
                name="is_daily_interest"
                onChange={handleInterestChange}
                size="small"
                required
              >
                <MenuItem value={"YES"}>YES</MenuItem>
                <MenuItem value={"NO"}>NO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3.7}>
            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Is By Fans{" "}
                <sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                {...register("is_by_fans")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={is_by_fans}
                name="is_by_fans"
                onChange={handleIs_by_fansChange}
                size="small"
                required
              >
                <MenuItem value={"YES"}>YES</MenuItem>
                <MenuItem value={"NO"}>NO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3.7}>
            <FormControl
              variant="filled"
              sx={{ my: 1, minWidth: "100%", display: "flex" }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Is Latest Device{" "}
                <sup style={{ color: "red", fontSize: 20 }}>*</sup>
              </InputLabel>

              <Select
                {...register("is_latest_device")}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={is_latest_device}
                name="is_latest_device"
                onChange={handleIs_latest_deviceChange}
                size="small"
                required
              >
                <MenuItem value={"YES"}>YES</MenuItem>
                <MenuItem value={"NO"}>NO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}
