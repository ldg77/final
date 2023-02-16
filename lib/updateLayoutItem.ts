import getLayout from "./getLayout";

async function updateLayoutItem(
  id: string,
  path: string,
  field: string,
  value: any,
  useremail: string
) {
  const layouts = await getLayout(useremail);

  const updatedLayout = Object.keys(layouts.data[path]).reduce(
    (acc: any, el) => {
      acc[el] = (layouts.data[path] as any)[el].map((item: any) => {
        return item.i === id ? { ...item, [field]: value } : { ...item };
      });
      return acc;
    },
    {}
  );
  return updatedLayout;
}
export default updateLayoutItem;
