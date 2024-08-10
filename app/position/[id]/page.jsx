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
  debugger;
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

  console.log(position);

  if (!position) {
    return <div>Loading...</div>;
  }

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
            <div className="rounded-xl bg-slate-200 text-slate-800 p-4">
              <Image
                src={position?.company_image}
                alt={position?.company_title}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Position;
