import ClientPrivider from "@/components/ClientPrivider";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogIn from "@/components/LogIn";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    const resUser = await fetch(
      "http://localhost:3000/api/user/email/" + session.user?.email!
    );

    const loggeduser = await resUser.json();

    if (!loggeduser) {
      const resUser = await fetch("http://localhost:3000/api/user/handler", {
        method: "POST",
        body: JSON.stringify({
          ...session.user,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const user = await resUser.json();
    }
  }

  return (
    <html lang="en">
      <head />
      <SessionProvider session={session}>
        <body className="flex flex-col h-screen">
          {!session ? (
            <LogIn />
          ) : (
            <>
              <ClientPrivider />
              <div className="flex-1">{children}</div>
            </>
          )}
        </body>
      </SessionProvider>
    </html>
  );
}
