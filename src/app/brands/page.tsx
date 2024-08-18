import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { truncateText } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { RecentArticleDataType } from "@/types/RecentArticle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BrandTypes } from "@/types/category";
import {
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import BrandDisplayComponent from "@/Component/HomePage/BrandDisplay";
import MobileListComponent from "@/Component/Details/MobileListComponent";
import BrandListComponent from "@/Component/Details/BrandListComponent";
import CategoryListComponent from "@/Component/Category/CategoryListComponent";


export const metadata = {
  title: 'Brands - Safari List',
  description: 'Learn more about our company, mission, and brands at Safari List, products, phones, articles.',
  keywords: ['Brands', 'Safari List', 'company', 'mission', 'brands', 'services',"products","phones","articles"],
  openGraph: {
    title: 'Brands - Safari List',
    description: 'Learn more about our company, mission, and brands at Safari List, products, phones, articles.',
    url: 'https://safarilist.com/brands',
    siteName: 'Safari List',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brands - Safari List',
    description: 'Learn more about our company, mission, and brands at Safari List, products, phones, articles.',
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: 'https://safarilist.com/brands',
  },
};
export default async function BrandPage() {
  const brands = await fetchBrands();
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "20" });
  const Category = await fetchCategories();
  return (
    <Fragment>
      <Navbar />
      <Grid container>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
        <Grid xs={12} md={10} lg={9.8} xl={8}>
          <Paper
            className="min-h-screen md:max-w-[1000px] mx-auto"
            sx={{ p: 2, mb: 2 }}
            elevation={2}
          >
            <Breadcrumbs sx={{ fontSize: 12 }} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography sx={{ fontSize: 12 }}>List Of All Brands</Typography>
            </Breadcrumbs>
            <Grid container>
              <Grid xs={8}>
                <Typography
                  sx={{ fontSize: 25, fontWeight: 600, mt: 5, mb: 2 }}
                >
                  {" "}
                  List Of Brands
                </Typography>
                <Grid gap={1} container>
                  <BrandDisplayComponent brands={brands.data} />
                </Grid>
              </Grid>

              <Grid xs={12} sx={{ mt: 10 }} lg={4}>
                <MobileListComponent mobileArticles={mobileArticles.data} />
                <CategoryListComponent category={Category.data} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
      </Grid>
      <Footer />
    </Fragment>
  );
}
