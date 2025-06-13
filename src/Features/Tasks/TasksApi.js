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
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        // Since we're sending the full objects, we don't need to look them up
        const optimisticTask = {
          ...args,
          id: Date.now().toString(),
          status: "pending",
        };

        // Optimistic update
        dispatch(
          baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push(optimisticTask);
          })
        );

        try {
          const { data: savedTask } = await queryFulfilled;
          dispatch(
            baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id === optimisticTask.id);
              if (index !== -1) {
                draft[index] = savedTask;
              }
            })
          );
        } catch (error) {
          console.log("error", error);

          dispatch(
            baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
              return draft.filter((t) => t.id !== optimisticTask.id);
            })
          );
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
        // Optimistic update
        const patchResult = dispatch(
          baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((t) => t.id == id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...data };
            }
          })
        );

        try {
          const { data: savedTask } = await queryFulfilled;
          dispatch(
            baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id == id);
              if (index !== -1) {
                draft[index] = savedTask;
              }
            })
          );
        } catch (error) {
          console.log("error", error);
          patchResult.undo(); // Roll back the optimistic update
        }
      },
    }),
 deleteTask: builder.mutation({
  query: (taskID) => ({
    url: `/tasks/${taskID}`,
    method: "DELETE",
  }),
  async onQueryStarted(taskID, { dispatch, queryFulfilled }) {
    // Optimistically remove the task from the cache
    const patchResult = dispatch(
      baseApi.util.updateQueryData("getTasks", undefined, (draft) => {
        return draft.filter((task) => task.id !== taskID);
      })
    );

    try {
      await queryFulfilled; // wait for actual delete
    } catch (error) {
      console.log("Delete failed:", error);
      patchResult.undo(); // rollback the optimistic update
    }
  },
}),

  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation,useDeleteTaskMutation } =
  tasksApi;
