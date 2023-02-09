import LogIn from "@/components/LogIn";
import Nav from "@/components/Nav";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col h-screen">
      <SessionProvider session={session}>
        {!session ? (
          <LogIn />
        ) : (
          <>
            <Nav />
            <div className="flex-1">{children}</div>
          </>
        )}
      </SessionProvider>
    </div>
  );
}
