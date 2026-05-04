import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackToQuizzesBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="inline-flex items-center gap-2 opacity-65 hover:opacity-85 cursor-pointer transition-all duration-300"
      onClick={() => {
        navigate("/quizzes");
      }}
    >
      <ChevronLeft size={18} />
      <p>Back to quizzes</p>
    </button>
  );
};

export default BackToQuizzesBtn;
