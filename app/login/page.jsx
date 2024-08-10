"use client";

import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  const submitLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Important header to specify JSON payload
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.status === 400) {
        const data = await res.json();
        setError(data);
      }
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("username", data?.username);
        setCookie(null, "accessToken", data?.accessToken);
        setCookie(null, "refreshToken", data?.refreshToken);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    destroyCookie(null, "accessToken");
    destroyCookie(null, "refreshToken");
    localStorage.removeItem("username");
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-slate-800 flex-col text-white items-center">
      <h1 className="text-3xl mb-2">
        <strong>GitHub</strong> Jobs
      </h1>
      <p className="mb-6">Login to your account</p>

      <div className="flex items-center mb-4 mr-4">
        <FontAwesomeIcon icon={faUser} className="mr-4" />
        <input
          type="text"
          placeholder="Username"
          className="rounded px-4 py-2 text-slate-800"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex items-center mr-4 mb-4">
        <FontAwesomeIcon icon={faKey} className="mr-4" />
        <input
          type="password"
          placeholder="Password"
          className="rounded px-4 py-2 text-slate-800"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <div className="flex justify-center text-white bg-red-700 text-center rounded-xl px-4 text-xs py-2 mb-4">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={submitLogin}
        className="px-4 py-2 mb-4 rounded bg-white text-slate-800 font-bold hover:bg-slate-600 hover:text-white transition"
      >
        Login
      </button>
      <a href="/register" className="text-white">
        Dont have an account?
      </a>
    </div>
  );
};

export default Login;
