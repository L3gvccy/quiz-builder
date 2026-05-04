import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex w-full justify-center items-center p-4 bg-zinc-100">
      <Link to="/" className="flex justify-center items-center gap-4">
        <img src="/logo.png" alt="Logo" className="w-12" />
        <p className="font-semibold text-3xl italic">Quiz Builder</p>
      </Link>
    </div>
  );
};

export default Header;
