import React from "react";
import Input from "../componenets/Input";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-b from-black via-[#0f1e28] to-[#1a3a5d]  ">
      <div className="flex flex-col text-white items-center justify-center w-full">
        <h1 className="font-fugaz text-6xl mb-5">TIMEROOM</h1>
        <h1 className="font-fugaz text-xl mb-8 ">WELCOME BACK!</h1>
        <div className="px-10 mx-auto rounded-lg w-4/5 flex flex-col items-center space-y-6">
          <Input placeholder={"Email"} />
          <Input placeholder={"Password"} type="password" />
          <button className="bg-slate-500 text-white p-4 w-full rounded-lg font-semibold hover:bg-slate-800 transition">Login</button>
          <p className="text-blue-200 text-sm text-center cursor-pointer hover:underline">Forgot Password?</p>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <p className="text-white text-sm">
          Don't have an Account?{" "}
          <Link to="/register" className="text-blue-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
