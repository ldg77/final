import Card from "@/components/Shop/Card";
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
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div style={{ ...itemdata }} className="flex gap-3 flex-wrap">
      {data?.data?.shopitem.map((item: any) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
}

export default ShopItem;
