import  { useState, useEffect } from "react";
import CountUp from "react-countup";

const Counter = () => {
  // State for recipe and user counts
  const [recipeCount, setRecipeCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Simulated data fetching (replace with actual fetching logic)
  useEffect(() => {
    // Simulated API call to fetch recipe count
    const fetchRecipeCount = () => {
      // Replace this with actual API call to fetch recipe count
      setTimeout(() => {
        setRecipeCount(253); // Example recipe count
      }, 1000);
    };

    // Simulated API call to fetch user count
    const fetchUserCount = () => {
      // Replace this with actual API call to fetch user count
      setTimeout(() => {
        setUserCount(126); // Example user count
      }, 1500);
    };

    fetchRecipeCount();
    fetchUserCount();
  }, []);

  return (
    <div className="">
      <section className=" py-10 sm:py-16 lg:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Join Our Community
            </h2>
            <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              Be part of a growing community of food lovers and home chefs.
              Share your recipes, discover new ones, and earn rewards.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 text-center sm:gap-x-8 md:grid-cols-3 lg:mt-24">
            <div>
              <h3 className="text-7xl font-bold">
                <span className="bg-gradient-to-r from-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
                  <CountUp
                    start={0}
                    end={6}
                    duration={2.5}
                    separator=","
                    className="text-7xl font-bold text-blue-600"
                  />
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-gray-900">
                Years in business
              </p>
              <p className="mt-0.5 text-base text-gray-500">
                Creating the successful path
              </p>
            </div>

            <div>
              <h3 className="text-7xl font-bold">
                <span className="bg-gradient-to-r from-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
                  <CountUp
                    start={0}
                    end={userCount}
                    duration={2.5}
                    separator=","
                    className="text-7xl font-bold text-green-600"
                  />
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-gray-900">Users</p>
              <p className="mt-0.5 text-base text-gray-500">
                Total happy users
              </p>
            </div>

            <div>
              <h3 className="text-7xl font-bold">
                <span className="bg-gradient-to-r from-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
                  <CountUp
                    start={0}
                    end={recipeCount}
                    duration={2.5}
                    separator=","
                    className="text-7xl font-bold text-blue-600"
                  />
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-gray-900">Recipes</p>
              <p className="mt-0.5 text-base text-gray-500">
                Total listed Recipes
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counter;
