"use client";
import { logoutUser } from "@/redux/reducerSlice/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineShoppingCart, MdOutlineSlideshow } from "react-icons/md";
import {
  IoSettingsOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { useSession } from "next-auth/react";

const Header = () => {
  const { session } = useSession();
  console.log(session);
  const dispatch = useDispatch();
  const router = useRouter();
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
                  onClick={() => setOpenModal(true)}
                  className="relative flex items-center gap-1 cursor-pointer font-medium text-lg"
                >
                  <FaRegUserCircle className="text-3xl" />
                  <p className="capitalize">
                    {userDetail?.fullName?.split(" ")[0]}
                  </p>
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
      <div
        className={`${
          openModal ? "right-0" : "-right-80"
        } fixed h-screen top-0 bg-gray-50 w-80 z-[60] py-10 flex flex-col justify-between items-start gap-3 shadow-lg transition-all duration-300 ease-linear`}
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-start px-4">
            <p className="capitalize text-xl font-medium">
              {userDetail.fullName}
            </p>
            <small className="text-sm font-medium text-gray-600">
              {userDetail.email}
            </small>
          </div>
          <div className="flex flex-col w-full">
            <Link
              onClick={() => setOpenModal(false)}
              href="#"
              className="flex items-center gap-3 w-full px-4 border-b border-gray-400 py-3 hover:bg-gray-200"
            >
              <IoIosNotificationsOutline className="text-xl" />
              Notifications
            </Link>
            <Link
              onClick={() => setOpenModal(false)}
              href="/profile"
              className="flex items-center gap-3 w-full px-4 border-b border-gray-400 py-3 hover:bg-gray-200"
            >
              <FaRegUser className="text-xl" />
              Your Profile
            </Link>
            <Link
              onClick={() => setOpenModal(false)}
              href="/showList"
              className="flex items-center gap-3 w-full px-4 border-b border-gray-400 py-3 hover:bg-gray-200"
            >
              <MdOutlineSlideshow className="text-xl" />
              Your Show
            </Link>
            <Link
              onClick={() => setOpenModal(false)}
              href="#"
              className="flex items-center gap-3 w-full px-4 border-b border-gray-400 py-3 hover:bg-gray-200"
            >
              <MdOutlineShoppingCart className="text-xl" />
              Your Orders
            </Link>
            <Link
              onClick={() => setOpenModal(false)}
              href="#"
              className="flex items-center gap-3 w-full px-4 border-b border-gray-400 py-3 hover:bg-gray-200"
            >
              <IoChatbubbleEllipsesOutline className="text-xl" />
              Help & Support
            </Link>
            <Link
              onClick={() => setOpenModal(false)}
              href="#"
              className="flex items-center gap-3 w-full px-4 border-b border-gray-400 py-3 hover:bg-gray-200"
            >
              <IoSettingsOutline className="text-xl" />
              Account Settings
            </Link>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(logoutUser());
            router.push("/");
            setOpenModal(false);
          }}
          className="w-11/12 text-center py-2 bg-red-700 text-white mx-auto"
        >
          Log out
        </button>
      </div>
      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed w-full h-full bg-gray-950 z-50 inset-0 opacity-50"
        ></div>
      )}
    </>
  );
};

export default Header;
