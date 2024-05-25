
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { BASE_URL, COUNTRIES } from '../../config';
import toast from 'react-hot-toast';
import useUser from '../../hooks/useUser';

const AddRecipe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);
  // console.log(user , 'user')
  const { currentUser } = useUser(user?.email);

  const onSubmit = async (data) => {
    try {
      // Example: Upload image to imgbb
      const formData = new FormData();
      formData.append("image", data.recipeImage[0]);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=422e61968c3878a80022fbc5968b3094",
        formData,
      );
      const imageUrl = response.data.data.url;

      const recipeData = {
        recipeName: data.recipeName,
        recipeImage: imageUrl,
        recipeDetails: data.recipeDetails,
        youtubeVideoCode: data.youtubeVideoCode,
        country: data.country,
        category: data.category,
        creatorEmail: user?.email,
        watchCount: 0,
        purchasedBy: [],
      };
      console.log(recipeData, "recipeData");

      await axios.post(`${BASE_URL}/recipe`, recipeData).then((res) => {
        console.log(res.data);
      });
      // Update user coin
      await axios.put(`${BASE_URL}/user/coin`, {
        email: currentUser?.email,
        coin: currentUser?.coin + 1,
      });

      reset();
      toast.success("Recipe added successfully!!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Recipe added successfully!!");
    }
  };

  return (
    <div>
      <section className="bg-gray-100 py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center ">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Add New Recipe
            </h2>
          </div>

          <div className="mx-auto mt-1 max-w-5xl sm:mt-1">
            <div className="mt-6 overflow-hidden rounded-xl bg-white">
              <div className="px-6 py-12 sm:px-12 sm:pt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-14">
                  <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="recipeName"
                        className="text-base font-medium text-gray-900"
                      >
                        Recipe Name
                      </label>
                      <input
                        type="text"
                        id="recipeName"
                        {...register("recipeName", { required: true })}
                        placeholder="Enter recipe name"
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                      />
                      {errors.recipeName && (
                        <span className="text-red-500">
                          Recipe name is required
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="recipeImage"
                        className="text-base font-medium text-gray-900"
                      >
                        Recipe Image
                      </label>
                      <input
                        type="file"
                        id="recipeImage"
                        {...register("recipeImage", { required: true })}
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                      />
                      {errors.recipeImage && (
                        <span className="text-red-500">
                          Recipe image is required
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="recipeDetails"
                        className="text-base font-medium text-gray-900"
                      >
                        Recipe Details
                      </label>
                      <textarea
                        id="recipeDetails"
                        {...register("recipeDetails", { required: true })}
                        placeholder="Enter recipe details"
                        className="block w-full resize-y rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                        rows="4"
                      />
                      {errors.recipeDetails && (
                        <span className="text-red-500">
                          Recipe details are required
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="youtubeVideoCode"
                        className="text-base font-medium text-gray-900"
                      >
                        YouTube Video Code
                      </label>
                      <input
                        type="text"
                        id="youtubeVideoCode"
                        {...register("youtubeVideoCode", { required: true })}
                        placeholder="Enter YouTube video code"
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                      />
                      {errors.youtubeVideoCode && (
                        <span className="text-red-500">
                          YouTube video code is required
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="text-base font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        {...register("country", { required: true })}
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="Bangladesh">Bangladesh</option>
                        {COUNTRIES.map((c, index) => (
                          <option key={index} value={c}>{c}</option>
                        ))}
                      </select>

                      {errors.country && (
                        <span className="text-red-500">
                          Country is required
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="text-base font-medium text-gray-900"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        {...register("category", { required: true })}
                        className="block w-full rounded-md border border-gray-200 bg-white px-4 py-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="Main Dish">Main Dish</option>
                        <option value="pizza">Pizza</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Salad">Salad</option>
                        <option value="Soup">Soup</option>
                        <option value="Pie">Pie</option>
                        <option value="Sandwich">Sandwich</option>
                      </select>
                      {errors.category && (
                        <span className="text-red-500">
                          Category is required
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
                      >
                        Add Recipe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddRecipe;

