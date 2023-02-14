import fetcher from "@/lib/fetcher";
import useSWR from "swr";
function HeaderItem() {
  const { data, error, isLoading } = useSWR("/api/pagename/handler", fetcher, {
    refreshInterval: 10000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="flex justify-between items-center h-full p-1">
      <img src={data[0].avatar} className="w-20 rounded" />
      <div className="names">
        <p>{data[0].pagename}</p>
        <p>{data[0].slogan}</p>
      </div>
    </div>
  );
}

export default HeaderItem;
