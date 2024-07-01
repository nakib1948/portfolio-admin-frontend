import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allTagList } from "../tagTypes";
import { axiosBaseQuery } from "@/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: () => ({}),
  tagTypes:allTagList
});