import baseApi from "../../Api/baseApi";

const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/tasks`,
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch, getState }) {
        try {
          const { data: newTask } = await queryFulfilled;

          // Access existing tasks from cache
          const existingTasks =
            baseApi.endpoints.getTasks.select()(getState())?.data ?? [];

          const teamMember =
            typeof newTask.teamMember === "object" &&
            newTask.teamMember !== null
              ? newTask.teamMember
              : existingTasks.find(
                  (task) => task.teamMember?.name === newTask.teamMember
                )?.teamMember;

          const project =
            typeof newTask.projectName === "object" &&
            newTask.projectName !== null
              ? newTask.projectName
              : existingTasks.find(
                  (task) => task.project?.projectName === newTask.projectName
                )?.project;

          const finalTask = {
            ...newTask,
            teamMember,
            project,
          };

          dispatch(
            baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(finalTask);
            })
          );
        } catch (err) {
          console.error("Error in onQueryStarted", err);
        }
      },
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = tasksApi;
