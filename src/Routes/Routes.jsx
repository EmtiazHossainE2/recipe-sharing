import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import AddRecipe from "../pages/Add-Recipe/Add-Recipe";
import Recipes from "../pages/Recipes/Recipes";
import RecipeDetail from "../pages/RecipeDetail/RecipeDetail";
import PurchaseCoin from "../pages/PurchaseCoin/PurchaseCoin";
import Checkout from "../pages/Checkout/Checkout";

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
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipe/:recipeName",
        element: (
          <PrivateRoute>
            <RecipeDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase-coin",
        element: (
          <PrivateRoute>
            <PurchaseCoin />
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase-coin/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
