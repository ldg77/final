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
    <div
      style={{ ...itemdata }}
      className="h-full flex flex-col sm:flex-row gap-2 flex-wrap content-center"
    >
      {data?.data.shopitem.map((item: any) => (
        <div className="flex flex-col mx-auto">
          <img src={item.avatar} alt="avatar" className="w-24 aspect-square" />
          <div className="">
            <p>{item.productName}</p>
            <p>price: {item.price}€</p>
            <button className="bg-green-900 px-3 rounded text-white">
              add
            </button>
            <button className="bg-red-900 px-3 rounded text-white">
              remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShopItem;
