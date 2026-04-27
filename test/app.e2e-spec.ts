import * as dotenv from 'dotenv';
dotenv.config()
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from "supertest";
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


  const payload_user = {
    Username: "Lalu Ahmad Arkani",
    Email: "laluahmadarkani@gmail.com",
    Password: "arkan123",
  }


  it('TESTING FILE (POST) AND (PUT)', async () => {

    const loginResp = await request(app.getHttpServer())
      .post('/user/login')
      .send(payload_user)

    expect(loginResp.status).toBe(HttpStatus.CREATED)
    expect(loginResp.body).toHaveProperty("data")

    console.log('STATUS:', loginResp.status);
    console.log('BODY:', loginResp.body);
  });

  afterEach(async () => {
    await app.close();
  });
});
