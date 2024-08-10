"use client"
import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  
import { useRouter } from "next/navigation";
import OtherPageFooter from "@/Component/Shared/Footer";

export default function ContactUs() {
    const history = useRouter()
  return (
    <Grid container>
      <Container
        sx={{
          width: {
            xs: "100%", // 80% width on extra-small screens
            sm: "100%", // 70% width on small screens
            md: "100%", // 60% width on medium screens
            lg: "100%", // 50% width on large screens
            xl: "100%", // 40% width on extra-large screens
          },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container sx={{mt:4}}>
            <Container onClick={()=>history.back()} sx={{width:"100%",bgcolor:"#eb94d7",p:1}}>
            <ArrowBackIcon  sx={{fontSize:30,color:"whitesmoke"}} />
            </Container>
          <Paper sx={{ textAlign: "center", p: 5 }} elevation={2}>
            <Image
              src="/customer-service.png"
              alt=""
              width={350}
              height={350}
            />
            <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
              Contact us
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: 16,
                fontWeight: 500,
                width: "60%",
                mx: "auto",
              }}
            >
              Check out our FAQs and Stay Safe sections to see if your question
              has already been answered. If not, please get in touch with us and
              we will get back to you as soon as possible.
            </Typography>
            <Typography sx={{ mt: 3, fontSize: 25, fontWeight: 600 }}>
              You can also call or email us
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontSize: 16,
                fontWeight: 500,
                width: "60%",
                mx: "auto",
              }}
            >
              Every day from 10:00 AM to 8:00 PM
            </Typography>
            <Grid container>
            <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600,textAlign:"center" }}>
               <CallIcon sx={{color:"#a3007d",fontSize:24}} /> Call us
              </Typography>
              <Typography variant="h6" component="div" sx={{fontSize:15, color:"#ab659b"}}>
               +8801861557343
              </Typography>
            </Grid>

            <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600,textAlign:"center" }}>
               <LocationOnIcon sx={{color:"#a3007d",fontSize:24}} /> Address
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontSize:15 }}>
              2 No Dhakessori, modinabag, chairman office, Narayanganj, Dhaka
              </Typography>
            </Grid>

            <Grid xs={12} sm={4} sx={{ mt: 3 }} md={4}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600,textAlign:"center" }}>
               <EmailIcon sx={{color:"#a3007d",fontSize:24}} /> Email Us
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontSize:15,color:"#ab659b" }}>
              tanjinhossain2003@gmail.com
              </Typography>
               
              </Typography>
               
            </Grid>
          </Grid>
          </Paper>
        </Container>
      </Container>
      <div style={{marginTop:5,width:"100%",}}>
      <OtherPageFooter />
      </div>
    </Grid>
  );
}
