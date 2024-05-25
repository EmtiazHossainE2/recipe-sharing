import { Link,  useParams } from "react-router-dom";
import {  COUNTRIES, PACKAGES } from "../../config";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useUser from "../../hooks/useUser";

const Checkout = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const { currentUser } = useUser(user?.email);

  const plan = useMemo(() => PACKAGES.find((plan) => plan.id === id), [id]);

  // const token = localStorage.getItem("access-token");

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      console.log("first");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="px-5 py-20">
          <form onSubmit={(e) => handlePurchase(e)}>
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="lg:basis-8/12">
                <div className="bg-white p-4 font-[sans-serif]">
                  <div className="mx-auto max-w-4xl">
                    <div className="text-center">
                      <h2 className="inline-block border-b-4 border-[#333] pb-1 text-3xl font-extrabold text-[#333]">
                        Checkout
                      </h2>
                    </div>
                    <div className="mt-12">
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-3">
                          <div className="grid gap-5 sm:grid-cols-2">
                            <input
                              type="text"
                              placeholder="First name"
                              required
                              className="w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-[#333] outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Last name"
                              className="w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-[#333] outline-none focus:border-blue-500"
                            />
                          </div>
                          <input
                            type="email"
                            value={currentUser?.email}
                            disabled
                            placeholder="Email address"
                            className="mt-4 w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-gray-400 outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-3">
                          <div className="grid gap-5 sm:grid-cols-2">
                            <input
                              type="text"
                              placeholder="Street address"
                              required
                              className="w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-[#333] outline-none focus:border-blue-500"
                            />

                            <select
                              className="w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-[#333] outline-none focus:border-blue-500"
                              name="country"
                              defaultValue="United States"
                            >
                              {COUNTRIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              placeholder="State"
                              className="w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-[#333] outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              required
                              placeholder="Zip Code"
                              className="w-full rounded-md border-2 bg-white px-4 py-3.5 text-sm text-[#333] outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                          {/* <CardElement /> */}
                        </div>
                      </div>
                      <div className="mt-10">
                        <div className="flex flex-wrap items-center gap-2">
                          <input type="checkbox" />
                          By clicking <span className="font-bold">
                            pay now
                          </span>{" "}
                          you agree with our{" "}
                          <Link
                            className="text-indigo-500 hover:underline"
                            to="/"
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            className="text-indigo-500 hover:underline"
                            to="/"
                          >
                            Refund Policy
                          </Link>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-5 flex w-full items-center justify-center gap-3 rounded-md bg-[#0b4df5] px-10 py-3 text-center text-white"
                      >
                        Pay Now
                        <span className="">${plan.price}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:basis-4/12">
                <div>
                  <h2 className="text-xl font-bold">Your Order</h2>
                  <div className="mt-3 rounded-md border p-5 shadow-xl">
                    <p className="text-lg font-bold">{plan.title}</p>

                    <p className="mt-5 flex items-center justify-between">
                      <span className="font-semibold">Price</span>
                      <span className="font-bold">${plan.price}</span>
                    </p>
                    <p className="py-2 text-xl">
                      You will get {plan.coin} coins.
                    </p>
                    <hr className="my-5" />
                    <p className="flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">${plan.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
