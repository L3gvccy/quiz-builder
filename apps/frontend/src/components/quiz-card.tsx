import type { Quiz } from "@quiz/shared";
import { Trash } from "lucide-react";
import React from "react";

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

const QuizCard = ({ quiz, onDelete }: QuizCardProps) => {
  return (
    <div className="flex gap-4 w-full p-4 rounded-3xl shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition-all duration-300 cursor-pointer">
      <div className="flex flex-col flex-1">
        <p className="text-xl font-semibold">{quiz.title}</p>
        <p className="text-lg opacity-85">
          Number of questions: {quiz.questions.length}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-red-100 text-red-400 p-2 rounded-xl hover:bg-red-200 hover:text-red-500 transition-all duration-300 cursor-pointer"
          onClick={() => {
            onDelete(quiz.id);
          }}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
