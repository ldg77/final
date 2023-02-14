"use client";

type Prop = {
  id: string;
};

function LayoutItem({ id }: Prop) {
  return (
    <div className="w-full">
      <input type="text" className="h-full w-full" placeholder="give a name" />
    </div>
  );
}

export default LayoutItem;
