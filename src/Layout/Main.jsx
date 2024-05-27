import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { useState } from "react";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOkayClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-6/12 max-w-5xl rounded-lg bg-white px-6 py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">Notice</h2>
            <p className="mb-6 text-lg font-bold text-red-500">
              If Server is down, please login and hard reload.{" "}
              <br className="hidden lg:block" /> Sometimes free server is down.
            </p>
            <button
              onClick={handleOkayClick}
              className="btn btn-primary btn-md px-8 py-2"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
