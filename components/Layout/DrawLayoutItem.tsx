type Props = {
  data: {
    x: number;
    y: number;
    h: number;
    w: number;
  };
};

function DrawLayoutItem({ data }: Props) {
  console.log(data);

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
      ></div>
    )
  );
}

export default DrawLayoutItem;
