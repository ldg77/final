import LogIn from "@/components/LogIn";
import Nav from "@/components/Nav";
import "./globals.css";
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
    <html lang="en">
      <head />
      <body className="flex flex-col h-screen">
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
      </body>
    </html>
  );
}
