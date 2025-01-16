"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/textInput";
import SignUp from "../signup/page";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

const SignIn = () => {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    const result = await signIn("credentials", values);
    setLoading(false);
    if (result?.error) {
      console.error("Sign-in failed:", result.error);
    } else {
      console.log("Sign-in successful!");
      router.push("/admin");
    }
  };

  return (
    <>
      {toggle ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6">Sign In</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form className="space-y-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && errors.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
                  )}

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password && (
                    <div className="text-sm text-red-500">
                      {errors.password}
                    </div>
                  )}

                  <Button type="submit" loading={loading}>
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>

            <p className="mt-4 text-sm text-center text-gray-600">
              You don't have an account?
              <span
                className="text-indigo-600 hover:underline"
                onClick={handleToggle}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      ) : (
        <SignUp handleToggle={handleToggle} />
      )}
    </>
  );
};

export default SignIn;
