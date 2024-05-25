import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, COUNTRIES } from "../../config";
import useViewRecipe from "../../hooks/useViewRecipe";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState(6);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const { viewRecipe } = useViewRecipe();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recipes`);
        setRecipes(response.data);
        setDisplayedRecipes(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [category, country, search, recipesToShow]);

  const filterRecipes = () => {
    let filteredRecipes = recipes;

    if (category) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe?.category === category,
      );
    }

    if (country) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe?.country === country,
      );
    }

    if (search) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.recipeName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setDisplayedRecipes(filteredRecipes.slice(0, recipesToShow));
  };

  const handleLoadMore = () => {
    setRecipesToShow((prev) => prev + 6);
  };

  const handleLoadEmail = () => {
    setShowAll(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 pt-20 lg:py-20">
      <h2 className="mb-6 text-center text-3xl font-bold">All Recipes</h2>
      <div className="mb-6 flex flex-col justify-between lg:flex-row">
        <div className="mb-4 flex flex-col items-center lg:mb-0 lg:flex-row lg:space-x-4">
          <select
            className="mb-2 cursor-pointer border p-2 lg:mb-0 lg:mr-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Main Dish">Main Dish</option>
            <option value="Pizza">Pizza</option>
            <option value="Pasta">Pasta</option>
            <option value="Salad">Salad</option>
            <option value="Soup">Soup</option>
            <option value="Pie">Pie</option>
            <option value="Sandwich">Sandwich</option>
          </select>

          <select
            className="cursor-pointer border p-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {COUNTRIES.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="rounded border p-2"
            placeholder="Search by Recipe Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        {displayedRecipes.length > 0 ? (
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Recipe Image</th>
                <th>Purchased By</th>
                <th>Creator Email</th>
                <th>Country</th>
                <th>Total Watch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedRecipes.map((recipe) => (
                <tr key={recipe?._id}>
                  <td>{recipe?.recipeName}</td>
                  <td>
                    <img
                      src={recipe?.recipeImage}
                      alt={recipe?.recipeName}
                      className="h-20 w-20 object-cover"
                    />
                  </td>
                  <td>
                    {recipe.purchasedBy.length > 0 ? (
                      <div>
                        {showAll || recipe.purchasedBy.length <= 2 ? (
                          <ul>
                            {recipe.purchasedBy.map((userEmail, index) => (
                              <li key={index}>{userEmail}</li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <ul>
                              {recipe.purchasedBy
                                .slice(0, 2)
                                .map((userEmail, index) => (
                                  <li key={index}>{userEmail}</li>
                                ))}
                            </ul>
                            <button
                              onClick={handleLoadEmail}
                              className="btn btn-xs mt-2"
                            >
                              Load More
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      "No purchases yet"
                    )}
                  </td>

                  <td>{recipe?.creatorEmail}</td>
                  <td>{recipe?.country}</td>
                  <td>{recipe?.watchCount}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => viewRecipe(recipe)}
                    >
                      View The Recipe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="mt-6 text-center font-medium">No data found</h4>
        )}
      </div>{" "}
      {displayedRecipes.length > 0 &&
        displayedRecipes.length < recipes.length && (
          <div className="mt-6 text-center">
            <button className="btn btn-primary btn-sm" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
    </div>
  );
};

export default Recipes;

     
