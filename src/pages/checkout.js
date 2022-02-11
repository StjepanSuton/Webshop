import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const sripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession();

  const createCheckouSession = async () => {
    const stripe = await sripePromise;

    //Call the backedn to create checkout session...
    const checkouSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });
    //Redirect to stripe
    const result = await stripe.redirectToCheckout({
      sessionId: checkouSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/dyz"
            width={1520}
            height={250}
            objectFit="contain"
            alt=""
          />
          {total.totalQuantity > 0 && (
            <div className="relative lg:fixed lg:top-10 right-0  flex flex-col bg-white p-10 shadow-lg rounded-lg">
              <>
                <h2 className="whitespace-nowrap">
                  SubTotal {total.totalQuantity} items:{" "}
                  <span className="font-bold">
                    <Currency quantity={total.totalItemsPrice} />
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckouSession}
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-50 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign in to checkout" : "Procede to checkout"}
                </button>
              </>
            </div>
          )}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Shopping bakset is empty"
                : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                quantity={item.quantity}
                description={item.description}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
