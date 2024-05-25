import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import useViewRecipe from "../../hooks/useViewRecipe";

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { viewRecipe } = useViewRecipe();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const formattedName = recipeName.replace(/-/g, " ");
        const token = localStorage.getItem("access-token");
        const response = await axios.get(
          `${BASE_URL}/recipes/${formattedName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeName]);

  useEffect(() => {
    if (recipe) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/recipes`);
          const allRecipes = response.data;
          const relatedRecipes = allRecipes.filter(
            (item) =>
              item.category === recipe.category  &&
              item.recipeName !== recipe.recipeName,
          );
          setSuggestions(relatedRecipes);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    }
  }, [recipe]);

  const handleViewRecipe = (recipe) => {
    viewRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!recipe) {
    return <h4 className="mt-6 text-center">Loading...</h4>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pt-20 lg:py-20">
      <div className="flex flex-col gap-5 p-5 lg:flex-row">
        <div className="lg:basis-1/2">
          <img
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            className="mx-auto mb-6 h-full w-full rounded-lg object-cover lg:h-[380px] lg:w-[500px]"
          />
        </div>
        <div className="flex flex-col justify-center lg:basis-1/2">
          <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
            {recipe.recipeName}
          </h2>
          <p className="mb-4">Country: {recipe.country}</p>
          <p className="mb-4">Category: {recipe.category}</p>
          <p className="mb-4">Creator Email: {recipe.creatorEmail}</p>
          
        </div>
      </div>

      <div className="px-6 lg:px-16">
        <hr className="mb-5 h-[2px] bg-gray-500" />
        <strong>Description : </strong>
        <p className="mb-4">{recipe.recipeDetails}</p>

        <div className="mb-4">
          <strong>Watch on YouTube: </strong>
          <div className="relative h-0 pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${recipe.youtubeVideoCode}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={recipe.recipeName}
              className="absolute left-0 top-0 h-full w-full"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="mt-10 px-6 lg:px-16">
        <h3 className="mb-6 text-2xl font-bold">You may also like</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((suggestion) => (
            <div key={suggestion._id} className="rounded-lg border p-4">
              <img
                src={suggestion.recipeImage}
                alt={suggestion.recipeName}
                className="h-48 w-full rounded-t-lg object-cover"
              />
              <h4 className="mt-4 text-xl font-semibold">
                {suggestion.recipeName}
              </h4>
              <p className="mt-2">Country: {suggestion.country}</p>
              <p className="mt-2">Category: {suggestion.category}</p>
              <button
                className="mt-4 inline-block rounded-lg bg-blue-500 px-4 py-2 text-white"
                onClick={() => handleViewRecipe(suggestion)}
              >
                View Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
