import Summary from "@/components/Shop/Summary";
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
    fetcher,
    { refreshInterval: 10000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const filtered = data.data.shopitem.filter(
    (item: any) => item.selected && item.quantity !== 0
  );

  return (
    <div style={{ ...itemdata }} className="h-full">
      <Summary data={filtered} />
    </div>
  );
}

export default UserInfoItem;
