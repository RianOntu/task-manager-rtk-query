import baseApi from "../../Api/baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => `/team`,
    }),
  }),
});

export const { useGetTeamQuery } = teamApi;
