"use server";

import { cookies } from "next/headers";

export const deleteCookies = (token) => {
    cookies().delete(token);
};