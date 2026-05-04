import type { Quiz } from "@quiz/shared";
import { Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

const QuizCard = ({ quiz, onDelete }: QuizCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-4 w-full p-4 rounded-3xl shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition-all duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/quizzes/${quiz.id}`);
      }}
    >
      <div className="flex flex-col flex-1">
        <p className="text-xl font-semibold">{quiz.title}</p>
        <p className="text-lg opacity-85">
          Number of questions: {quiz.questions.length}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-red-50 text-red-500 p-2 rounded-xl hover:bg-red-100 transition-all duration-300 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(quiz.id);
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
