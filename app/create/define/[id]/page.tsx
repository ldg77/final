import React from "react";

type Props = {
  params: {
    id: string;
  };
};

function page({ params: { id } }: Props) {
  return <div>{id}</div>;
}

export default page;
