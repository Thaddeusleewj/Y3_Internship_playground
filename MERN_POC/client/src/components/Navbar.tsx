import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  // Declare variables
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <nav className="bg-transparent h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a
                  href="/"
                  className="text-white flex items-center justify-around gap-2 px-7"
                >
                  <img
                    src="../assets/logo.png"
                    alt="logo"
                    className="h-12 aspect-auto w-full"
                  />
                  <span>TuneIn</span>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a
                    href="/"
                    className="text-white relative px-7 py-1 inline-block group overflow-hidden"
                  >
                    Home
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                  <a
                    href="/generate"
                    className="text-white relative px-7 py-1 inline-block group overflow-hidden"
                  >
                    Generate
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                  <a
                    href="/history"
                    className="text-white relative px-7 py-1 inline-block group overflow-hidden"
                  >
                    History
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                  <a
                    href="/"
                    className="text-white relative px-7 py-1 inline-block group overflow-hidden"
                  >
                    About
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-insert focus:ring-white"
                onClick={toggleNavbar}
              >
                {isClicked ? <RxCross1 /> : <HiMenuAlt3 />}
              </button>
            </div>
          </div>
        </div>
        {isClicked && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 z-10 bg-white relative">
            <a
              href="/"
              className="text-white block hover:bg-black hover:text-white rounded-xl p-2"
            >
              Home
            </a>
            <a
              href="/"
              className="text-white block hover:bg-black hover:text-white rounded-xl p-2"
            >
              Generate
            </a>
            <a
              href="/"
              className="text-white block hover:bg-black hover:text-white rounded-xl p-2"
            >
              History
            </a>
            <a
              href="/"
              className="text-white block hover:bg-black hover:text-white rounded-xl p-2"
            >
              About
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
