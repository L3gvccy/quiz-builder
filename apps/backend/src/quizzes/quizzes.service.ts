import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { QuestionType } from "../../generated/prisma/enums";
import { CreateQuizDto } from "@quiz/shared";

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        description: dto.description,
        questions: {
          create: dto.questions.map((question) => ({
            title: question.title,
            type: question.type,
            correctTextAnswer:
              question.type === QuestionType.INPUT
                ? question.correctTextAnswer
                : null,
            order: question.order,
            options: {
              create:
                question.type === QuestionType.INPUT
                  ? []
                  : (question.options?.map((option) => ({
                      text: option.text,
                      isCorrect: option.isCorrect,
                      order: option.order,
                    })) ?? []),
            },
          })),
        },
      },
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
          include: {
            options: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });
  }

  async getAllQuizzes() {
    return await this.prisma.quiz.findMany({ include: { questions: true } });
  }

  async getQuiz(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
          include: {
            options: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    return quiz;
  }

  async deleteQuiz(id: string) {
    const quiz = await this.prisma.quiz.delete({ where: { id } });

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    return quiz.id;
  }
}
