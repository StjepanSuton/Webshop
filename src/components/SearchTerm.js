import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
function SearchTerm({ product }) {
  const dispatch = useDispatch();
  const addSelectedItem = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      description: product.description,
      category: product.category,
      image: product.image,
    };
    dispatch(addToBasket(item));
  };

  return (
    <div className="bg-white border-b-2 flex-row items-center md:grid p-5 md:grid-cols-4 ">
      <div className="w-full flex justify-center">
        <Image
          src={product.image}
          height={100}
          width={100}
          objectFit="contain"
        />
      </div>
      <div className="flex-row flex-grow mx-5">
        <p className="text-center col-span-2 text-sm font-bold mb-2 md:col-span-5 ">
          {product.title}
        </p>
      </div>
      <div className="font-bold justify-self-center text-sm mb-2">
        <Currency quantity={product.price} />
      </div>
      <button
        onClick={addSelectedItem}
        className="button w-16 justify-self-center"
      >
        +
      </button>
    </div>
  );
}

export default SearchTerm;
