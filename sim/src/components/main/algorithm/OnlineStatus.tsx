import React, { useEffect, useState } from "react";
import { Button } from "../../default";
import { HiOutlineStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

export const ServerStatus = () => {
  const [isServerOnline, setIsServerOnline] = useState(false);
  const fetch = useFetch();

  const checkServerOnlineStatus = async () => {
    try {
      const isServerOnline = await fetch.get("/");

      if (isServerOnline) {
        setIsServerOnline(true);
        toast.success("Server online!");
      }
    } catch (e) {
      setIsServerOnline(false);
      toast.error("Server offline!");
    }
  };

  useEffect(() => {
    checkServerOnlineStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-900 text-white font-bold text-lg rounded-md p-4 shadow-lg w-full">
      <span>Server Status</span>
      <span className={`${isServerOnline ? "text-green-400" : "text-red-400"} mt-1`}>
        {isServerOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};