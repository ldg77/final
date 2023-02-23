import ClientPrivider from "@/components/ClientPrivider";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogIn from "@/components/LogIn";

async function getUser(params: string) {
  const resUser = await fetch(`${process.env.HOST}/api/user/email/` + params);
  const loggeduser = await resUser.json();
  return loggeduser;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    const loggeduser = await getUser(session?.user?.email!);
    if (!loggeduser) {
      await fetch(`${process.env.HOST}/api/user/handler`, {
        method: "POST",
        body: JSON.stringify({
          ...session.user,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }
    await fetch(`${process.env.HOST}/api/chat/user/${loggeduser.email}`, {
      method: "POST",
    });
  }

  return (
    <div>
      <SessionProvider session={session}>
        <div className="flex flex-col h-screen">
          {!session ? (
            <LogIn />
          ) : (
            <>
              <ClientPrivider />
              <div className="flex-1">{children}</div>
            </>
          )}
        </div>
      </SessionProvider>
    </div>
  );
}
