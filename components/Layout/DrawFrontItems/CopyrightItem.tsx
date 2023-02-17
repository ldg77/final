import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { AiOutlineCopyrightCircle } from "react-icons/ai";
function CopyrightItem() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/email/${session?.user?.email}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex w-full justify-between items-center h-full p-1 ">
      <a href={`mailto:${data.email}`} className="hover:animate-pulse">
        <img src={data?.image} className="w-10 rounded-full " />
      </a>
      <p className="flex items-center gap-2 relative">
        Copyright {new Date().getFullYear()} <AiOutlineCopyrightCircle />
        <p className="absolute text-xs -bottom-full opacity-50">{data.name}</p>
      </p>
    </div>
  );
}

export default CopyrightItem;