"use client";
import { Input } from "@/components/ui/input";
import { hash } from "bcryptjs";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import BackdropProviderContext from "../BackdropProvider";
import SnackbarProviderContext from "../SnackbarProvider";

const LoginComponent = () => {
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );

  const [error, setError] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    handleOpen();
    try {
      console.log({ email: data.get("email"), password: data.get("password") });

      // if (signInResponse && !signInResponse.error) {
      //   //Redirect to homepage (/timeline)
      //   router.push("/");
      // } else {
      //   console.log("Error: ", signInResponse);
      //   setError("Your Email or Password is wrong!");
      // }
      const res = await signIn("credentials", {
        redirect: false,
        email: data.get("email"),
        password: data.get("password"),
      });
      if (res?.error) {
        SnackbarOpen(res.error, "error");
      } else {
        window.location.reload()
        SnackbarOpen("Login Success", "success");
      }
      handleClose();
      // router.push('/');
      console.log("Login successful", res);
    } catch (err: any) {
      handleClose();
      console.error("Login error", err.message);
      setError(err.message || "An error occurred");
    }
  };
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ color: "white" }}>
          Email Address{" "}
        </label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          name="email"
          style={{ marginBottom: "1 0px" }}
          className=" text-black"
        />

        <label htmlFor="email" style={{ color: "white" }}>
          Password
        </label>
        <Input
          id="password"
          placeholder="*************"
          type="password"
          name="password"
          className="mb-6 text-black"
        />
        <p
          style={{
            fontSize: 16,
            color: "red",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
        <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Login &rarr;
        </button>

        <p className="text-center text-neutral-600 text-sm max-w-sm mt-4 dark:text-neutral-300">
          Dont have account? <Link href="/register">Register</Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
};

export default LoginComponent;
