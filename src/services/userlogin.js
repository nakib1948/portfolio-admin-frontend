"use server";
import setTokenToCookie from "../utils/setTokenToCookie";

const userLogin = async (data) => {
  const res = await fetch(`http://localhost:5000/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const userInfo = await res.json();
  if (userInfo?.data?.token) {
    setTokenToCookie(userInfo?.data?.token.accessToken);
  }
  return userInfo;
};

export default userLogin;