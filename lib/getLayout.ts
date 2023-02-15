async function getLayout() {
  const resLayout = await fetch("http://localhost:3000/api/layout/handler");
  const res = await resLayout.json();
  console.log(res);

  return res[0];
}

export default getLayout;
