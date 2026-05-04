import type { QuestionType } from "@quiz/shared";

export interface AnswerOption {
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface QuestionForm {
  title: string;
  type: QuestionType;
  correctTextAnswer: string;
  booleanAnswer: "true" | "false";
  options: AnswerOption[];
  order: number;
}

export interface CreateQuizPayload {
  title: string;
  questions: {
    title: string;
    type: QuestionType;
    correctTextAnswer?: string;
    order: number;
    options?: AnswerOption[];
  }[];
}
