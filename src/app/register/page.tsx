
import { redirect } from "next/navigation";
import RegisterComponent from "@/Component/Register/RegisterComponent";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export const metadata = {
  title: "Register - Safari List",
  description:
    "IN Safari List Register page you Register or login of our website and get many extra feature to export all things like opinion or be a fan ob mobiles.",
  keywords: [
    "Register",
    "Safari List", 
    "login",
    "website",
    'feature'
  ],
  openGraph: {
    title: "Register - Safari List",
    description:
      "IN Safari List Register page you Register or login of our website and get many extra feature to export all things like opinion or be a fan ob mobiles.",
    url: "https://safarilist.com/register",
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register - Safari List",
    description:
      "IN Safari List Register page you Register or login of our website and get many extra feature to export all things like opinion or be a fan ob mobiles.",
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: "https://safarilist.com/register",
  },
};

const Register = async () => {
  // const session = await auth();
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
  const user = session?.user;
  console.log(session,'register  ',user)
  if (user) redirect("/"); 


  return (
    <>
    <Navbar />
    <RegisterComponent />
    <Footer />
    </>
  );
};
export default Register;