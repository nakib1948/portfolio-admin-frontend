import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addblog: build.mutation({
            query: (data) => ({
                url: "/blog/addblog",
                method: "POST",
                data,
            }),
            invalidatesTags: ["getAllblog"],
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
        deleteBlog: build.mutation({
            query: (id) => ({
                url: `/blog/deleteblog/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useAddblogMutation,
    useGetAllblogQuery,
    useDeleteBlogMutation
} = blogApi;