"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const ShowList = () => {
  const [events, setEvents] = useState([]);
  const fetchEvents = async (values) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events`
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
            <div className="w-full">
              <table className="w-full border" border>
                <thead>
                  <tr className="border">
                    <th>S.N.</th>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Place</th>
                    <th>Price per event</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.map((item, id) => (
                    <tr key={id} className="border">
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
