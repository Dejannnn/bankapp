"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import CustomInput from "./CustomInput";

import { authFormSchema } from "@/lib/utils";

//Actions
import { signUp, signIn } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: AuthFormProps) => {
  const formSchema = authFormSchema(type);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const data = {
          firstName: values.firstName!,
          lastName: values.lastName!,
          email: values.email,
          address1: values.address1!,
          city: values.city!,
          state: values.state!,
          postalCode: values.postalCode!,
          dateOfBirth: values.dateOfBirth!,
          ssn: values.ssn!,
          password: values.password,
        };
        const user = await signUp(data);
        setUser(user);
      }
      if (type === "sign-in") {
        const { email, password } = values;
        const user = await signIn({ email, password });
        if (user) router.push("/");
      }
    } catch (error) {
      console.log("Error after press button", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md-gap-8">
        <Link href={"/"} className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            alt={"Horizon logo"}
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="FirstName"
                      placeholder="Enter firstname"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Lastname"
                      placeholder="Enter lastname"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex: NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 11011"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date Of Birth"
                      placeholder="yyyy-mm-dd"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="ssn"
                      placeholder="ex: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit">
                  {isLoading ? (
                    <>Loading...</>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Dont have an account"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
