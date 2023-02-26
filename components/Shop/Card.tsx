import mongoose from "mongoose";
import React from "react";
type Prop = {
  item: {
    _id: string;
    avatar: string;
    price: string;
    productName: string;
  };
};
function Card({ item }: Prop) {
  const addtoCart = async (id: string) => {
    await fetch(`/api/shopitem/${id}`, {
      method: "POST",
      body: JSON.stringify({ selected: true }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-2 w-24 aspect-auto rounded-t-lg"
            src={item.avatar}
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.productName}
          </h5>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {item.price}€
            </span>
            <button
              onClick={() => addtoCart(item._id)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
