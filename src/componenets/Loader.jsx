import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0f0f1a]">
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {/* Outer rotating ring */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
          <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spinSlow"></div>
          <div className="absolute inset-2 border-t-4 border-accent rounded-full animate-spinSlow"></div>
        </div>

        {/* Glowing text */}
        <p className="mt-6 text-xl font-semibold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent animate-pulseGlow">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
