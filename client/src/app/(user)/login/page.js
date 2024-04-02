"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
});

const Login = () => {
  const router = useRouter();
  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        values
      );
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.msg);
        router.push("/login");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error("Failed to register!");
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container flex justify-center">
        <div className="flex flex-col items-center gap-8 w-1/3 p-8 shadow-lg bg-white">
          <h2 className="text-3xl font-semibold">Sign In</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col items-center gap-5 w-full">
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
                    {errors.password && touched.password
                      ? errors.password
                      : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="border py-1 px-2 bg-red-600 text-white"
                >
                  Login
                </button>
                <p className="w-full text-start">
                  Already have an account?{" "}
                  <Link
                    href="/register"
                    className="inline-block underline font-medium"
                  >
                    Create New
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
