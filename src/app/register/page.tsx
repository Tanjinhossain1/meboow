
import { redirect } from "next/navigation";
import RegisterComponent from "@/Component/Register/RegisterComponent";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

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