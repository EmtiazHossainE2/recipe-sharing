import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 ">
      <div className="bg-white">
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-base font-semibold uppercase tracking-wider text-blue-600">
                  Discover Delicious Recipes
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black sm:text-6xl lg:mt-8 xl:text-7xl">
                  Unite Through Recipes, One Dish at a Time
                </h1>
                <p className="mt-4 text-base text-black sm:text-xl lg:mt-8">
                  Join our vibrant community of food enthusiasts. Share your
                  favorite recipes, discover new flavors, and create culinary
                  masterpieces together.
                </p>

                <Link
                  to="/recipes"
                  className="mt-8 inline-flex items-center rounded-2xl bg-yellow-300 px-6 py-3 font-semibold text-black transition-all duration-200 hover:bg-yellow-400 focus:bg-yellow-400 lg:mt-16"
                  role="button"
                >
                  All Recipes
                  <svg
                    className="-mr-2 ml-8 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                {user ? (
                  <Link
                    to="/add-recipe"
                    className="bg-primary lg:ml-2 mt-8 inline-flex items-center rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-200 lg:mt-16"
                    role="button"
                  >
                    Add recipe
                    <svg
                      className="-mr-2 ml-8 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <>
                    <button
                      className="bg-primary ml-2 mt-8 inline-flex items-center rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-200 lg:mt-16"
                      role="button"
                      onClick={() =>
                        document.getElementById("login_modal").showModal()
                      }
                    >
                      Add recipe
                      <svg
                        className="-mr-2 ml-8 h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div>
                <img
                  className="w-full"
                  src="https://braise.qodeinteractive.com/wp-content/uploads/2021/09/h2-img1.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Banner;
