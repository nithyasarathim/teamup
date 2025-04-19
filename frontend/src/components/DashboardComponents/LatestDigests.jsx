import React, { useEffect, useState } from "react";
import TestImg from "../../assets/logo.png";

const timeToMinutes = (timeStr) => {
  if (!timeStr) return Infinity;
  const lower = timeStr.toLowerCase();
  if (lower.includes("min")) return parseInt(lower);
  if (lower.includes("hour")) return parseInt(lower) * 60;
  if (lower.includes("day")) return parseInt(lower) * 1440;
  return Infinity;
};

const LatestDigests = () => {
  const [digests, setDigests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDigests = async () => {
      try {
        const response = await fetch('http://localhost:8000/post/get');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDigests(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching digests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDigests();
  }, []);

  const sortedDigests = [...digests].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (loading) {
    return (
      <div className="grid-col-2 col-span-2 mx-2 justify-center gap-3">
        <div className="announcement col-span-2 bg-white p-3 rounded-md shadow-md h-[40vh] md:h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid-col-2 col-span-2 mx-2 justify-center gap-3">
        <div className="announcement col-span-2 bg-white p-3 rounded-md shadow-md h-[40vh] md:h-[80vh] flex items-center justify-center">
          <p className="text-red-500">Error loading digests: {error}</p>
        </div>
      </div>
    );
  }

  if (digests.length === 0) {
    return (
      <div className="grid-col-2 col-span-2 mx-2 justify-center gap-3">
        <div className="announcement col-span-2 bg-white p-3 rounded-md shadow-md h-[40vh] md:h-[80vh] flex items-center justify-center">
          <p className="text-gray-500">No digests available</p>
        </div>
      </div>
    );
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="grid-col-2 col-span-2 mx-2 justify-center gap-3">
      <div className="announcement col-span-2 bg-white p-3 rounded-md shadow-md h-[40vh] md:h-[80vh]">
        <div className="flex justify-between p-1 items-center">
          <h2 className="latestAnnouncement border-b text-left text-lg text-sky-600 font-bold">
            Recent Digests
          </h2>
        </div>

        <div className="announcement-list overflow-y-auto h-[90%]">
          {sortedDigests.map((digest) => (
            <div
              key={digest._id}
              className="bg-white p-2 m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md"
            >
              <div className="img-container w-1/4">
                <img
                  src={digest.image ? `http://localhost:8000/${digest.image}` : TestImg}
                  alt="digest"
                  className="w-full h-auto max-h-[80px] object-cover justify-center align-center rounded-md"
                />
              </div>
              <div className="content-container w-3/4 p-1 ml-2">
                <h3 className="text-sm font-bold mb-1 min-h-[40px] line-clamp-2">
                  {digest.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1 line-clamp-2">
                  {digest.description}
                </p>
                <div className="flex justify-between gap-1 flex-wrap">
                  <p className="text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50">
                    {digest.category}
                  </p>
                  <p className="text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50">
                    {formatTimeAgo(digest.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestDigests;