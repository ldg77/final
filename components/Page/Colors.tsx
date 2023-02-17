"use client";
import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

function Colors({ children }: any) {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    "/api/user/email/" + session?.user?.email,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  return (
    <div
      style={{
        backgroundColor: data.maincolor.backgroundColor,
        color: data.maincolor.textColor,
      }}
      className="h-full"
    >
      {children}
    </div>
  );
}

export default Colors;
