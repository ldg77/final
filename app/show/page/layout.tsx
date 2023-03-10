import Colors from "@/components/Page/Colors";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen flex-1">
      <Colors>{children}</Colors>
    </section>
  );
}
