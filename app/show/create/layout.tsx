import Nav from "@/components/Nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <>
        <Nav />
        <div className="flex-1 landing-bg">{children}</div>
      </>
    </div>
  );
}
