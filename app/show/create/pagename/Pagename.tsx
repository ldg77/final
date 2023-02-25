import Form from "@/components/Form/Form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import PreviewPagename from "./PreviewPagename";

const getPageName = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.HOST}/api/user/path/${session?.user?.email}/pagename`,
    { next: { revalidate: 10 } }
  );
  const data = res.json();
  return data;
};

async function Pagename() {
  const pagename = await getPageName();

  const formInfo = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "Step 2 / 5 : your website needs a ... ",
    userpath: "pagename",
    position: "center",
  };
  return (
    <div className="pagename-avatar flex-1 p-5 md:flex">
      {pagename.approved && <PreviewPagename />}
      <div className="input text-white  md:my-auto">
        <Form formInfo={formInfo} />
      </div>
    </div>
  );
}
// h-1/2 p-5 md:my-auto md:w-2/3 text-white md:rounded-r-2xl md:h-5/6
export default Pagename;
