import type { QuestionType } from "../types/quiz";

export interface CreateAnswerOptionDto {
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface CreateQuestionDto {
  title: string;
  type: QuestionType;
  correctTextAnswer?: string;
  order: number;
  options?: CreateAnswerOptionDto[];
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
