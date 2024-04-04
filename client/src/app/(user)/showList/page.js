import Link from "next/link";
import React from "react";

const ShowList = () => {
  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="container flex flex-col items-center gap-2">
          <h2 className="text-4xl font-semibold">No shows available</h2>
          <Link
            href="/show"
            className="inline-block py-1 px-2 bg-red-700 text-white"
          >
            List Your Show
          </Link>
        </div>
      </section>
    </>
  );
};

export default ShowList;
