"use client";
import { refreshToken } from "@/app/api/refreshToken";
import Navigation from "@/app/components/navigation";
import {
  faChevronLeft,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

const fetchPosition = async (id) => {
  const cookies = parseCookies();

  const res = await fetch(
    `http://localhost:3000/api/recruitment/position/${id}`,
    {
      next: { revalidate: 60 },
      method: "GET",
      headers: {
        Authorization: cookies?.accessToken,
      },
    }
  );
  if (res?.status === 401) {
    const refresh = await refreshToken(cookies);
    if (refresh) {
      return fetchPosition(id);
    }
  }
  return res.json();
};

const Position = ({ params }) => {
  const [position, setPosition] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosition(params.id);
      setPosition(data);
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      <Navigation />
      <section className="container py-10">
        <button
          type="button"
          className="flex items-center text-slate-800 mb-4"
          onClick={() => router.push("/")}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
          Back
        </button>
        <h1 className="text-3xl mb-4">{position?.title}</h1>

        <div className="flex">
          <p className="px-3 py-1 rounded-3xl bg-slate-800 text-white mr-4">
            {position?.type}
          </p>
          <div className="px-3 py-1 rounded-3xl bg-slate-800 text-white mr-4 flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            <p>{position?.location}</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex">
          <div className="w-full lg:w-[65%] pr-8">
            <p dangerouslySetInnerHTML={{ __html: position?.description }}></p>
          </div>
          <div className="w-full lg:w-[35%]">
            <div className="rounded-xl bg-slate-200 text-slate-800 p-4 mb-6">
              <h3 className="font-bold text-xl mb-2">{position?.company}</h3>
              <img
                src={position?.company_logo}
                className="w-full object-cover mb-2"
                alt={position?.company}
              />
              <a href="position?.company_url" className="text-slate-800">
                {position?.company_url}
              </a>
            </div>
            <div className="bg-slate-800 text-white p-4 rounded-xl">
              <h3 className="font-bold text-xl mb-2">How to Apply</h3>
              <p
                dangerouslySetInnerHTML={{ __html: position?.how_to_apply }}
              ></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Position;
