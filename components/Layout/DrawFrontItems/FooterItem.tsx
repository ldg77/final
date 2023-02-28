import getAnswerFromGPT from "@/lib/getAnswerFromGPT";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Impressum from "./Impressum";
type Prop = {
  itemdata: any;
};
function FooterItem({ itemdata }: Prop) {
  const { data: session } = useSession();
  const [impressum, setImpressum] = useState({ show: false, data: "" });
  const generate = async () => {
    const load = toast.loading("generate impressum... ");
    getAnswerFromGPT("impressum", session).then((res) => {
      setImpressum({ show: true, data: res });
      toast.success("generated", { id: load });
    });
  };

  return (
    <div className="h-full flex items-center" style={{ ...itemdata }}>
      <button onClick={generate}>Impressum</button>
      {impressum.show && (
        <Impressum data={impressum.data} setImpressum={setImpressum} />
      )}
    </div>
  );
}

export default FooterItem;
