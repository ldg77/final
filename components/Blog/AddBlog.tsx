import { Dispatch, SetStateAction } from "react";
import Form from "../Form/Form";

type Prop = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

function AddBlog({ setShow }: Prop) {
  const formInfo = {
    fields: {
      title: "text",
      theme: "text",
      message: "textarea",
    },
    userpath: "blog",
    slogan: "Define data for new blog",
    dispatch: setShow,
  };

  return (
    <form>
      <div className="absolute right-1/2 z-20 w-full sm:w-64 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            title
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="title"
              required
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            theme
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="theme"
              required
            />
          </label>

          <label className="sr-only">Your message</label>
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
            Post new disscusion
          </button>
        </div>
      </div>
    </form>
  );
  // <div className=" grid place-content-center ">
  //   <Form formInfo={formInfo} />
  // </div>
}

export default AddBlog;
