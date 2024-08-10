"use client";

import Navigation from "./components/navigation";
import Filter from "./components/filter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import moment from "moment";
import { refreshToken } from "./api/refreshToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [positions, setPositions] = useState([]);
  const [paging, setPaging] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [fullTime, setFullTime] = useState(false);
  const router = useRouter();

  const fetchPositions = async (page) => {
    try {
      const cookies = parseCookies();
      const baseURL = "http://localhost:3000/api/recruitment/position";

      const params = {};
      if (description) {
        params.description = description;
      }
      if (location) {
        params.location = location;
      }
      if (fullTime) {
        params.full_time = fullTime;
      }
      if (page && page > 1) {
        params.page = page;
      }
      const url = `${baseURL}?${new URLSearchParams(params).toString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: cookies.accessToken,
        },
      });
      if (response?.status === 401) {
        const refresh = await refreshToken(cookies);
        if (refresh) {
          return fetchPositions(page);
        }
      }
      const data = await response.json();
      if (page > 1) {
        setPositions((prevPositions) => [...prevPositions, ...data?.data]);
      } else {
        setPositions(data?.data);
      }
      setPaging(data?.pagination);
    } catch (error) {
      console.log(error || "error");
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <main className="">
      <Navigation />
      <Filter
        setDescription={setDescription}
        setFullTime={setFullTime}
        setLocation={setLocation}
        fullTime={fullTime}
        fetchPositions={fetchPositions}
      />
      <section className="container py-10">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Job List</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {positions?.length > 0 &&
            positions?.map((position) => {
              return (
                <div
                  key={position?.id}
                  className="p-2 pb-4 rounded-3xl border border-gray-300"
                >
                  <div className="rounded-3xl bg-slate-200 text-slate-900 p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="border border-slate-800 font-bold px-3 py-1 rounded-3xl text-xs">
                        {position?.type}
                      </div>
                      <div className="text-sm">
                        {moment(new Date(position?.createdAt)).fromNow()}
                      </div>
                    </div>
                    <h3
                      className="text-lg mb-2 font-bold line-clamp-2"
                      title={position?.title}
                    >
                      {position?.title}
                    </h3>
                    <p>{position?.company}</p>
                  </div>
                  <div className="flex justify-between px-4">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      {position?.location}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => router.push(`/position/${position?.id}`)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-3xl text-sm"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {paging && paging?.currentPage < paging?.totalPages && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-3xl bg-slate-800 text-white"
              onClick={() => fetchPositions(parseInt(paging?.currentPage) + 1)}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
