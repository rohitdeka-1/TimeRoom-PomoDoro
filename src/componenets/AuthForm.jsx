import React from "react";
import Input from "./Input";

const AuthForm = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="font-fugaz text-6xl mb-5">TIMEROOM</h1>
      <h1 className="font-fugaz text-xl mb-8 ">WELCOME BACK!</h1>
      <div className="px-10 mx-auto rounded-lg w-4/5 flex flex-col items-center space-y-6">
        <Input placeholder={"Email"} />
        <Input placeholder={"Password"} type="password" />
        <button className="bg-slate-500 text-white p-4 w-full rounded-lg font-semibold hover:bg-slate-800 transition">Login</button>
        <p className="text-blue-200 text-sm text-center cursor-pointer hover:underline">Forgot Password?</p>
      </div>
    </div>
  );
};


export default AuthForm;
