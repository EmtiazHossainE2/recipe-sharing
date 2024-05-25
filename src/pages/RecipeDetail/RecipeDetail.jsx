import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const formattedName = recipeName.replace(/-/g, " ");
        const response = await axios.get(
          `${BASE_URL}/recipes/${formattedName}`,
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeName]);

  if (!recipe) {
    return <h4 className="mt-6 text-center">Loading...</h4>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pt-20 lg:py-20">
      <h2 className="mb-6 text-center text-3xl font-bold">
        {recipe.recipeName}
      </h2>
      <img
        src={recipe.recipeImage}
        alt={recipe.recipeName}
        className="mx-auto mb-6 h-80 w-80 object-cover"
      />
      <p className="mb-4">{recipe.recipeDetails}</p>
      <p className="mb-4">Country: {recipe.country}</p>
      <p className="mb-4">Category: {recipe.category}</p>
      <p className="mb-4">Creator Email: {recipe.creatorEmail}</p>
      <p className="mb-4">
        <a
          href={`https://www.youtube.com/watch?v=${recipe.youtubeVideoCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Watch on YouTube
        </a>
      </p>
    </div>
  );
};

export default RecipeDetail;
