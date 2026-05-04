import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { QuizzesModule } from './quizzes/quizzes.module';


@Module({
  imports: [QuizzesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
