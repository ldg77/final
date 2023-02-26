import { useState } from "react";
import DetailCard from "./DetailCard";
type Prop = {
  item: {
    _id: string;
    avatar: string;
    price: string;
    productName: string;
  };
};
function Card({ item }: Prop) {
  const [card, setCard] = useState({ show: false, times: 0 });

  return (
    <div className="group">
      <div
        className={`w-max h-full relative shadow-xl shadow-black/50 rounded-xl`}
      >
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          <img
            className="p-2 w-24 aspect-auto rounded-t-lg"
            src={item.avatar}
            alt="product image"
          />
          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {item.productName}
            </h5>

            <div className="flex gap-3 items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {item.price}€
              </span>

              <button
                onClick={() => {
                  setCard({ ...card, show: !card.show });
                }}
                className="flex items-center justify-center text-white bg-blue-700 rounded-full w-8 h-8 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 transition-transform hover:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
          {card.times}
        </div>
        {card.show && (
          <DetailCard setCard={setCard} card={card} id={item._id} />
        )}
      </div>
    </div>
  );
}

export default Card;
