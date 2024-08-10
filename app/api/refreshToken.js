const { setCookie } = require("nookies");

const refreshToken = async (cookies) => {
  debugger;
  const res = await fetch("http://localhost:3000/api/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Important header to specify JSON payload
    },
    body: JSON.stringify({
      refreshToken: cookies.refreshToken,
    }),
  });
  if (!res.ok) {
    router.push("/login");
  }
  const data = await res.json();
  setCookie(null, "accessToken", data?.accessToken);
  setCookie(null, "refreshToken", data?.refreshToken);

  return true;
};

module.exports = {
  refreshToken,
};
