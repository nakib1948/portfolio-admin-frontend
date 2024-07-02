import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProject: build.mutation({
      query: (data) => ({
        url: "/project/addproject",
        method: "POST",
        data,
      }),
      invalidatesTags: ["addproject"],
    }),
  }),
});

export const {
  useAddProjectMutation
} = projectApi;