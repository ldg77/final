import Nav from "@/app/show/create/Nav";
import InfoComponents from "@/components/InfoComponents";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <InfoComponents
        prev={{ first: "welcome", second: "page" }}
        now={{ first: "type", second: "page", step: 1 }}
        next={{ first: "pagename", step: 2 }}
      />
      {children}
    </div>
  );
}
