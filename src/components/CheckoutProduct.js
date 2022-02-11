import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  quantity,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = { id, title, price, rating, description, category, image };
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    dispatch(
      removeFromBasket({
        id,
        title,
        price,
        rating,
        description,
        category,
        image,
      })
    );
  };
  return (
    <div className="flex-row items-center md:grid p-5 md:grid-cols-5 shadow-lg rounded-lg">
      <div className="w-full flex justify-center">
        <Image src={image} height={200} width={200} objectFit="contain" />
      </div>
      <div className="grid grid-cols-2 justify-items-center md:justify-items-start content-center md:grid-cols-none  md:col-span-3 mx-5">
        <p className="text-center col-span-2 text-sm font-bold mb-2 md:col-span-1 ">
          {title}
        </p>
        <div className="flex items-center mb-2">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-600" />
            ))}
        </div>
        <p className="hidden md:flex text-xs items-center rounded-md flex-grow">
          {description}
        </p>
        <div className="font-bold mb-2">
          <Currency quantity={price} />
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from basket
        </button>
        <div className="flex row-auto w-full justify-between">
          <p className="text-sm lg:text-m my-2 line-clamp-3">
            {" "}
            Items in basket:
          </p>
          <p className="text-sm lg:text-m font-bold my-2">{quantity}</p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
