"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";

const ShowList = () => {
  const [events, setEvents] = useState([]);
  const { userDetail } = useSelector((state) => state.user);
  const [openAction, setOpenAction] = useState(null);

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

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/event/${userDetail._id}?eventId=${eventId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [handleDelete]);

  const handleAction = (num) => {
    if (openAction === null || openAction !== num) {
      setOpenAction(num);
    } else if (openAction === num) {
      setOpenAction(null);
    }
  };

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
                    <th>Action</th>
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
                      <td className="relative">
                        <HiDotsVertical
                          onClick={() => handleAction(id)}
                          className="cursor-pointer"
                        />
                        {openAction === id && (
                          <div className="absolute flex flex-col items-start w-32 gap-2 p-3 bg-gray-50 shadow-md z-10 top-10 -left-16">
                            <button
                              onClick={() => {
                                // fetchProductDetail(item._id);
                                // setOpenEditForm(id);
                                setOpenAction(null);
                              }}
                              className="w-full text-start"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(item._id);
                                setOpenAction(null);
                              }}
                              className="w-full text-start"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
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
