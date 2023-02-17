async function getLayout(email: string) {
  const userLayoutRes = await fetch(`/api/user/path/${email}/layout`);
  const layout = await userLayoutRes.json();
  return layout;
}

export default getLayout;
