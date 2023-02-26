import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";

type Prop = {
  itemdata: any;
};
function UserInfoItem({ itemdata }: Prop) {
  const [qty, setQty] = useState(1);
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/shopitem`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div style={{ ...itemdata }} className="h-full">
      {data?.data?.shopitem
        .filter((el: any) => el.selected)
        .map((el: any) => (
          <p key={el._id}>
            {el.productName} - price: {el.price} €, qty{" "}
            <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
            {qty}
            <button onClick={() => qty < el.quantity && setQty(qty + 1)}>
              +
            </button>
            total: {qty * el.price}
          </p>
        ))}
    </div>
  );
}

export default UserInfoItem;
