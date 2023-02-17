import AvatarItem from "./DrawFrontItems/AvatarItem";
import CopyrightItem from "./DrawFrontItems/CopyrightItem";
import PageNameItem from "./DrawFrontItems/PageNameItem";
import SloganItem from "./DrawFrontItems/SloganItem";

function DrawLayoutItem({ data }: any) {
  const getPart = (type: string) => {
    switch (type) {
      case "avatar":
        return <AvatarItem />;
      case "pagename":
        return <PageNameItem />;
      case "slogan":
        return <SloganItem />;
      case "copyright":
        return <CopyrightItem />;
      default:
        break;
    }
  };

  return (
    data && (
      <div
        style={{
          gridColumnStart: data.x + 1,
          gridRowStart: data.y + 1,
          gridColumnEnd: data.x + 1 + data.w,
          gridRowEnd: data.y + 1 + data.h,
        }}
        className=" w-full p-5 border"
      >
        {getPart(data.i)}
      </div>
    )
  );
}

export default DrawLayoutItem;
