import NavbarLoadingSkeleton from '@/Component/Shared/NavbarLoadingSkeleton'
import { Grid, Skeleton } from '@mui/material'
import React, { Fragment } from 'react'

export default function loading() {
  return (
    <Fragment>
    <NavbarLoadingSkeleton />
     <Grid container>
       <Grid item xs={1} md={1} lg={1.1} xl={2.5}></Grid>
       <Grid item sx={{ m: 0, p: 0, mt: 4 }} xs={10} md={10} lg={9.8} xl={7}>
         <Skeleton variant="rectangular" sx={{ height: "450px", backgroundColor: "#5c5b5b",mt:2 }} />
       </Grid>
       <Grid item xs={1} md={1} lg={1.1} xl={2.5}></Grid>
     </Grid>
   </Fragment>
  )
}
