import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Quiz } from "@quiz/shared";
import { apiClient } from "../../services/api-client";
import { DELETE_QUIZ_URL, QUIZZES_URL } from "../../utils/constants";
import QuizCard from "../../components/quiz-card";

const Quizzes = () => {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const getQuizzes = async () => {
    try {
      const res = await apiClient.get(QUIZZES_URL);

      setQuizzes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?",
    );
    if (!confirmed) return;
    try {
      await apiClient.delete(DELETE_QUIZ_URL(id));
      alert("Quiz was deleted successfully");
    } catch (error) {
      alert("Failed to delete quiz");
      console.log(error);
    } finally {
      await getQuizzes();
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center w-full p-4">
        <p className="text-xl opacity-85">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-4 items-center w-full max-w-342 p-4">
        <div className="flex flex-col items-center gap-2 w-full rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-3xl font-bold tracking-tight">Quizzes</p>
          <Link
            to="/create"
            className="flex items-center gap-2 w-fit bg-violet-600 text-white text-xl px-4 py-2 rounded-xl hover:bg-violet-500 transition-all duration-300"
          >
            <Plus size={18} />
            <p className="text-base font-semibold">Create quiz</p>
          </Link>
        </div>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={deleteQuiz} />
          ))
        ) : (
          <p className="text-xl opacity-85">No quizzes found</p>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
