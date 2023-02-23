import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ChatItem from "./ChatItem";

function ChatList() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/path/${session?.user?.email}/chat`,
    fetcher,
    { refreshInterval: 1000 }
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data?.data?.chat.messages);

  return (
    <div className="flex-1">
      {data?.data?.chat.messages.map((item: any) => (
        <ChatItem data={item} />
      ))}
    </div>
  );
}

export default ChatList;
