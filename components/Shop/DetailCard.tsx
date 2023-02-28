import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

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
  const addtoCart = async (id: string) => {
    const send = toast.loading("store to the card");
    await fetch(`/api/shopitem/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ selected: true, quantity: card.times }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setCard({ times: 0, show: false });
    toast.success("card updated", { id: send });
  };
  return (
    <div className="absolute inset-3 rounded bg-white/80 flex flex-col justify-center items-center">
      <div className="count flex justify-center items-center">
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
      <button className="btn-form mx-auto" onClick={() => addtoCart(id)}>
        {card.times ? "add" : "reset"}
      </button>
    </div>
  );
}

export default DetailCard;
