async function getLayout(email: string) {
  const userLayoutRes = await fetch(`/api/user/path/${email}/layout`);
  const layout = await userLayoutRes.json();
  // check if user exists
  if (!layout) return { approved: false, message: "no user found" };

  // check if user has any layouts
  if (layout) {
    return { approved: true, layout, message: "layout found" };
  }
  return { approved: false, message: "no layout found" };
}

export default getLayout;
