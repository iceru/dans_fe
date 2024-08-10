"use client";

import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const submitLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Important header to specify JSON payload
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      router.push("/login");
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
      <p className="mb-6">Make an account now!</p>
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
        className="px-4 py-2 rounded mb-4 bg-white text-slate-800 font-bold hover:bg-slate-600 hover:text-white transition"
      >
        Register
      </button>
      <a href="/login" className="text-white">
        Already have an account?
      </a>
    </div>
  );
};

export default Login;
