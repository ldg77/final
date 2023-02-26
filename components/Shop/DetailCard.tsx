import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";

type Prop = {
  setCard: Dispatch<
    SetStateAction<{
      show: boolean;
      times: number;
    }>
  >;
  card: {
    show: boolean;
    times: number;
  };
  id: string;
};

function DetailCard({ setCard, card, id }: Prop) {
  // check if patch
  const addtoCart = async (id: string) => {
    await fetch(`/api/shopitem/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ selected: true, quantity: card.times }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  return (
    <div className="absolute inset-3 rounded bg-white/80 flex flex-col justify-center items-center [transform:rotateY(180)] [backface-visibility:hidden]">
      <div className="count">
        <button
          className="text-green-900 hover:scale-95 transition"
          onClick={() => {
            setCard({
              ...card,
              times: ++card.times,
            });
          }}
        >
          <PlusCircleIcon className="w-12" />
        </button>
        <button
          className="text-red-900 hover:scale-95 transition"
          onClick={() => {
            setCard({
              ...card,
              times: card.times > 0 ? --card.times : card.times,
            });
          }}
        >
          <MinusCircleIcon className="w-12" />
        </button>
      </div>
      <button className="btn-form" onClick={() => addtoCart(id)}>
        add
      </button>
    </div>
  );
}

export default DetailCard;
