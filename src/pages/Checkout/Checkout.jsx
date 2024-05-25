import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, PACKAGES } from "../../config";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useUser from "../../hooks/useUser";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { currentUser } = useUser(user?.email);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const plan = useMemo(() => PACKAGES.find((plan) => plan.id === id), [id]);

  useEffect(() => {
    if (plan?.price) {
      axios
        .post(`${BASE_URL}/create-payment-intent`, { price: plan.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [plan?.price]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    // console.log('clicked')

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error: paymentMethodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.error("Payment method error:", paymentMethodError);
      toast.error("Payment error");
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: currentUser?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Payment confirmation error:", confirmError);
      toast.error("Payment confirmation error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await axios.put(`${BASE_URL}/user/coin`, {
        email: currentUser?.email,
        coin: currentUser?.coin + plan.coin,
      });

      navigate(`/recipes`);
      toast.success("Payment successful");
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-5 py-20">
        <form onSubmit={handlePurchase}>
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:basis-6/12">
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
                        <div className="grid gap-5">
                          <input
                            type="text"
                            placeholder="Name"
                            required
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
                      <div className="md:col-span-2">
                        <CardElement />
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
            <div className="lg:basis-6/12">
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
  );
};

export default Checkout;
