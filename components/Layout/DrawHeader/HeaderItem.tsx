import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
function HeaderItem() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    "/api/user/email/" + session?.user?.email,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex justify-between items-center h-full p-1">
      <img src={data.pagename.avatar} className="w-20 rounded" />
      <div className="names">
        <p>{data.pagename.pagename}</p>
        <p>{data.pagename.slogan}</p>
      </div>
    </div>
  );
}

export default HeaderItem;
