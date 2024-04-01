"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const handleRegister = async (values) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      values
    );
    if (response.status === 201) {
      toast.success(response.data.msg);
      // router.push("/login");
    } else {
      toast.error(response.data.msg);
    }
  } catch (err) {
    // toast.error("Failed to register!");
    console.log(err)
  }
};

const Register = () => (
  <section className="py-24 bg-gray-50">
    <div className="container flex justify-center">
      <div className="flex flex-col items-center gap-8 w-1/3 p-8 shadow-lg bg-white">
        <h2 className="text-3xl font-semibold">Sign Up</h2>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            rePassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            handleRegister(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center gap-5 w-full">
              <div className="flex flex-col items-start gap-[2px] w-full relative">
                <label htmlFor="fullName">Full Name</label>
                <Field
                  name="fullName"
                  id="fullName"
                  className="border border-gray-600 p-1 w-full focus:outline-none"
                />
                <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                  {errors.fullName && touched.fullName ? errors.fullName : null}
                </div>
              </div>
              <div className="flex flex-col items-start gap-[2px] w-full relative">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-600 p-1 w-full focus:outline-none"
                />
                <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                  {errors.email && touched.email ? errors.email : null}
                </div>
              </div>
              <div className="flex flex-col items-start gap-[2px] w-full relative">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="border border-gray-600 p-1 w-full focus:outline-none"
                />
                <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                  {errors.password && touched.password ? errors.password : null}
                </div>
              </div>
              <div className="flex flex-col items-start gap-[2px] w-full relative">
                <label htmlFor="rePassword">Confirm Password</label>
                <Field
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className="border border-gray-600 p-1 w-full focus:outline-none"
                />
                <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                  {errors.rePassword && touched.rePassword
                    ? errors.rePassword
                    : null}
                </div>
              </div>
              <button
                type="submit"
                className="border py-1 px-2 bg-red-600 text-white"
              >
                Submit
              </button>
              <p className="w-full text-start">
                Already have an account?{" "}
                <Link href="#" className="inline-block underline font-medium">
                  Sign In
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </section>
);

export default Register;
