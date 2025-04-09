import React from "react";

function PageBackground() {
  return (
    <>
      <div className="absolute bg-indigo-700 rounded-full blur-[75px] h-[800px] left-[-200px] opacity-15 top-[-200px] w-[800px]" />
      <div className="absolute right-0 bottom-0 bg-teal-400 rounded-full blur-[75px] h-[600px] opacity-15 w-[600px]" />
    </>
  );
}

export default PageBackground;
