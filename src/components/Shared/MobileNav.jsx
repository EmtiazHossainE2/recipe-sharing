/* eslint-disable react/prop-types */

import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const MobileNav = ({ open, setToggle, user, handleLogOut }) => {
  useEffect(() => {
    setToggle(false);
  }, [setToggle]);

  return (
    <div
      onClick={(e) => {
        const target = e.target;
        if (target.classList.contains("overlay")) {
          setToggle(!open);
        }
      }}
      className={`overlay fixed  left-0 top-0 z-20 h-screen w-[75%] transition-all duration-500  ${
        open ? "bg-black/75" : "pointer-events-none bg-transparent"
      }`}
    >
      <div
        className={`absolute h-screen w-[100%] max-w-[375px] bg-[#18181B] p-3 pb-20 transition-[top]  ${
          open ? "top-0 duration-200" : "hidden"
        }`}
      >
        <div className="item-center  flex flex-col justify-start">
          <div className="flex justify-between p-2 shadow-sm">
            <h3 className="text-xl font-bold">
              {/**************** * Logo *************** */}
              <Link to="/" className="flex items-center text-white">
                Recipe Sharing
              </Link>
            </h3>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={() => setToggle(false)}>
              <AiOutlineClose size={24} className="text-white" />
            </button>
          </div>

          {/***************************** Nav Items  *****************************/}
          <div className="flex flex-col space-y-4 py-10">
            <Link
              to="/"
              className="text-lg  font-semibold text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
            >
              {" "}
              Home{" "}
            </Link>
            <Link
              to="/recipes"
              className="text-lg font-semibold text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
            >
              {" "}
              Recipes{" "}
            </Link>
            {user && (
              <div className="flex flex-col  space-y-3  text-white">
                <Link
                  to="/add-recipe"
                  className="mb-5 text-base  font-medium transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                >
                  {" "}
                  Add Recipes{" "}
                </Link>
                <div className="flex flex-col items-center space-y-4 border-t-2 py-5">
                  <h4 className="">Coins : 50</h4>
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {user ? (
              <button
                onClick={handleLogOut}
                className=" items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 lg:inline-flex"
                role="button"
              >
                Logout
              </button>
            ) : (
              <button
                className=" items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 lg:inline-flex"
                role="button"
                onClick={() =>
                  document.getElementById("login_modal").showModal()
                }
              >
                {" "}
                Google Login{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
