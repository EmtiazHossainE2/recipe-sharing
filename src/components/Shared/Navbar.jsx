import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import MobileNav from "./MobileNav";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import axios from "axios";
import { BASE_URL } from "../../config";
import { onCLickLink } from "../../hooks/useLinkClick";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setToggle] = useState(false);

  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error)
      });
    toast.success("Successfully logged out!");
  };

  // console.log(user, 'user')
  const { currentUser } = useUser(user?.email);
  console.log(currentUser, "currentUser");

  

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      // console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        displayName: result.user?.displayName,
        photoURL: result.user?.photoURL,
        coin: 50,
      };
      
      // console.log(userInfo)
      toast.success("Successfully logged in!");
      window.location.reload()
      axios.post(`${BASE_URL}/users`, userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  


  
  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between lg:h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="flex text-2xl font-bold">
                Recipe Sharing
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setToggle(true)}
              className="inline-flex rounded-md p-2 text-black transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100 lg:hidden"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <Link
                to="/"
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                onClick={onCLickLink}
              >
                {" "}
                Home{" "}
              </Link>
              <Link
                to="/recipes"
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 "
                onClick={onCLickLink}
              >
                {" "}
                Recipes{" "}
              </Link>
            </div>
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10"></div>

            {user && (
              <div className="hidden  items-center gap-8 px-4 lg:flex">
                <Link
                  to="/add-recipe"
                  className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  onClick={onCLickLink}
                >
                  {" "}
                  Add Recipes{" "}
                </Link>

                <h4>Coins : {currentUser?.coin}</h4>
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img src={user?.photoURL} />
                  </div>
                </div>
              </div>
            )}

            {user ? (
              <button
                onClick={handleLogOut}
                className="ml-10 hidden items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 lg:inline-flex"
                role="button"
              >
                Logout
              </button>
            ) : (
              <button
                className="ml-10 hidden items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 lg:inline-flex"
                role="button"
                onClick={() =>
                  document.getElementById("login_modal").showModal()
                }
              >
                {" "}
                Google Login{" "}
              </button>
            )}
          </nav>
        </div>
        <MobileNav
          open={open}
          setToggle={setToggle}
          user={user}
          handleLogOut={handleLogOut}
        />

        {/*Login Modal  */}
        <dialog id="login_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="my-8">
              <h2 className="pb-4 text-center text-2xl font-semibold">
                Welcome to Recipe sharing
              </h2>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center gap-3 rounded-md border-2 border-gray-200 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={24} />
                Sign in with Google
              </button>
            </div>
          </div>
        </dialog>
      </header>
    </>
  );
};

export default NavBar;
