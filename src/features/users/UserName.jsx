import { useSelector } from "react-redux";

const UserName = () => {

  const username = useSelector(state=>state.user.username)

  if(!username) return null;
  
  return <div className="text-sm text-semibold hidden md:block">{username}</div>;
};

export default UserName;
