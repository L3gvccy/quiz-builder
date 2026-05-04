import React from "react";
import { Trash2 } from "lucide-react";
import type { QuestionType } from "@quiz/shared";
import BooleanAnswerField from "./boolean-answer-field";
import InputAnswerField from "./input-answer-field";
import CheckboxOptionsField from "./checkbox-answer-field";
import type { AnswerOption } from "../types";

interface QuestionForm {
  title: string;
  type: QuestionType;
  correctTextAnswer: string;
  booleanAnswer: "true" | "false";
  options: AnswerOption[];
  order: number;
}

interface QuestionCardProps {
  question: QuestionForm;
  questionIndex: number;
  canRemove: boolean;

  onRemoveQuestion: () => void;
  onQuestionTitleChange: (value: string) => void;
  onQuestionTypeChange: (type: QuestionType) => void;

  onBooleanAnswerChange: (
    questionIndex: number,
    value: "true" | "false",
  ) => void;

  onInputAnswerChange: (value: string) => void;

  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
  onOptionTextChange: (optionIndex: number, value: string) => void;
  onOptionCorrectChange: (optionIndex: number, checked: boolean) => void;
}

const QuestionCard = ({
  question,
  questionIndex,
  canRemove,
  onRemoveQuestion,
  onQuestionTitleChange,
  onQuestionTypeChange,
  onBooleanAnswerChange,
  onInputAnswerChange,
  onAddOption,
  onRemoveOption,
  onOptionTextChange,
  onOptionCorrectChange,
}: QuestionCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Question {questionIndex + 1}
        </h2>

        {canRemove && (
          <button
            type="button"
            onClick={onRemoveQuestion}
            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 cursor-pointer"
          >
            <Trash2 size={16} />
            Remove
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Question title
          </label>

          <input
            value={question.title}
            onChange={(event) => onQuestionTitleChange(event.target.value)}
            placeholder="Enter question"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Question type
          </label>

          <select
            value={question.type}
            onChange={(event) =>
              onQuestionTypeChange(event.target.value as QuestionType)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
          >
            <option value="BOOLEAN">Boolean</option>
            <option value="INPUT">Input</option>
            <option value="CHECKBOX">Checkbox</option>
          </select>
        </div>
      </div>

      {question.type === "BOOLEAN" && (
        <BooleanAnswerField
          questionIndex={questionIndex}
          value={question.booleanAnswer}
          onChange={onBooleanAnswerChange}
        />
      )}

      {question.type === "INPUT" && (
        <InputAnswerField
          value={question.correctTextAnswer}
          onChange={onInputAnswerChange}
        />
      )}

      {question.type === "CHECKBOX" && (
        <CheckboxOptionsField
          options={question.options}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
          onOptionTextChange={onOptionTextChange}
          onOptionCorrectChange={onOptionCorrectChange}
        />
      )}
    </div>
  );
};

export default QuestionCard;
