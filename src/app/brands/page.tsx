import React, { Fragment } from "react";
import {
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import Footer from "@/Component/HomePage/Footer";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

const NavbarHelper = dynamic(
  () => import("@/Component/Shared/NavbarHelperComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const BrandDisplayComponent = dynamic(
  () => import("@/Component/HomePage/BrandDisplay"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const MobileListComponent = dynamic(
  () => import("@/Component/Details/MobileListComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const CategoryListComponent = dynamic(
  () => import("@/Component/Category/CategoryListComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);

export const metadata = {
  title: 'Brands - Safari List',
  description: 'Learn more about our company, mission, and brands at Safari List, products, phones, articles.',
  keywords: ['Brands', 'Safari List', 'company', 'mission', 'brands', 'services',"products","phones","articles"],
  openGraph: {
    title: 'Brands - Safari List',
    description: 'Learn more about our company, mission, and brands at Safari List, products, phones, articles.',
    url: `${process.env.NEXT_PUBLIC_META_URL}/brands`,
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
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/brands`,
  },
};
export default async function BrandPage() {
  const brands = await fetchBrands();
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "20" });
  const Category = await fetchCategories();
  const session = await getServerSession(authConfig);
  const user = session?.user;
  return (
    <Fragment>

     <NavbarHelper categories={Category?.data} isLoginUser={user} />
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
