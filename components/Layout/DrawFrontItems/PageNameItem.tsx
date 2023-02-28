import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
type Prop = {
  itemdata: any;
};
function PageNameItem({ itemdata }: Prop) {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/pagename`,
    fetcher,
    { refreshInterval: 10000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div
      className="h-full w-full flex justify-center items-center"
      style={{ ...itemdata }}
    >
      <p className="rounded">{data?.data?.pagename?.pagename}</p>
    </div>
  );
}

export default PageNameItem;
