import getLayout from "./getLayout";

async function updateLayoutItem(
  id: string,
  path: string,
  field: string,
  value: any
) {
  const layouts = await getLayout();
  const updatedLayout = Object.keys(layouts[path]).reduce((acc: any, el) => {
    acc[el] = (layouts[path] as any)[el].map((item: any) => {
      return item.i === id ? { ...item, [field]: value } : { ...item };
    });
    return acc;
  }, {});
  return updatedLayout;
}
export default updateLayoutItem;
