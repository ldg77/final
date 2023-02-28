"use client";

import { toast } from "react-hot-toast";

type Prop = {
  data: [{ productName: string; price: number; quantity: number; stripe: any }];
};
function Summary({ data }: Prop) {
  const sum = data.reduce((acc, el) => {
    acc += el.price * el.quantity;
    return acc;
  }, 0);

  const handlepayment = async () => {
    const body = data.map((el) => {
      return { quantity: el.quantity, price: el.stripe.default_price };
    });

    const res = await fetch(`/api/checkout_sessions`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data1 = await res.json();
    window.location.replace(data1);
  };
  const handleRemove = async (id: string) => {
    const remove = toast.loading("deleting item...");
    const res = await fetch(`/api/shopitem/${id}`, {
      method: "POST",
      body: JSON.stringify({ selected: false }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    toast.success("item deleted", { id: remove });
  };
  return (
    <div className="w-full max-w-sm p-4 shadow-xl shadow-black/50  bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        your amount
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-5xl font-extrabold tracking-tight">{sum}</span>
        <span className="text-3xl font-semibold"> € </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {data.map((el: any) => {
          return (
            <li key={el.stripe.id} className="flex justify-between space-x-3">
              <div className="flex">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Check icon</title>
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                  <span className="font-mono">{el.quantity}</span> x{" "}
                  {el.productName} : {el.price * el.quantity}€{" "}
                </span>
              </div>
              <button
                onClick={() => handleRemove(el._id)}
                className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400"
              >
                remove
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={handlepayment}
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Buy
      </button>
    </div>
  );
}

export default Summary;
