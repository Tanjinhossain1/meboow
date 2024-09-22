
import { redirect } from "next/navigation";
import LoginComponent from "@/Component/Login/LoginComponent";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export const metadata = {
  title: 'Login - Safari List',
  description: 'Here you will Login To Safari List. For more information visit our faq page. For more information after login you can comment and give opinion and give vote to all mobiles',
  keywords: ['Login', 'Safari List', 'related', 'mobiles', 'Login', 'services',"products","phones","articles"],
  openGraph: {
    title: 'Login - Safari List',
    description: 'Here you will Login To Safari List. For more information visit our faq page. For more information after login you can comment and give opinion and give vote to all mobiles',
    url: `${process.env.NEXT_PUBLIC_META_URL}/login`,
    siteName: 'Safari List',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - Safari List',
    description: 'Here you will Login To Safari List. For more information visit our faq page. For more information after login you can comment and give opinion and give vote to all mobiles',
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/login`,
  },
};

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
