"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const PasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
});

const Profile = () => {
  const { userDetail } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (values) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        values
      );
      if (response.status === 201) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error("Failed to change password!");
    }
  };

  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="container flex gap-10">
          <div className="w-2/5 flex flex-col items-start gap-4">
            <div>
              <FaUserCircle className="text-gray-500 text-[50px]" />
              <p className="text-2xl font-semibold">{userDetail.fullName}</p>
              <small className="font-medium text-base text-gray-600">
                {userDetail.email}
              </small>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="py-1 px-2 bg-thirdColor text-white"
            >
              Change Password
            </button>
          </div>
        </div>
        <div className="w-3/5"></div>
      </section>
      {openModal && (
        <div className="fixed inset-0 z-50 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
          <div className="w-1/4 p-6 bg-white shadow-xl flex flex-col items-end gap-5">
            <button onClick={() => setOpenModal(false)}>
              <FaXmark className="text-xl" />
            </button>
            <div className="w-full flex flex-col gap-6">
              <h2 className="text-3xl font-semibold">Change Password</h2>
              <Formik
                initialValues={{
                  email: "",
                  oldPassword: "",
                  newPassword: "",
                  rePassword: "",
                }}
                validationSchema={PasswordSchema}
                onSubmit={(values, { resetForm }) => {
                  handleChangePassword(values);
                  resetForm();
                }}
              >
                {({ errors, touched, values }) => (
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
                      <label htmlFor="oldPassword">Old Password</label>
                      <Field
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        className="border border-gray-600 p-1 w-full focus:outline-none"
                      />
                      {values.oldPassword.length > 0 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowOldPassword(!showOldPassword);
                          }}
                          className="absolute right-2 top-1/2 translate-y-1/2 inline-block cursor-pointer"
                        >
                          <FaEye
                            className={`${showOldPassword ? "" : "hidden"}`}
                          />
                          <FaEyeSlash
                            className={`${showOldPassword ? "hidden" : ""}`}
                          />
                        </span>
                      )}
                      <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                        {errors.oldPassword && touched.oldPassword
                          ? errors.oldPassword
                          : null}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-[2px] w-full relative">
                      <label htmlFor="newPassword">New Password</label>
                      <Field
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        className="border border-gray-600 p-1 w-full focus:outline-none"
                      />
                      {values.newPassword.length > 0 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowNewPassword(!showNewPassword);
                          }}
                          className="absolute right-2 top-1/2 translate-y-1/2 inline-block cursor-pointer"
                        >
                          <FaEye
                            className={`${showNewPassword ? "" : "hidden"}`}
                          />
                          <FaEyeSlash
                            className={`${showNewPassword ? "hidden" : ""}`}
                          />
                        </span>
                      )}
                      <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                        {errors.newPassword && touched.newPassword
                          ? errors.newPassword
                          : null}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-[2px] w-full relative">
                      <label htmlFor="rePassword">Confirm New Password</label>
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="rePassword"
                        id="rePassword"
                        className="border border-gray-600 p-1 w-full focus:outline-none"
                      />
                      {values.rePassword.length > 0 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                          className="absolute right-2 top-1/2 translate-y-1/2 inline-block cursor-pointer"
                        >
                          <FaEye
                            className={`${showConfirmPassword ? "" : "hidden"}`}
                          />
                          <FaEyeSlash
                            className={`${showConfirmPassword ? "hidden" : ""}`}
                          />
                        </span>
                      )}
                      <div className="h-2 text-sm text-red-600 absolute left-0 -bottom-[6px]">
                        {errors.rePassword && touched.rePassword
                          ? errors.rePassword
                          : null}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="border py-1 px-2 bg-secondColor text-white"
                    >
                      Update
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
