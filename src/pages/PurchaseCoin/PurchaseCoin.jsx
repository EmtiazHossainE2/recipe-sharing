import { Link } from "react-router-dom";


const PurchaseCoin = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 ">
      <section className="bg-white py-10 sm:py-16 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Purchase Coin
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-gray-600">
              Don&apos;t have enough coin , purchase now
            </p>
          </div>

          <div className="mx-auto mt-8 grid grid-cols-1 gap-6 text-center sm:mt-16 sm:grid-cols-3 md:max-w-5xl md:gap-8">
            <div className="relative overflow-hidden rounded-md border-2 border-gray-100 bg-transparent">
              <div className="absolute right-3 top-3 hidden">
                <svg
                  className="h-6 w-6 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="px-4 py-5 lg:p-8">
                <p className="text-lg font-medium text-gray-500">100 Coins</p>
                <p className="mt-4 text-6xl font-bold text-black">$1</p>
                <Link to="/purchase-coin/standard">
                  <button className="py-2 border rounded-xl bg-primary text-white mt-5 px-8 ">
                    Buy Now
                  </button>
                </Link>
                <ul className="mt-8 flex flex-col space-y-1">
                  <li className="text-base font-medium text-gray-900 lg:text-xl">
                    buying 100 coins
                  </li>
                  <li className="text-base font-medium text-gray-600 lg:text-xl">
                    by spending 1 dollar.
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-md border-2 border-gray-100 bg-transparent">
              <div className="absolute right-3 top-3 hidden">
                <svg
                  className="h-6 w-6 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="px-4 py-5 lg:p-8">
                <p className="text-lg font-medium text-gray-500">500 Coins</p>
                <p className="mt-4 text-6xl font-bold text-black">$5</p>
                <Link to="/purchase-coin/pro">
                  <button className="py-2 border rounded-xl bg-primary text-white mt-5 px-8 ">
                    Buy Now
                  </button>
                </Link>
                <ul className="mt-8 flex flex-col space-y-1">
                  <li className="text-base font-medium text-gray-900 lg:text-xl">
                    buying 500 coins
                  </li>
                  <li className="text-base font-medium text-gray-600 lg:text-xl">
                    by spending 5 dollar.
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-md border-2 border-gray-900 bg-white shadow">
              <div className="absolute right-3 top-3">
                <svg
                  className="h-6 w-6 text-orange-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="px-4 py-5 lg:p-8">
                <p className="text-lg font-medium text-gray-500">1000 Coins</p>
                <p className="mt-4 text-6xl font-bold text-black">$10</p>
                <Link to="/purchase-coin/exclusive">
                  <button className="py-2 border rounded-xl bg-primary text-white mt-5 px-8 ">
                    Buy Now
                  </button>
                </Link>
                <ul className="mt-8 flex flex-col space-y-1">
                  <li className="text-base font-medium text-gray-900 lg:text-xl">
                    buying 1000 coins
                  </li>
                  <li className="text-base font-medium text-gray-600 lg:text-xl">
                    by spending 10 dollar.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PurchaseCoin