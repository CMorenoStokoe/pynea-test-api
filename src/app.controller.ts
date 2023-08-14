import { Controller, Get } from '@nestjs/common';
import { Neo4jService } from './app.service';

/**
 * * Hello world
 * Not required in the spec but this hello world statement will help us test and debug a basic query
 */

@Controller()
export class AppController {
  constructor(private readonly db: Neo4jService) { }

  @Get()
  getAll(): any {
    const response = this.db.query('MATCH (n) RETURN n');
    return response;
  }

}
