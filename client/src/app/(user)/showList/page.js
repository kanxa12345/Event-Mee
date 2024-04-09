"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";

const ShowList = () => {
  const [events, setEvents] = useState([]);
  const { userDetail } = useSelector((state) => state.user);
  const fetchEvents = async (values) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events?userId=${userDetail._id}`
      );
      setEvents(data);
    } catch (err) {
      toast.error("Failed to fetch event list!");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <section className="py-24 bg-gray-50">
        <div className="container">
          {events.length > 0 ? (
            <div className="w-full space-y-6">
              <div className="w-full flex items-start gap-10 justify-between">
                <h2 className="text-4xl font-semibold">Event List</h2>
                <Link
                  href="/show"
                  className="inline-block py-1 px-2 bg-secondColor text-white"
                >
                  Add More Event
                </Link>
              </div>
              <table className="w-full border border-gray-500">
                <thead>
                  <tr className="border border-gray-500">
                    <th>S.N.</th>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Place</th>
                    <th>Price per ticket</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.map((item, id) => (
                    <tr key={id} className="border border-gray-500">
                      <td>{id + 1}</td>
                      <td>{item.showName}</td>
                      <td>{item.showType}</td>
                      <td>{item.place}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-4xl font-semibold">No shows available</h2>
              <Link
                href="/show"
                className="inline-block py-1 px-2 bg-red-700 text-white"
              >
                List Your Show
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShowList;
