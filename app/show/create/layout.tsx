import Nav from "@/app/show/create/Nav";
import InfoComponents from "@/components/InfoComponents";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <>
        <Nav />
        <div className="flex-1 flex w-full landing-bg">{children}</div>
      </>
    </div>
  );
}
