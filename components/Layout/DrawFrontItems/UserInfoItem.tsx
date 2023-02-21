type Prop = {
  itemdata: any;
};
function UserInfoItem({ itemdata }: Prop) {
  return (
    <div style={{ ...itemdata }} className="h-full">
      UserInfo
    </div>
  );
}

export default UserInfoItem;
