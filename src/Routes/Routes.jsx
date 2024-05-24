import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import AddRecipe from "../pages/Add-Recipe/Add-Recipe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
