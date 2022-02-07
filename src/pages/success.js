import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";

function Success() {
  const router = useRouter();
  return (
    <div className=" bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            {" "}
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">Your order has been confirmed</h1>
          </div>
          <p>Thank you for shoping with us</p>
        </div>
        <button
          onClick={() => router.push("/orders")}
          className="button mt-8 w-full"
        >
          {" "}
          Go to my orders
        </button>
      </main>
    </div>
  );
}

export default Success;
