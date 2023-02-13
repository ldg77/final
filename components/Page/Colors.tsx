"use client";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

function Colors({ children }: any) {
  const { data, error, isLoading } = useSWR("/api/maincolor/handler", fetcher, {
    refreshInterval: 10000,
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div
      style={{
        backgroundColor: data[0]?.backgroundColor,
        color: data[0]?.textColor,
      }}
      className="h-full"
    >
      {children}
    </div>
  );
}

export default Colors;
