import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="py-2 bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
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
                <Link href="#">Home</Link>
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
            <Link
              href="/register"
              className="border border-red-500 py-1 px-2 text-white text-sm bg-red-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
