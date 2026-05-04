import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh] gap-4 p-6">
      <p className="text-5xl">Quiz Builder</p>
      <p className="text-lg">Welcome to quiz builder app!</p>
      <Link
        to="/quizzes"
        className="bg-violet-600 text-white text-xl px-4 py-2 rounded-xl hover:bg-violet-500 transition-all duration-300"
      >
        Go to quizzes
      </Link>
    </div>
  );
};

export default MainPage;
