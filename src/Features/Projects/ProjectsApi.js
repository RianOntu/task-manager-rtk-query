import baseApi from "../../Api/baseApi";

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
