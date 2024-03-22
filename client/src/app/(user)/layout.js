import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
