import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container">
        <div></div>
        <div className="pt-3 border-t border-gray-400">
          <p className="text-center">
            Copyright &copy; {date} Event Mee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
