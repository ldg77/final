import updateData from "@/lib/updateData";

import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Session } from "next-auth";
import { ChangeEvent } from "react";

type Prop = {
  data: {
    options: string[];
    id: string;
    layout: QuerySnapshot<DocumentData> | undefined;
    session: Session | null;
  };
};

function Type({ data }: Prop) {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    layout: QuerySnapshot<DocumentData> | undefined,
    session: Session | null
  ) => {
    const data = layout?.docs[layout.docs.length - 1].data();
    updateData({ type: e.target.value }, session, "layout");
  };
  return (
    <select
      name="type"
      onChange={(e) => handleChange(e, data.layout, data.session)}
    >
      {data?.options.map((el) => (
        <option key={el + data.id} value={el} className="capitalize">
          {el}
        </option>
      ))}
    </select>
  );
}

export default Type;
