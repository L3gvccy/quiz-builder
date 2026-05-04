import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Quiz } from "@quiz/shared";
import { apiClient } from "../../services/api-client";
import { GET_QUIZ_URL } from "../../utils/constants";
import BackToQuizzesBtn from "../../components/back-to-quizzes-btn";
import QuestionViewCard from "./components/question-view-card";

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>();

  const getQuiz = async () => {
    if (!id) {
      navigate("/quizzes");
      return;
    }

    try {
      const res = await apiClient.get(GET_QUIZ_URL(id));
      setQuiz(res.data);
    } catch (error) {
      alert("Quiz not found");
      navigate("/quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  if (loading || !quiz)
    return (
      <div className="flex justify-center w-full p-4">
        <p className="text-xl opacity-85">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center min-h-[90vh] px-4 py-8 text-slate-900">
      <div className="flex flex-col gap-4 w-full max-w-342">
        <BackToQuizzesBtn />
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-3xl font-bold tracking-tight">{quiz.title}</p>
          <p className="text-lg opacity-85">
            Number of questions: {quiz.questions.length}
          </p>
        </div>

        {quiz.questions.map((question) => (
          <QuestionViewCard key={question.order} question={question} />
        ))}
      </div>
    </div>
  );
};

export default QuizDetails;
