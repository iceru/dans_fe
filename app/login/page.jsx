"use client";

import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const submitLogin = async () => {
    console.log(username);
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
      if (res.status === 200) {
        const data = await res.json();
        setCookie(null, "accessToken", data?.accessToken);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center min-h-screen bg-slate-800 flex-col text-white items-center">
      <h1 className="text-3xl mb-6">
        <strong>GitHub</strong> Jobs
      </h1>
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
      <button
        type="button"
        onClick={submitLogin}
        className="px-4 py-2 rounded bg-white text-slate-800 font-bold hover:bg-slate-600 hover:text-white transition"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
