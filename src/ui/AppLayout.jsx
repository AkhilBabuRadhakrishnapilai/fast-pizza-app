import { Outlet, useNavigation } from "react-router-dom";

import Header from "./Header";
import Loading from "./Loading";
import CartOverview from "../features/cart/CartOverview";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto]">
      {isLoading && <Loading />}

      <Header />
      <div className="overflow-scroll ">
        <main className="max-w-3xl mx-auto ">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
