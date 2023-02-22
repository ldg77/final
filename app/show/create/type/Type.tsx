import SelectedType from "./SelectedType";

async function Type() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-3 text-white">
      <p>Step 1 / 5: What is kind of website you need</p>
      <div className=" flex flex-col gap-5 sm:flex-row ">
        <SelectedType selected={"blog"} />
        <SelectedType selected={"shop"} />
      </div>
    </div>
  );
}

export default Type;
