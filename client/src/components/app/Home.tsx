import NavBar from "./NavBar";
import UserNav from "../user/UserNav";
import { useTokenStore } from "../auth/hooks/useToken";
import { Outlet } from "react-router-dom";
const Home = () => {
  const token = useTokenStore((state) => state.accessToken);
  const Nav = token ? UserNav : NavBar;
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Home;
