import { cookies } from "next/headers";

const setTokenToCookie = (token) => {
  cookies().set("accessToken", token);
};

export default setTokenToCookie;