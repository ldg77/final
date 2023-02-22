"use client";
import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

function Colors({ children }: any) {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/maincolor`,
    fetcher,
    { refreshInterval: 1000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div
      style={{
        backgroundColor: data?.data?.maincolor?.backgroundColor,
        color: data?.data?.maincolor?.textColor,
      }}
      className="h-full flex-1 p-5"
    >
      {children}
    </div>
  );
}

export default Colors;
