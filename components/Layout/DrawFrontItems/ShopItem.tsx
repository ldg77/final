import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
type Prop = {
  itemdata: any;
};
function ShopItem({ itemdata }: Prop) {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/shopitem`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <div style={{ ...itemdata }} className="h-full flex gap-2">
      {data?.data.shopitem.map((item: any) => (
        <div className="flex-1">
          <img src={item.avatar} alt="avatar" className="w-24 aspect-square" />
          <p>{item.productName}</p>
          <p>price: {item.price}€</p>
          <button className="bg-green-900 px-3 rounded text-white">add</button>
        </div>
      ))}
    </div>
  );
}

export default ShopItem;
