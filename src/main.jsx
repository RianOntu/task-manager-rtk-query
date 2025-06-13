import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNewTask from "./AddNewTask/AddNewTask.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/Store.js";
import EditTask from "./EditTask/EditTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-new-task",
    element: <AddNewTask />,
  },
  {
    path: "/edit/:id",
    element: <EditTask />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
