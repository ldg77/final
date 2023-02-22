import Form from "@/components/Form/Form";

import getDataonPath from "@/lib/getDataOnPath";
import PreviewColors from "./PreviewColors";
type PagenameType = {
  backgroundColor: string;
  textColor: string;
};

async function MainColor() {
  const INITIAL: PagenameType = {
    backgroundColor: "",
    textColor: "",
  };
  const formInfo = {
    fields: {
      backgroundColor: "color",
      textColor: "color",
    },
    slogan: "Step 3 / 5: Choose colors ",
    userpath: "maincolor",
  };
  return (
    <>
      <div className="maincolors flex-1 md:flex md:w-full lg:mx-auto">
        <PreviewColors />
        <div className="input flex-1 flex justify-center items-center h-1/2 p-5 md:my-auto md:w-2/3 md:rounded-r-2xl md:h-5/6 text-white">
          <Form formInfo={formInfo} />
        </div>
      </div>
    </>
  );
}

export default MainColor;
