import React from "react";
import AuthForm from "../componenets/AuthForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center bg-gradient-to-b from-black via-[#0f1e28] to-[#1a3a5d] rounded-lg ">
      <AuthForm />
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
