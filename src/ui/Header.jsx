import { Link } from "react-router-dom";

import SearchOrder from "./SearchOrder";
import UserName from "../features/users/UserName";

const Header = () => {
  return (
    <header className="bg-yellow-500 uppercase tracking-widest py-3 px-4 border-stone-300 
    sm:px-6 flex items-center justify-between font-pizza">
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <UserName />
    </header>
  );
};

export default Header;
