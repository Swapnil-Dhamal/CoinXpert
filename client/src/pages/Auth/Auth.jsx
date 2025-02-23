import React from "react";
import "./Auth.css";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import CryptoLogo from "../../pages/images/logo.png";
import bgImage from "../../pages/images/bg.png";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
        {/* Centered Auth Box */}
        <div
          className="bgBlure relative flex flex-col justify-center items-center 
          h-[38rem] w-[30rem] rounded-lg shadow-2xl bg-black bg-opacity-60 p-6"
        >
          {/* Logo & Heading in One Row */}
          <div className="flex items-center ">
            <Avatar>
              <AvatarImage
                src={CryptoLogo}
                alt="Logo"
                className="w-14 h-14 rounded-full"
              />
            </Avatar>
            <h1 className="text-5xl font-bold">
              <span className="text-orange-500">Coin</span>Xpert
            </h1>
          </div>

          {/* Auth Forms */}
          {location.pathname === "/signup" ? (
            <section className="w-full mt-5">
              <SignupForm />
              <div className="flex items-center justify-center mt-3 text-sm">
                <span>Already have an account?</span>
                <Button
                  onClick={() => navigate("/signin")}
                  variant="ghost"
                  className="ml-2"
                >
                  Sign In
                </Button>
              </div>
            </section>
          ) : location.pathname === "/forgot-password" ? (
            <ForgotPasswordForm />
          ) : (
            <section className="w-full mt-5">
              <SigninForm />
              <div className="flex items-center justify-center mt-3 text-sm">
                <span>Don't have an account?</span>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="ghost"
                  className="ml-2"
                >
                  Sign Up
                </Button>
              </div>

              {/* Forgot Password Button */}
              <div className="mt-3 w-full flex justify-center">
                <Button
                  className="w-full max-w-[20rem]" // ✅ Set max width to prevent exceeding form width
                  onClick={() => navigate("/forgot-password")}
                  variant="outline"
                >
                  Forgot Password?
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
