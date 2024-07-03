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
    getAllProject: build.query({
      query: () => {
        return {
          url: '/project',
          method: 'GET',
        };
      },
      providesTags: ["getAllProject"],
    }),
    getSingleProject: build.query({
      query: (id) => {
        return {
          url: `/project/${id}`,
          method: "GET",
        };
      },
    }),
    updateProject: build.mutation({
      query: (data) => {
         return {
            url:  `/project/updateproject/${data.id}`,
            method: 'PATCH',
            data:data.data,
         };
      },
      invalidatesTags: ["updateProject"],
   }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} = projectApi;