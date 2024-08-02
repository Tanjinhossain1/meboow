
import { redirect } from "next/navigation";
import LoginComponent from "@/Component/Login/LoginComponent";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

const Login = async () => {
  // const session = await auth();
  
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
  const user = session?.user;
  console.log(session, "register  ", user);
  if (user) redirect("/");

  return (
     <LoginComponent />
  );
};

export default Login;
