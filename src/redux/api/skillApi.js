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
        allSkill: build.query({
            query: () => {
                return {
                    url: '/skill',
                    method: 'GET',
                };
            },
            providesTags: ["allSkill"],
        }),
        getSingleSkill: build.query({
            query: (id) => {
                return {
                    url: `/skill/${id}`,
                    method: "GET",
                };
            },
        }),
        updateSkill: build.mutation({
            query: (data) => {
                return {
                    url: `/skill/updateskill/${data.id}`,
                    method: 'PATCH',
                    data: data.data,
                };
            },
            invalidatesTags: ["updateSkill"],
        }),
    }),
});

export const {
    useAddskillMutation,
    useAllSkillQuery,
    useUpdateSkillMutation,
    useGetSingleSkillQuery,

} = skillApi;