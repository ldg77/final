import AvatarItem from "./DrawFrontItems/AvatarItem";
import CopyrightItem from "./DrawFrontItems/CopyrightItem";
import PageNameItem from "./DrawFrontItems/PageNameItem";
import SloganItem from "./DrawFrontItems/SloganItem";
import FooterItem from "./DrawFrontItems/FooterItem";
import ShopItem from "./DrawFrontItems/ShopItem";
import BlogPartItem from "./DrawFrontItems/BlogPartItem";
import UserInfoItem from "./DrawFrontItems/UserInfoItem";

function DrawLayoutItem({ params, data }: any) {
  const getPart = (type: string) => {
    switch (type) {
      case "avatar":
        return <AvatarItem itemdata={data} />;
      case "pagename":
        return <PageNameItem itemdata={data} />;
      case "slogan":
        return <SloganItem itemdata={data} />;
      case "copyright":
        return <CopyrightItem itemdata={data} />;
      case "footer":
        return <FooterItem itemdata={data} />;
      case "shopmain":
        return <ShopItem itemdata={data} />;
      case "blogpart":
        return <BlogPartItem itemdata={data} />;
      case "userinfo":
        return <UserInfoItem itemdata={data.data?.type?.layoutitem[type]} />;
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
