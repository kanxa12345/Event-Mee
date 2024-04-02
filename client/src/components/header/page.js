"use client";
import { logoutUser } from "@/redux/reducerSlice/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin, userDetail } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <header className="py-2 bg-white sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.png"
              priority={true}
              width={200}
              height={200}
              alt="logo"
              className="w-[150px]"
            />
          </Link>
          <div className="flex items-center gap-14">
            <nav>
              <ul className="flex items-center gap-8 font-medium">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="#">Movies</Link>
                </li>
                <li>
                  <Link href="#">Events</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
              </ul>
            </nav>
            <div>
              {isLogin ? (
                <div
                  onClick={() => setOpenModal(!openModal)}
                  className="relative flex items-center gap-1 cursor-pointer font-medium text-lg"
                >
                  <FaRegUserCircle className="text-3xl" />
                  <p className="capitalize">
                    {userDetail?.fullName?.split(" ")[0]}
                  </p>
                  {openModal && (
                    <div className="absolute top-10 left-0 bg-gray-50 w-56 p-4 flex flex-col items-start gap-3 shadow-lg">
                      <div className="flex flex-col items-start">
                        <p className="capitalize">{userDetail.fullName}</p>
                        <small className="text-sm font-medium text-gray-600">
                          {userDetail.email}
                        </small>
                      </div>
                      <Link href="#" className="inline-block w-full">
                        Your Profile
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                        className="w-full text-start"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="border border-red-500 py-1 px-2 text-white text-sm bg-red-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
