import React from "react";

function Footer() {
  return (
    <div className="bg-slate-800 py-1 fixed bottom-0 w-full flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <span className="text-green-500 font-bold text-lg">&lt;</span>
        <h1 className="font-bold text-white text-lg">Pass</h1>
        <span className="text-green-500 font-bold text-lg">Op/&gt;</span>
      </div>
      <div className="flex items-center justify-center text-white text-sm">
        Created with{" "}
        <i className="fa-solid fa-heart text-lg mx-1 text-red-700"></i>by Kenil
        Savani
      </div>
    </div>
  );
}

export default Footer;
