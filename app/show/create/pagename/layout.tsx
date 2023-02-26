import InfoComponents from "@/components/InfoComponents";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <InfoComponents
        prev={{ first: "type", second: "page" }}
        now={{ first: "pagename", second: "page", step: 2 }}
        next={{ first: "maincolor", step: 3 }}
      />
      {children}
    </div>
  );
}
