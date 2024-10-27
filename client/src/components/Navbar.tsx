import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { appContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn,user } = useUser();
  const context = useContext(appContext);
  if (!context) {
    throw new Error("appContext must be used within a AppContextProvider");
  }
  const { credit, loadCreditsData } = context;

  const navigate = useNavigate();


  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData();
    }
  }, [isSignedIn, loadCreditsData]);

  return (
    <nav className="flex items-center justify-between p-4 ">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
      </Link>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={()=>navigate('/buy')} className="flex items-center gap-2 bg-blue-100 sm:px-7 px-4 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700">
              <img src={assets.credit_icon} className="w-5 " />
              <p className="text-md sm:text-md font-medium text-gray-600">Credits:{credit}</p>

            </button>
            <p className="text-gray-600 max-sm:hidden">Hi,{user.fullName}</p>
            <UserButton />
          </div>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-zinc-900 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 rounded-full text-sm hover:bg-zinc-700 transition-colors"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
