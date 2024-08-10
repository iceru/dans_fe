import { useEffect, useState } from "react";

const Navigation = ({}) => {
  const [username, setUsername] = useState();
  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name);
  }, []);
  return (
    <div className="bg-slate-800 text-white">
      <div className="container py-4 flex justify-between">
        <h1 className="text-2xl">
          <strong>GitHub</strong> Jobs
        </h1>
        {username && <div className="flex items-center">Hi, {username}</div>}
      </div>
    </div>
  );
};

export default Navigation;
