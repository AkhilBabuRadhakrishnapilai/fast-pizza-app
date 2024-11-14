import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";

const Header = () => {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <p>ABR</p>
    </header>
  );
};

export default Header;
