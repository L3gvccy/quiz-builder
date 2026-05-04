import React from "react";
import { CheckCircle2, Circle, Type } from "lucide-react";
import type { Question, QuestionType } from "@quiz/shared";

interface QuestionViewCardProps {
  question: Question;
}

const getQuestionTypeLabel = (type: QuestionType) => {
  switch (type) {
    case "BOOLEAN":
      return "True / False";
    case "INPUT":
      return "Text answer";
    case "CHECKBOX":
      return "Multiple choice";
    default:
      return type;
  }
};

const QuestionViewCard = ({ question }: QuestionViewCardProps) => {
  const sortedOptions = [...question.options].sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
              {question.order}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {getQuestionTypeLabel(question.type)}
            </span>
          </div>

          <h2 className="text-lg font-semibold leading-7 text-slate-950">
            {question.title}
          </h2>
        </div>
      </div>

      {question.type === "INPUT" && (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-700">
            <Type size={16} />
            Correct text answer
          </div>

          <p className="text-sm font-semibold text-slate-800">
            {question.correctTextAnswer || "Not specified"}
          </p>
        </div>
      )}

      {(question.type === "BOOLEAN" || question.type === "CHECKBOX") && (
        <div className="space-y-3">
          {sortedOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                option.isCorrect
                  ? "border-violet-300 bg-violet-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              {question.type === "CHECKBOX" ? (
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    option.isCorrect
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {option.isCorrect && <CheckCircle2 size={14} />}
                </div>
              ) : (
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    option.isCorrect
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {option.isCorrect ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Circle size={10} className="text-transparent" />
                  )}
                </div>
              )}

              <span
                className={`text-sm ${
                  option.isCorrect
                    ? "font-semibold text-violet-700"
                    : "text-slate-700"
                }`}
              >
                {option.text}
              </span>

              {option.isCorrect && (
                <span className="ml-auto rounded-full bg-violet-600 px-2.5 py-1 text-xs font-medium text-white">
                  Correct
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionViewCard;
