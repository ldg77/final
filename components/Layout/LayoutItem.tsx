"use client";

type Prop = {
  id: string;
};

function LayoutItem({ id }: Prop) {
  return (
    <div className="w-full grid place-content-center">
      <p className="hover:cursor-pointer">Dubble - Click me to edit</p>
    </div>
  );
}

export default LayoutItem;
