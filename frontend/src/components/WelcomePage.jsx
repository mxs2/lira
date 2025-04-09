import React from "react";
import { useNavigate } from "react-router-dom";
import PageBackground from "./shared/PageBackground";

function WelcomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="flex overflow-hidden relative justify-center items-center w-full h-screen bg-neutral-950 min-h-[716px]">
        <PageBackground />

        {/* Advanced Audio Visualizer Animation */}
        <div className="absolute inset-x-0 bottom-0 h-64 md:h-80 flex items-center justify-center z-[1]">
          <div className="audio-visualizer relative w-full max-w-4xl h-full flex items-center justify-center">
            {/* Bass Pulse Effect */}
            <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2">
              <div className="bass-pulse rounded-full bg-indigo-500/10 w-40 h-40 animate-bass-pulse"></div>
              <div className="bass-pulse rounded-full bg-indigo-500/10 w-60 h-60 animate-bass-pulse-delayed"></div>
              <div className="bass-pulse rounded-full bg-indigo-500/10 w-80 h-80 animate-bass-pulse-delayed-more"></div>
            </div>
          </div>
        </div>

        <div className="relative p-5 text-center z-[2]">
          <div className="mb-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4318D1] to-[#18D1B8] leading-[72px] max-md:text-4xl max-md:leading-[60px] max-sm:text-3xl max-sm:leading-10">
            Welcome to Lira
          </div>
          <div className="mx-auto mt-0 mb-11 text-lg leading-7 max-w-[450px] text-neutral-400 max-md:text-base max-md:leading-6 max-md:max-w-[400px] max-sm:mb-8 max-sm:text-sm max-sm:leading-5 max-sm:max-w-[300px]">
            Share your music with the world. Build your portfolio. Connect with
            fans.
          </div>
          <div className="flex gap-4 justify-center max-md:flex-col max-md:items-center">
            <button
              onClick={handleLogin}
              className="px-0 py-4 text-base font-semibold leading-6 text-white bg-indigo-700 rounded-lg transition-opacity cursor-pointer border-[none] duration-[0.2s] w-[242px] hover:bg-indigo-600 max-sm:w-full max-sm:max-w-[242px]"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="px-0 py-4 text-base font-semibold leading-6 text-white rounded-lg transition-opacity cursor-pointer bg-zinc-800 border-[none] duration-[0.2s] w-[242px] hover:bg-zinc-700 max-sm:w-full max-sm:max-w-[242px]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
