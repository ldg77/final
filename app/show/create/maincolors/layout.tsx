import InfoComponents from "@/components/InfoComponents";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <InfoComponents
        prev={{ first: "pagename", second: "page" }}
        now={{ first: "color", second: "page", step: 3 }}
        next={{ first: "layout", step: 4 }}
      />
      {children}
    </div>
  );
}
