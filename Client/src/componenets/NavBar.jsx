import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [showBars, setShowBars] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { label: "About", path: "/about" },
    { label: "Highlights", path: "/highlights" },
    { label: "Developer", path: "/works" },
    { label: "Socials", path: "/skills" },
    { label: "Contact", path: "/contact" },
  ];

  const handleIconClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setShowBars((prev) => !prev);
      setShowMenu((prev) => !prev);
      setIsFading(false);
    }, 250);
  };

  return (
    <>
      <header className="fixed z-50 w-full px-10 md:px-6 lg:px-10 bg-black py-5 text-white border-b border-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="font-fugaz text-3xl text-white">TIMEROOM</div>
          <div className="text-3xl">
            <FontAwesomeIcon
              onClick={handleIconClick}
              icon={showBars ? faBars : faXmark}
              style={{ color: "white", cursor: "pointer" }}
              className={`transition-opacity duration-200 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </header>

      <div
        className={`
          fixed top-8 left-0 w-full h-screen text-white flex flex-col items-start mt-14 z-40
          transition-all duration-500 ease-in-out
          backdrop-blur-sm bg-black/80
          ${
            showMenu
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }
        `}
      >
        {menuItems.map((item, index) => (
          <Link key={item.label}
             to={item.path}
             className={`block text-4xl lg:text-6xl font-Cal  justify-between w-2/3 mx-auto  border-b border-gray-800  transition-all duration-500 ease-out ${showMenu ? `opacity-100 translate-y-0` : "opacity-0 translate-y-4"} `}
            style={{ transitionDelay: `${index * 150}ms` }}>

            <div className="flex hover:bg-[#666a74] hover:bg-opacity-50 transition-all px-1 py-8 rounded-xl justify-between items-center cursor-pointer">
              {item.label}
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>

          </Link>
        ))}
      </div>
    </>
  );
};

const MenuItem = ({ text }) => (
  <div className="flex font-semibold justify-around items-center w-2/3 mx-auto  border-b border-gray-800 pb-2 hover:opacity-80 cursor-pointer">
    {text}
    <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: "#ffffff" }} />
  </div>
);
