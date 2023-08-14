import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { Neo4jService } from '../app.service';
import { SweetsModule } from '../sweets/sweets.module';

@Module({
  imports: [SweetsModule],
  providers: [MachinesService, Neo4jService],
  controllers: [MachinesController]
})
export class MachinesModule { }
