import getLayout from "@/lib/getLayout";
import updateLayoutItem from "@/lib/updateLayoutItem";

import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";

function Type() {
  const { data: session } = useSession();

  const handleChange = async () => {};

  return <></>;
}

export default Type;
