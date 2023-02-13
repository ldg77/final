"use client";

import { db } from "@/firebase";
import loadData from "@/lib/loadData";
import { collection } from "firebase/firestore";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Footer from "../Footer";
import Form from "../Form/Form";

type PagenameType = {
  avatar: string;
  pagename: string;
  slogan: string;
};

function Pagename() {
  const formInfo = {
    fields: {
      pagename: "text",
      slogan: "text",
      avatar: "file",
    },
    slogan: "Page Name / Slogan / Avatar ",
    userpath: "pagename",
  };

  const INITIAL: PagenameType = {
    avatar: "",
    pagename: "",
    slogan: "",
  };
  const { data: session } = useSession();

  const [value, loading, error] = useCollection(
    collection(db, `users/${session?.user?.email}/pagename`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log(value);

  // const [pagename, setPagename] = useState(INITIAL);
  // useEffect(() => {
  //   loadData(session as Session, "pagename").then((res) =>
  //     setPagename(res[0].data().data)
  //   );
  // }, []);

  return (
    <>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection: {value.docs.map((doc) => JSON.stringify(doc.data()))}
          </span>
        )}
      </p>
      {/* <div className="pagename-avatar flex-1 md:flex md:w-full lg:mx-auto">
        <div className="res bg-black text-white h-1/2 lg:h-5/6 md:my-auto md:w-1/2 flex flex-col justify-center items-center gap-4 font-extrabold md:rounded-l-xl">
          <img src={pagename.avatar} alt="" className="w-1/3 rounded " />
          <p>{pagename.pagename}</p>
          <p>{pagename.slogan}</p>
        </div>
        <div className="input flex-1 h-1/2 lg:h-5/6 grid place-content-center md:my-auto md:w-1/2 border md:rounded-r-2xl">
          <Form formInfo={formInfo} />
        </div>
      </div> */}
      <Footer prev={""} next={"maincolors"} />
    </>
  );
}

export default Pagename;
