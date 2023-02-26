import mongoose from "mongoose";
import React from "react";
import Form from "../Form/Form";
type Prop = {
  blog: mongoose.Schema.Types.ObjectId;
  setShow: any;
};
function AddCommentToBlog({ blog, setShow }: Prop) {
  const formInfo = {
    fields: {
      name: "text",
      avatar: "file",
      message: "textarea",
    },
    userpath: "comment",
    slogan: "add a comment",
    options: { blog },
    dispatch: setShow,
    color: "white",
  };
  return (
    <>
      <form>
        <div className="absolute right-8 z-20 w-full sm:w-64 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              your name
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Dima"
                required
              />
            </label>

            <label className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <label className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Upload image</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );

  // <div className="absolute right-8 z-20 bg-slate-900 rounded text-white">
  //   {" "}
  //   <div>
  //     <Form formInfo={formInfo} />
  //   </div>
  // </div>
}

export default AddCommentToBlog;
