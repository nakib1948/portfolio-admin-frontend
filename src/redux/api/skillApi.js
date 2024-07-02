import { baseApi } from "./baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addskill: build.mutation({
      query: (data) => ({
        url: "/skill/addskill",
        method: "POST",
        data,
      }),
      invalidatesTags: ["addskill"],
    }),
  }),
});

export const {
  useAddskillMutation
} = skillApi;