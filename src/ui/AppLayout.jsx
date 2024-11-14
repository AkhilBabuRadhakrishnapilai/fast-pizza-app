import Header from "./Header";
import Loading from "./Loading";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loading />}

      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
