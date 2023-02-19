import ClientPrivider from "@/components/ClientPrivider";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./globals.css";
import LogIn from "@/components/LogIn";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="flex flex-col h-screen">{children}</body>
    </html>
  );
}
