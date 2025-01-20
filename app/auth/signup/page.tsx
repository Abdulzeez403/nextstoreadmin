"use client";

import React from "react";
import Input from "@/components/textInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { register } from "@/lib/features/user/userThunk";
import { Formik, Form } from "formik";
import Button from "@/components/button";
import { toast } from "@/hooks/use-toast";

interface SignUpProps {
  handleToggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const SignUp: React.FC<SignUpProps> = ({ handleToggle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, error, message } = useSelector(
    (state: RootState) => state.user
  );

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await dispatch(register(values)).unwrap();
      router.push("/signin");
      toast({ title: message || "Sign up successful" });
    } catch (err) {
      toast({ title: error || "invalid credential" });

      console.error("Error during registration:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Create an Account
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-4">
              <Input
                label="Name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name ? errors.name : ""}
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : ""}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.password && errors.password ? errors.password : ""
                }
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" loading={loading}>
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={handleToggle}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
