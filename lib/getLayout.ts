async function getLayout(email: string) {
  const userRes = await fetch("/api/user/email/" + email);
  const user = await userRes.json();
  // check if user exists
  if (!user) return { approved: false, message: "no user found" };

  // check if user has any layouts
  if (user.layout) {
    const layoutRes = await fetch("/api/layout/" + user.layout._id);
    return await layoutRes.json();
  }
  return { approved: false, message: "no layout found" };
}

export default getLayout;
