import React from "react";
import { NavBar } from "../componenets/NavBar";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <NavBar />
        <div className="pt-20 bg-gradient-to-b from-black via-[#0f1e28] to-[#1a3a5d] min-h-screen">
          <div className="flex lg:mt-36 mt-24 flex-col md:flex-row items-center justify-around text-left md:text-left px-6 md:px-20">
            <div className="font-fugaz flex flex-col text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl space-y-3 md:space-y-6 mb-8 md:mb-0">
              <h1>SUPERCHARGED</h1>
              <h1>COLLABORATIVE</h1>
              {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"> */}
                POMODORO TIMER
              {/* </h2> */}
            </div>

            <div className="flex justify-center items-center md:ml-10">
              <img
                src={Logo}
                alt="Dragon"
                className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80"
              />
            </div>
          </div>
          <div className=" mt-14 font-Cal text-2xl flex md:flex-row md:justify-center  md:space-x-10 flex-col items-center gap-5 ">
            <Link to={"/login"}>
              <div className="text-white p-4 px-24 rounded-xl bg-blue-400">
                <a>Login</a>
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="text-white p-4 px-20 rounded-xl bg-slate-600">
                <h1>Register</h1>
              </div>
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
