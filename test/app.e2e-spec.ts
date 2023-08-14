import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('sweets/withQuantityBelow/:quantity (GET)', () => {
    return request(app.getHttpServer())
      .get('/sweets/withQuantityBelow/500')
      .expect(x => x.body.length > 0);
  });

  it('orders/withStatus/:status (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/withStatus/Cancelled')
      .expect(x => x.body.length > 0);
  });

  it('machines/producing/:sweet (GET)', () => {
    return request(app.getHttpServer())
      .get('/machines/producing/Gummy Bears')
      .expect(x => x.body.length > 0);
  });

  /*
   todo: Tests that mutate the database should be virtualised, and these would go here (to test endpoints without changing our db)
   mock functions: https://jestjs.io/docs/mock-functions

  it('orders/:orderId/nowContains/:sweet (GET)', () => {
    return request(app.getHttpServer())
      .get('orders/:orderId/nowContains/:sweet')
      .expect(x => x.body.length > 0);
  });

  it('machines/:machine/nowProduces/:sweet (GET)', () => {
    return request(app.getHttpServer())
      .get('machines/:machine/nowProduces/:sweet')
      .expect(x => x.body.length > 0);
  });
  
  */

  /*
   todo: Implement tests for POST requests (same issue as above)
  */

});