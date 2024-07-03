import { baseApi } from "./baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addProject: build.mutation({
      query: (data) => ({
        url: "/project/addproject",
        method: "POST",
        data,
      }),
      invalidatesTags: ["getAllProject"],
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
          url: `/project/updateproject/${data.id}`,
          method: 'PATCH',
          data: data.data,
        };
      },
      invalidatesTags: ["updateProject"],
    }),
    deleteProject: build.mutation({
      query: (id) => ({
        url: `/project/deleteproject/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} = projectApi;