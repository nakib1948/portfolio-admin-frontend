import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addblog: build.mutation({
      query: (data) => ({
        url: "/blog/addblog",
        method: "POST",
        data,
      }),
      invalidatesTags: ["addblog"],
    }),
    getAllblog: build.query({
        query: () => {
          return {
            url: '/blog',
            method: 'GET',
          };
        },
        providesTags: ["getAllblog"],
      }),
  }),
});

export const {
  useAddblogMutation,
  useGetAllblogQuery,
} = blogApi;