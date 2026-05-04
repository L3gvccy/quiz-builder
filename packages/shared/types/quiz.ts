export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export type Quiz = {
  id: string;
  title: string;

  questions: Question[];

  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  id: string;
  quizId: string;
  title: string;
  type: QuestionType;
  correctTextAnswer?: string;
  order: number;

  options: AnswerOption[];

  createdAt: Date;
  updatedAt: Date;
};

export type AnswerOption = {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  order: number;

  createdAt: Date;
  updatedAt: Date;
};
