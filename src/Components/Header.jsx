import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ytLogo from "../assests/yt-logo.png";
import ytLogoMobile from "../assests/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import Loader from "../shared/loader";

import { Context } from "../context/contextApi";

const Header = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const { loading, mobileMenu, setmobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const searchQueryHander = (e) => {
    if (
      (e?.key === "Enter" || e === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setmobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
        {loading && <Loader />}
        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div
              className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
              onClick={mobileMenuToggle}
            >
              {mobileMenu ? (
                <CgClose className="text-white text-xl" />
              ) : (
                <SlMenu className="text-white text-xl" />
              )}
            </div>
          )}
          <Link to="/" className="flex h-5 items-center">
            <img
              className="h-full hidden dark:md:block"
              src={ytLogo}
              alt="Youtube"
            />
            <img
              className="h-full md:hidden"
              src={ytLogoMobile}
              alt="Youtube"
            />
          </Link>
        </div>
        <div className="group flex items-center">
          <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#030303] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-white text-xl" />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-base text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg-w-[500px]"
              placeholder="Search"
              onChange={(e) => setsearchQuery(e.target.value)}
              onKeyUp={searchQueryHander}
              value={searchQuery}
            />
          </div>
          <button className="w-[40px] md:w-[60px] h-8 bg-white/[0.1] rounded-r-3xl md:h-10 flex items-center justify-center border border-l-0 border-[#303030]">
            <IoIosSearch className="text-white text-xl" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="hidden lg:items-center md:flex ">
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <RiVideoAddLine className="text-white text-xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <FiBell className="text-white text-xl cursor-pointer" />
            </div>
          </div>
            <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
              <img src="https://xsgames.co/randomusers/assets/avatars/male/59.jpg" alt="random" className="w-full h-full"/>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;
