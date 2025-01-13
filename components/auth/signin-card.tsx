"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import logoPic from "../../public/images/round-logo.png";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
// import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";

export function SignInCard() {
  // const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (email: String, password: String) => {
    setLoading(true);
    console.log("----- debug data-----", email, password);

    const status = await signIn("email", {
      email: email,
      password: password,
    });

    if (status?.error) {
      toast.error(status?.error, {
        position: "top-right",
      });
    }
    if (status?.ok) {
      toast.success("Welcome back to Our Company!", {
        position: "top-right",
      });

      router.push(
        searchParams.get("callbackUrl") ||
          process.env.NEXT_PUBLIC_DEFAULT_WEBSITE_URL ||
          "/"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/3 border border-gray-200 p-4 rounded-md h-full gap-5">
      <div className="flex flex-row items-center justify-center gap-3 mb-5">
        <div className="flex items-center justify-center">
          <Image
            src={logoPic}
            width={50}
            height={50}
            alt="GFE Foundation logo"
          />
        </div>
        <p className="text-center text-2xl sm:text-3xl">
          Welcome to{"  "}
          <span className="bg-gradient-to-r from-[#77C167] to-[#1A88F9] bg-clip-text font-semibold text-transparent">
            Our Company
          </span>
        </p>
      </div>

      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row items-center justify-center">
          <FcGoogle className="flex p-1" size={35} />
          <Button className="flex text-lg">Continue with Google</Button>
        </div>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#2D79FF] to-[#22B4FD]"
          isLoading={loading}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
