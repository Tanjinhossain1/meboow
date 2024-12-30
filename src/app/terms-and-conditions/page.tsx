import { Container, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";


export const metadata = {
  title: 'Term Condition - Safari List',
  description: 'Learn more about our Term Condition - Safari List page to see our all conditions',
  keywords: ['Term Condition', 'Safari List', 'company', 'mission', 'values', 'services'],
  openGraph: {
    title: 'Term Condition - Safari List',
    description: 'Learn more about our Term Condition - Safari List page to see our all conditions',
    url: `${process.env.NEXT_PUBLIC_META_URL}/terms-and-conditions`,
    siteName: 'Safari List',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Term Condition - Safari List',
    description: 'Learn more about our Term Condition - Safari List page to see our all conditions',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/terms-and-conditions`,
  },
};


export default function AboutUs() {
  return (
    <Grid container>
      <Navbar />
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
        <Container sx={{ mt: 4 }}>
          <Paper sx={{  p: 5 }} elevation={2}>
            <div className="flex justify-center">
            <Image src="/negotiation.png" alt="negotiation" width={350} height={350} />
            </div>
            <Typography component={'h1'} sx={{ fontSize: 25,textAlign: "center", fontWeight: 600 }}>
              Terms & Conditions
            </Typography>
            <div className="max-w-3xl mx-auto p-4 space-y-6 text-sm">
      <p>
        Please review the following terms and conditions concerning the use of this website free of
        any charge. {`"us"`} is Arena from OOD. By accessing, using or downloading materials from
        this website you agree to follow and be bound by these terms and conditions.
      </p>

      <section>
        <h2 className="font-bold mb-2">COPYRIGHT INFORMATION</h2>
        <p>
          Copyright 2000-2023 Arena Com, Ltd. All Rights Reserved. Some company and product
          names on the site may be trademarks or registered trademarks of individual companies and
          are respectfully acknowledged.
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-2">USE OF WEBSITE INFORMATION</h2>
        <p>
          You may download, view, copy and print documents and graphics incorporated in these
          documents (the {`"Documents"`}) from this website subject to the following: (1) the Documents
          may be used solely for personal, informational, non-commercial purposes, and (2) the
          Documents may not be modified or altered in any way. Except as expressly provided herein,
          you may not use, download, upload, copy, print, display, perform, reproduce, publish, license,
          post, transmit or distribute any information from this website in whole or in part without the
          prior written permission of SafariList.com.
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-2">FEEDBACK</h2>
        <p>
          Except where expressly provided otherwise by SafariList, all comments, feedback,
          information or materials submitted to SafariList through or in association with this Web site
          shall be considered non-confidential and {`SafariList's`} property. By submitting such
          comments, feedback, information or materials to SafariList, you agree to a no-charge
          assignment to SafariList of all worldwide rights, title and interest in copyrights and other
          intellectual property rights to the comments, feedback, information or materials. SafariList
          shall be free to use such comments, feedback, information or materials on an unrestricted
          basis.
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-2">LINKS TO THIRD PARTY SITES</h2>
        <p>
          This website may contain hyperlinks to websites controlled by parties other than SafariList.
          SafariList is not responsible for and does not endorse the contents or use of these websites.
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-2">AFFILIATE LINKS</h2>
        <p>
          SafariList price comparison engine provides links to online stores solely for price comparison
          purposes. As Associates to Amazon and the other stores linked however SafariList may
          receive a small commission for any qualifying purchases you make when visiting these links.
          The affiliate programs SafariList participates in are completely independent of the editorial
          product review process and our editors do not benefit from picking out specific deals.
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-2">Warranties and Disclaimers</h2>
        <p>
          The information, software, products and services contained on this web site may be out of date or include omissions, inaccuracies or other errors. Except where expressly provided otherwise in an agreement between you and SafariList, all information, software, products and services are provided {`"as is"`} without warranty of any kind. SafariList hereby disclaims all warranties with respect to this information, software, products and services, whether express or implied, including the implied warranties of merchantability and fitness for a particular purpose. In no event shall SafariList be liable for any direct, indirect, incidental, special or consequential damages or damages for loss of profits, revenue, data or use, incurred by you or any third party, whether in an action in contract or tort, arising from your access to, or use of, this web site. SafariList reserves the right to make changes or updates to this web site at any time without notice.
        </p>
      </section>
      <section>
        <h2 className="font-bold mb-2">Indemnification</h2>
        <p>
          You agree to indemnify and hold Arena Kom OOD, its officers, directors, owners, agents and
          employees, harmless from any claim or demand, including reasonable {`attorneys'`} fees, made
          by any third party due to or arising out of your use of the message boards on {`SafariList's`}
          website, the violation of these terms and conditions by you, or the infringement by you, or
          other user of the message boards using your computer, of any intellectual property or other
          right of any person or entity. Arena Com Ltd reserves the right, at its own expense, to assume
          the exclusive defense and control of any matter otherwise subject to indemnification by you.
        </p>
      </section>
    </div>
          </Paper>
        </Container>
      </Container>
      <Footer />
    </Grid>
  );
}
