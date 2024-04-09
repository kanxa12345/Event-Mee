"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ShowSchema = Yup.object().shape({
  // fullName: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // email: Yup.string().email("Invalid email").required("Required"),
  // password: Yup.string()
  //   .required("Required")
  //   .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  // rePassword: Yup.string()
  //   .required("Required")
  //   .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const Show = () => {
  const router = useRouter();

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        values
      );
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
        <div className="flex flex-col items-center gap-8 w-2/3">
          <h2 className="text-3xl font-semibold">Add Your Event</h2>
          <Formik
            initialValues={{
              showName: "",
              showType: "",
              place: "",
              price: "",
              startTime: "",
              endTime: "",
              description: "",
            }}
            validationSchema={ShowSchema}
            onSubmit={(values, { resetForm }) => {
              handleRegister(values);
              resetForm();
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="flex flex-col items-start gap-5 w-full">
                <div className="flex items-center gap-8 w-full">
                  <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                    <label htmlFor="showName">Event Name</label>
                    <Field
                      name="showName"
                      id="showName"
                      className="border border-gray-600 p-1 w-full focus:outline-none"
                    />
                    <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                      {errors.showName && touched.showName
                        ? errors.showName
                        : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                    <label htmlFor="place">Place</label>
                    <Field
                      type="text"
                      name="place"
                      id="place"
                      className="border border-gray-600 p-1 w-full focus:outline-none"
                    />
                    <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                      {errors.place && touched.place ? errors.place : null}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 w-full">
                  <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                    <div id="checkbox-group">Event Type</div>
                    <div
                      role="group"
                      aria-labelledby="checkbox-group"
                      className="flex items-center gap-4"
                    >
                      <label className="flex items-center gap-1">
                        <Field type="checkbox" name="checked" value="One" />
                        Party
                      </label>
                      <label className="flex items-center gap-1">
                        <Field type="checkbox" name="checked" value="Two" />
                        Comedy Show
                      </label>
                      <label className="flex items-center gap-1">
                        <Field type="checkbox" name="checked" value="Three" />
                        Concert
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                    <label htmlFor="price">Price Per Ticket</label>
                    <Field
                      type="number"
                      name="price"
                      id="price"
                      className="border border-gray-600 p-1 w-full focus:outline-none"
                    />
                    <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                      {errors.price && touched.price ? errors.price : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                  <label htmlFor="date">Date</label>
                  <Field
                    type="date"
                    name="date"
                    id="date"
                    className="border border-gray-600 p-1 w-full focus:outline-none"
                  />
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.date && touched.date ? errors.date : null}
                  </div>
                </div>
                <div className="flex items-center gap-8 w-full">
                  <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                    <label htmlFor="startTime">Starting Time</label>
                    <Field
                      type="time"
                      name="startTime"
                      id="startTime"
                      className="border border-gray-600 p-1 w-full focus:outline-none"
                    />
                    <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                      {errors.startTime && touched.startTime
                        ? errors.startTime
                        : null}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-[2px] w-1/2 relative">
                    <label htmlFor="endTime">Ending Time</label>
                    <Field
                      type="time"
                      name="endTime"
                      id="endTime"
                      className="border border-gray-600 p-1 w-full focus:outline-none"
                    />
                    <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                      {errors.endTime && touched.endTime
                        ? errors.endTime
                        : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px] w-full relative">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    rows="5"
                    className="border border-gray-600 p-1 w-full focus:outline-none"
                  />
                  <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                    {errors.description && touched.description
                      ? errors.description
                      : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-1 px-2 bg-secondColor text-white mx-auto"
                >
                  Add Now
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Show;
