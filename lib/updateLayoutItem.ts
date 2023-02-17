import getLayout from "./getLayout";

async function updateLayoutItem(
  id: string,
  path: string,
  field: string,
  value: any,
  useremail: string
) {
  const layouts = await getLayout(useremail);
  const updatedLayout = Object.keys(layouts.layout.layout[path]).reduce(
    (acc: any, el) => {
      acc[el] = (layouts.layout.layout[path] as any)[el].map((item: any) => {
        return item.i === id ? { ...item, [field]: value } : { ...item };
      });
      return acc;
    },
    {}
  );
  await fetch("/api/layout/" + layouts.layout._id, {
    method: "PUT",
    body: JSON.stringify({ ...layouts.layout, layouts: updatedLayout }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
export default updateLayoutItem;
