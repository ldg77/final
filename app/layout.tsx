import ClientPrivider from "@/components/ClientPrivider";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./globals.css";
import LogIn from "@/components/LogIn";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
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
              <div>{children}</div>
            </>
          )}
        </body>
      </SessionProvider>
    </html>
  );
}
