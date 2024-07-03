import { baseApi } from "./baseApi";

export const linkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAlllink: build.query({
            query: () => {
                return {
                    url: `/link`,
                    method: "GET",
                };
            },
        }),
        updatelink: build.mutation({
            query: (data) => {
                return {
                    url: `/link/updatelink/${data.id}`,
                    method: 'PATCH',
                    data: data.data,
                };
            },
            invalidatesTags: ["updatelink"],
        }),
    }),
});

export const {
 useGetAlllinkQuery,
 useUpdatelinkMutation
} = linkApi;