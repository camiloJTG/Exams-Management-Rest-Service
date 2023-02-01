import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, Income, Leadership, Lpago } from './entities';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService],
  imports: [TypeOrmModule.forFeature([Company, Income, Leadership, Lpago])],
})
export class IncomeModule {}
