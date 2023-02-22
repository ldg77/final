import Form from "@/components/Form/Form";
import PreviewPagename from "./PreviewPagename";

async function Pagename() {
  const formInfo = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "Step 2 / 5 : your website needs a ... ",
    userpath: "pagename",
  };
  return (
    <>
      <div className="pagename-avatar flex-1 md:flex md:w-full lg:mx-auto">
        <PreviewPagename />
        <div className="input flex-1 flex justify-center items-center h-1/2 p-5 md:my-auto md:w-2/3 text-white md:rounded-r-2xl md:h-5/6">
          <Form formInfo={formInfo} />
        </div>
      </div>
    </>
  );
}

export default Pagename;
