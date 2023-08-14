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

  // todo: For unit testing, and parts of end-2-end testing, we would utilise mock functions so our database is not mutated by tests (https://jestjs.io/docs/mock-functions)

  it('orders/:orderId/nowContains/:sweet (GET)', () => {
    return request(app.getHttpServer())
      .get('/orders/1005/nowContains/Gummy Bears')
      .expect(x => x.body.length > 0);
  });

  it('machines/:machine/nowProduces/:sweet (GET)', () => {
    return request(app.getHttpServer())
      .get('/machines/M009/nowProduces/Gummy Bears')
      .expect(x => x.body.length > 0);
  });

  it('sweets/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/sweets')
      .send({ "name": "Skittles", "ingredients": ["sugar", "sweetener", "coloring", "preservative"], "price": 0.05, "quantityInStock": 5000 })
      .expect(x => x.body.length > 0);
  });

  it('machines/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/machines')
      .send({ "machineId": "M101", "type": "Liquorice Stomper", "capacity": "35kg", "status": "available" })
      .expect(x => x.body.length > 0);
  });

  it('orders/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/orders')
      .send({ "orderId": 999, "customerName": "Chris MS", "status": "Pending" })
      .expect(x => x.body.length > 0);
  });

  // todo: A crude way of cleaning up the results of POST test calls to the live db

  it('Test cleanup', () => {
    return request(app.getHttpServer())
      .get('/test-cleanup')
      .expect(x => x.body.length > 0);
  });

});