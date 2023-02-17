import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
function AvatarItem() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/pagename`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex justify-between items-center h-full p-1">
      <img src={data.data.pagename.avatar} className="w-20 rounded" />
    </div>
  );
}

export default AvatarItem;