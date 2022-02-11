import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import SearchTerm from "./SearchTerm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const mostRecentItem = useSelector((state) => state.basket.mostRecentItem);
  const { data: session, status } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [products, setProducts] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [focused, setFocused] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(total.totalQuantity);
  const filterItems = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchProducst = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const responseData = await response.json();
      setProducts(responseData);
    };
    fetchProducst();
  }, []);

  useEffect(() => {
    const notify = () =>
      toast.success(`${mostRecentItem.title} added to your cart`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1500,
      });
    if (
      mostRecentItem.title === undefined ||
      numberOfItems >= total.totalQuantity
    ) {
      setNumberOfItems(total.totalQuantity);
      return;
    } else {
      notify();
    }
    setNumberOfItems(total.totalQuantity);
  }, [mostRecentItem, total]);

  return (
    <header>
      <div className="relative flex items-center bg-amazon_blue p-1 flex-grow py-2 z-50">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://i.imgur.com/atySqDC.png"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        <div
          onMouseEnter={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          className="hidden sm:flex relative items-center h-10 rounded-md flex-grow cursor-pointer bg-green-400 hover:bg-green-600"
        >
          <input
            placeholder="Start your Search"
            onChange={filterItems}
            className="p-2 h-full flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
          {focused && (
            <div className="absolute top-10 scrollbar-hide rounded-lg h-80 overflow-y-scroll">
              {products
                ?.filter((product) => {
                  if (searchTerm?.length < 3) {
                    return;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(searchTerm?.toLowerCase())
                  ) {
                    return product;
                  }
                })
                .map((product, i) => (
                  <SearchTerm key={product + i} product={product} />
                ))}
            </div>
          )}
        </div>
        {/* */}
        <div className="text-white flex items-center text-xs space-x-6 md:mx-6 mr-6">
          <div onClick={!session ? signIn : signOut} className="link">
            <p className="flex-grow w-24 font-extrabold">
              {session ? ` ${session.user.name}` : "Sign in"}
            </p>
          </div>
          <div onClick={() => router.push("/orders")} className="link">
            <p className="justify-self-center items-center font-extrabold md:text-sm">
              Orders
            </p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <ShoppingCartIcon className="h-8 md:h-10" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-green-200 text-center rounded-full text-black">
              {total.totalQuantity}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
}

export default Header;
