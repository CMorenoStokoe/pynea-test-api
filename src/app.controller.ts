import { Controller, Get } from '@nestjs/common';
import { Neo4jService } from './app.service';

/**
 * * Top level app controller
 * Not required in the spec but `getAll` will help us test and debug a basic query, and `test-cleanup` will help us clean up the results of live calls to the db
 */

@Controller()
export class AppController {
  constructor(private readonly db: Neo4jService) { }

  @Get()
  getAll() {
    const response = this.db.query('MATCH (n) RETURN n');
    return response;
  }

  // todo: A temporary solution to clean up live calls to the db during end-to-end testing (for details see test/app.e2e-spec.ts)
  @Get('test-cleanup')
  runCleanup() {
    const response = this.db.query(`
    OPTIONAL MATCH (n1:machine {machineId:"M101"})
    OPTIONAL MATCH (n2:sweet {name:"Skittles"}) 
    OPTIONAL MATCH (n3:order {orderId:999}) 
    OPTIONAL MATCH (:order {orderId:1005})-[e1]-(:sweet {name:"Gummy Bears"})
    OPTIONAL MATCH (:machine {machineId:"M009"})-[e2]-(:sweet {name:"Gummy Bears"})
    DELETE n1, n2, n3, e1, e2
    `
    );
    return response;
  }

}
