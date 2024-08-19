import React from "react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-full pt-16">
          <h1 className="font-bold text-3xl text-muted-foreground">
            Welcome back!
          </h1>
          <p className="text-base">
            Log in or create account to get back to your dashboard
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
      <Image 
      src={"/logo.svg" }
    height={"100"}
    width={"100"}
    alt="Logo"
/>
      </div>
    </div>
  );
};

export default SignInPage;
