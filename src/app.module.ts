import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Neo4jService } from './app.service';
import { SweetsModule } from './sweets/sweets.module';
import { MachinesModule } from './machines/machines.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), SweetsModule, MachinesModule, OrdersModule],
  controllers: [AppController],
  providers: [Neo4jService],
})
export class AppModule { }