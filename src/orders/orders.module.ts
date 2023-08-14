import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Neo4jService } from '../app.service';
import { SweetsModule } from '../sweets/sweets.module';

@Module({
  imports: [SweetsModule],
  providers: [OrdersService, Neo4jService],
  controllers: [OrdersController]
})
export class OrdersModule { }
