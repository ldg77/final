import { useSession } from "next-auth/react";
import AvatarItem from "./DrawFrontItems/AvatarItem";
import CopyrightItem from "./DrawFrontItems/CopyrightItem";
import PageNameItem from "./DrawFrontItems/PageNameItem";
import SloganItem from "./DrawFrontItems/SloganItem";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import getSessionUser from "@/lib/getSessionUser";
import Footer from "../Footer";
import FooterItem from "./DrawFrontItems/FooterItem";
import MainItem from "./DrawFrontItems/MainItem";
import BlogPartItem from "./DrawFrontItems/BlogPartItem";

function DrawLayoutItem({ params }: any) {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(
    `/api/user/email/${session?.user?.email}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const getPart = (type: string) => {
    switch (type) {
      case "avatar":
        return <AvatarItem itemdata={data.type?.layoutitem[type]} />;
      case "pagename":
        return <PageNameItem itemdata={data.type?.layoutitem[type]} />;
      case "slogan":
        return <SloganItem itemdata={data.type?.layoutitem[type]} />;
      case "copyright":
        return <CopyrightItem itemdata={data.type?.layoutitem[type]} />;
      case "footer":
        return <FooterItem itemdata={data.type?.layoutitem[type]} />;
      case "main":
        return <MainItem itemdata={data.type?.layoutitem[type]} />;
      case "blogpart":
        return <BlogPartItem itemdata={data.type?.layoutitem[type]} />;
      default:
        break;
    }
  };

  return (
    params && (
      <div
        style={{
          gridColumnStart: params.x + 1,
          gridRowStart: params.y + 1,
          gridColumnEnd: params.x + 1 + params.w,
          gridRowEnd: params.y + 1 + params.h,
        }}
        className="w-full"
      >
        {getPart(params.i)}
      </div>
    )
  );
}

export default DrawLayoutItem;
