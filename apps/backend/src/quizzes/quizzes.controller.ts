import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { QuizzesService } from "./quizzes.service";
import type { CreateQuizDto } from "@quiz/shared";

@Controller("quizzes")
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async createQuiz(@Body() dto: CreateQuizDto) {
    return await this.quizzesService.createQuiz(dto);
  }

  @Get()
  async getAllQuizzes() {
    return await this.quizzesService.getAllQuizzes();
  }

  @Get(":id")
  async getQuizz(@Param("id") id: string) {
    return await this.quizzesService.getQuiz(id);
  }

  @Delete(":id")
  async deleteQuizz(@Param("id") id: string) {
    return await this.quizzesService.deleteQuiz(id);
  }
}
