import HeaderItem from "./DrawHeader/HeaderItem";

function DrawLayoutItem({ data }: any) {
  const getPart = (type: string) => {
    switch (type) {
      case "header":
        return <HeaderItem />;
        break;

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
        className="border"
      >
        <p>{data.layoutItemName}</p>
        {getPart(data.type)}
      </div>
    )
  );
}

export default DrawLayoutItem;
