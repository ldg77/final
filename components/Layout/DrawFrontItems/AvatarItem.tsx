import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

type Prop = {
  itemdata: any;
};

function AvatarItem({ itemdata }: Prop) {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/pagename`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div
      className="flex justify-between items-center h-full"
      style={{ ...itemdata }}
    >
      <img src={data.data.pagename.avatar} className="w-20 rounded" />
    </div>
  );
}

export default AvatarItem;
