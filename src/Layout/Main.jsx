import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const Main = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
