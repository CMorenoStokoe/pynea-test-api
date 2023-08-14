import { Module } from '@nestjs/common';
import { SweetsController } from './sweets.controller';
import { SweetsService } from './sweets.service';
import { Neo4jService } from '../app.service';

@Module({
  controllers: [SweetsController],
  providers: [SweetsService, Neo4jService]
})
export class SweetsModule { }
