import Footer from "@/components/Footer";
import Form from "@/components/Form/Form";

type props = {
  fields: {
    pagename: string;
    slogan: string;
    avatar: string;
  };
  userpath: string;
  slogan: string;
};

function page() {
  const formInfo: props = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "pagename / slogan / avatar",
    userpath: "pagename",
  };

  return (
    <div className="h-full flex flex-col">
      <div className="pagename-avatar flex-1 md:flex md:w-full md:mx-auto">
        <div className="res bg-black text-white h-1/2 md:my-auto md:w-1/2">
          bla
        </div>
        <div className="input flex-1 h-1/2 grid place-content-center md:my-auto md:w-1/2">
          <Form formInfo={formInfo} />
        </div>
      </div>
      <Footer prev={""} next={"maincolors"} />
    </div>
  );
}

export default page;
