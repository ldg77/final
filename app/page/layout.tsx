import Colors from "@/components/Page/Colors";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen">
      {/* <Colors>{children}</Colors> */}
    </section>
  );
}
