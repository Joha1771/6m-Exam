import React, { useState } from "react";
import logoIcon from "../../../assets/Icons/logo.svg";
import searchIcon from "../../../assets/Icons/MobileSearch.svg";

const navLinks = ["Home", "Shop", "Plant Care", "Blogs"];

const DesktopNavbar = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <header className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1200px] mx-auto w-full px-8 h-[70px] flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0 cursor-pointer">
          <img src={logoIcon} alt="GreenShop" className="h-8" />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`text-sm font-semibold transition-colors relative pb-1 ${
                activeTab === label
                  ? "text-[#46A358]"
                  : "text-gray-700 hover:text-[#46A358]"
              }`}
            >
              {label}
              {activeTab === label && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#46A358] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Search + Login */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#f8f8f8] rounded-lg px-3 py-2 w-[220px]">
            <img src={searchIcon} alt="search" className="w-4 h-4 opacity-50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find your plants"
              className="bg-transparent text-sm outline-none w-full text-gray-600 placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 border border-[#46A358] text-[#46A358] text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#46A358] hover:text-white transition-all">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Login
          </button>
          <button className="relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#46A358] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbar;
