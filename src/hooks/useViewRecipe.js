import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import useUser from "./useUser";
import { BASE_URL } from "../config";

const useViewRecipe = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { currentUser } = useUser(user?.email);

  const viewRecipe = async (recipe) => {
    const formattedName = recipe?.recipeName.replace(/\s+/g, "-");

    if (!user?.email) {
      toast.error("Please login to see details");
      return;
    } else if (user?.email === recipe?.creatorEmail) {
      navigate(`/recipe/${formattedName}`);
    } else if (recipe?.purchasedBy.includes(user?.email)) {
      navigate(`/recipe/${formattedName}`);
    } else if (currentUser?.coin < 10) {
      toast.error("Not enough coin, please purchase more coin.");
      navigate("/purchase-coin");
    } else {
      const confirmPurchase = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to spend 10 coins to view this recipe?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (confirmPurchase.isConfirmed) {
        try {
          // Update user coin
          await axios.put(`${BASE_URL}/user/coin`, {
            email: currentUser?.email,
            coin: currentUser?.coin - 10,
          });

          // Update recipe purchasedBy and watchCount
          await axios.put(`${BASE_URL}/recipe/purchase`, {
            recipeName: formattedName,
            userEmail: user.email,
          });

          // Add 1 coin to the creator
          const creatorResponse = await axios.post(`${BASE_URL}/user`, {
            email: recipe.creatorEmail,
          });
          const creator = creatorResponse.data;
          await axios.put(`${BASE_URL}/user/coin`, {
            email: recipe?.creatorEmail,
            coin: creator.coin + 1,
          });

          navigate(`/recipe/${formattedName}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.location.reload();
        } catch (error) {
          console.error("Error processing purchase:", error);
          toast.error("An error occurred while processing the purchase.");
        }
        
      }
    }
  };

  return { viewRecipe };
};

export default useViewRecipe;
