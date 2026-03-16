import { Link } from "react-router-dom";
import search from "../../../assets/Icons/MobileSearch.svg";
import NavbarBg from "../../../assets/Icons/MobileNavbarBg.svg";
import scanner from "../../../assets/Icons/Scanner.svg";
import {
  CartIcon,
  HeartIcon,
  HomeIcon,
  UserIcon,
} from "../../../assets/Icons/Icons";

const MobileNavbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm ">
        <div className="container pt-4 pb-3 px-4">
          <div className="flex bg-[#f8f8f8] px-5 py-4 rounded-xl">
            <img src={search} alt="Search Icon" />
            <input
              type="search"
              placeholder="Find your plants"
              className="px-3 w-full bg-[#f8f8f8] outline-none"
            />
          </div>
        </div>
      </header>
      <nav className="fixed bottom-0 left-0 w-full z-50">
        <div className="absolute  left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#46a359b7] w-[60px] h-[60px] flex items-center justify-center rounded-full p-3 shadow-lg">
            <img src={scanner} alt="Scanner" className="w-full" />
          </div>
        </div>
        <div className="relative">
          <img src={NavbarBg} alt="Navbar Background" className="w-full" />
          <div className="absolute inset-0 flex justify-between items-center px-10 pt-10">
            <div className="flex items-center gap-7">
              <Link to="/" className="group flex flex-col items-center">
                <HomeIcon className="text-[#D9D9D9] group-hover:text-[#46A358] transition-colors w-6 h-6" />
                <span className="text-xs text-[#D9D9D9] group-hover:text-[#46A358] mt-1 transition-colors">
                  Home
                </span>
              </Link>
              <Link
                to="/favorites"
                className="group flex flex-col items-center"
              >
                <HeartIcon className="text-[#D9D9D9] group-hover:text-[#46A358] transition-colors w-6 h-6" />
                <span className="text-xs text-[#D9D9D9] group-hover:text-[#46A358] mt-1 transition-colors">
                  Favorites
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-10">
              <Link to="/cart" className="group flex flex-col items-center">
                <CartIcon className="text-[#D9D9D9] group-hover:text-[#46A358] transition-colors w-6 h-6" />
                <span className="text-xs text-[#D9D9D9] group-hover:text-[#46A358] mt-1 transition-colors">
                  Cart
                </span>
              </Link>
              <Link to="/profile" className="group flex flex-col items-center">
                <UserIcon className="text-[#D9D9D9] group-hover:text-[#46A358] transition-colors w-6 h-6" />
                <span className="text-xs text-[#D9D9D9] group-hover:text-[#46A358] mt-1 transition-colors">
                  Profile
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
