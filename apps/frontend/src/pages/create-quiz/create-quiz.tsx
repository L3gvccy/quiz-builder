import React, { useState } from "react";
import { Plus, Save } from "lucide-react";
import { QUIZZES_URL } from "../../utils/constants";
import QuestionCard from "./components/question-card";
import type { CreateQuizPayload, QuestionForm } from "./types";
import type { QuestionType } from "@quiz/shared";
import { apiClient } from "../../services/api-client";
import BackToQuizzesBtn from "../../components/back-to-quizzes-btn";

const createDefaultQuestion = (order: number): QuestionForm => ({
  title: "",
  type: "BOOLEAN",
  correctTextAnswer: "",
  booleanAnswer: "true",
  order,
  options: [
    {
      text: "True",
      isCorrect: true,
      order: 1,
    },
    {
      text: "False",
      isCorrect: false,
      order: 2,
    },
  ],
});

const CreateQuizPage = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionForm[]>([
    createDefaultQuestion(1),
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, createDefaultQuestion(prev.length + 1)]);
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    setQuestions((prev) =>
      prev
        .filter((_, index) => index !== questionIndex)
        .map((question, index) => ({
          ...question,
          order: index + 1,
        })),
    );
  };

  const handleQuestionTitleChange = (questionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              title: value,
            }
          : question,
      ),
    );
  };

  const handleQuestionTypeChange = (
    questionIndex: number,
    type: QuestionType,
  ) => {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        if (type === "BOOLEAN") {
          return {
            ...question,
            type,
            correctTextAnswer: "",
            booleanAnswer: "true",
            options: [
              {
                text: "True",
                isCorrect: true,
                order: 1,
              },
              {
                text: "False",
                isCorrect: false,
                order: 2,
              },
            ],
          };
        }

        if (type === "INPUT") {
          return {
            ...question,
            type,
            correctTextAnswer: "",
            options: [],
          };
        }

        return {
          ...question,
          type,
          correctTextAnswer: "",
          options: [
            {
              text: "",
              isCorrect: true,
              order: 1,
            },
            {
              text: "",
              isCorrect: false,
              order: 2,
            },
          ],
        };
      }),
    );
  };

  const handleBooleanAnswerChange = (
    questionIndex: number,
    value: "true" | "false",
  ) => {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          booleanAnswer: value,
          options: [
            {
              text: "True",
              isCorrect: value === "true",
              order: 1,
            },
            {
              text: "False",
              isCorrect: value === "false",
              order: 2,
            },
          ],
        };
      }),
    );
  };

  const handleInputAnswerChange = (questionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              correctTextAnswer: value,
            }
          : question,
      ),
    );
  };

  const handleAddOption = (questionIndex: number) => {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: [
            ...question.options,
            {
              text: "",
              isCorrect: false,
              order: question.options.length + 1,
            },
          ],
        };
      }),
    );
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: question.options
            .filter((_, index) => index !== optionIndex)
            .map((option, index) => ({
              ...option,
              order: index + 1,
            })),
        };
      }),
    );
  };

  const handleOptionTextChange = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: question.options.map((option, index) =>
            index === optionIndex
              ? {
                  ...option,
                  text: value,
                }
              : option,
          ),
        };
      }),
    );
  };

  const handleOptionCorrectChange = (
    questionIndex: number,
    optionIndex: number,
    checked: boolean,
  ) => {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: question.options.map((option, index) =>
            index === optionIndex
              ? {
                  ...option,
                  isCorrect: checked,
                }
              : option,
          ),
        };
      }),
    );
  };

  const validateForm = () => {
    if (!title.trim()) {
      alert("Enter quiz title");
      return false;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return false;
    }

    for (const question of questions) {
      if (!question.title.trim()) {
        alert(`Question ${question.order}: enter question title`);
        return false;
      }

      if (question.type === "INPUT" && !question.correctTextAnswer.trim()) {
        alert(`Question ${question.order}: enter correct text answer`);
        return false;
      }

      if (question.type === "CHECKBOX") {
        if (question.options.length < 2) {
          alert(`Question ${question.order}: add at least two options`);
          return false;
        }

        const hasEmptyOption = question.options.some(
          (option) => !option.text.trim(),
        );

        if (hasEmptyOption) {
          alert(`Question ${question.order}: all options must have text`);
          return false;
        }

        const hasCorrectOption = question.options.some(
          (option) => option.isCorrect,
        );

        if (!hasCorrectOption) {
          alert(
            `Question ${question.order}: select at least one correct option`,
          );
          return false;
        }
      }
    }

    return true;
  };

  const buildPayload = (): CreateQuizPayload => {
    return {
      title: title.trim(),
      questions: questions.map((question, questionIndex) => {
        if (question.type === "INPUT") {
          return {
            title: question.title.trim(),
            type: question.type,
            correctTextAnswer: question.correctTextAnswer.trim(),
            order: questionIndex + 1,
            options: [],
          };
        }

        if (question.type === "BOOLEAN") {
          return {
            title: question.title.trim(),
            type: question.type,
            order: questionIndex + 1,
            options: question.options,
          };
        }

        return {
          title: question.title.trim(),
          type: question.type,
          order: questionIndex + 1,
          options: question.options.map((option, optionIndex) => ({
            text: option.text.trim(),
            isCorrect: option.isCorrect,
            order: optionIndex + 1,
          })),
        };
      }),
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = buildPayload();

      await apiClient.post(QUIZZES_URL, payload);

      setTitle("");
      setQuestions([createDefaultQuestion(1)]);

      alert("Quiz created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-[90vh] px-4 py-8 text-slate-900">
      <div className="flex flex-col gap-4 w-full max-w-342">
        <BackToQuizzesBtn />
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Create Quiz
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-slate-500">
            Add quiz title, create questions, choose their types and mark
            correct answers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-medium text-slate-700">
              Quiz title
            </label>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter quiz title"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            />
          </section>

          {questions.map((question, questionIndex) => (
            <QuestionCard
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
              canRemove={questions.length > 1}
              onRemoveQuestion={() => handleRemoveQuestion(questionIndex)}
              onQuestionTitleChange={(value) =>
                handleQuestionTitleChange(questionIndex, value)
              }
              onQuestionTypeChange={(type) =>
                handleQuestionTypeChange(questionIndex, type)
              }
              onBooleanAnswerChange={handleBooleanAnswerChange}
              onInputAnswerChange={(value) =>
                handleInputAnswerChange(questionIndex, value)
              }
              onAddOption={() => handleAddOption(questionIndex)}
              onRemoveOption={(optionIndex) =>
                handleRemoveOption(questionIndex, optionIndex)
              }
              onOptionTextChange={(optionIndex, value) =>
                handleOptionTextChange(questionIndex, optionIndex, value)
              }
              onOptionCorrectChange={(optionIndex, checked) =>
                handleOptionCorrectChange(questionIndex, optionIndex, checked)
              }
            />
          ))}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-base font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-600 cursor-pointer"
            >
              <Plus size={18} />
              Add question
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-base font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              <Save size={18} />
              {isSubmitting ? "Creating..." : "Create quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizPage;
