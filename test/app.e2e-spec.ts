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

  const payload_to_send = {
    Number: 5,
    RwId: 1
  }

  const payload_to_send_email = {
    Email: "lalufirdausmuhardika@gmail.com",
    Password: "dika123"
  }

  it('/rt/register (POST)', async () => {

    const loginResp = await request(app.getHttpServer())
      .post('/user/login')
      .send(payload_to_send_email)

    expect(loginResp.status).toBe(HttpStatus.CREATED)
    expect(loginResp.body).toHaveProperty("data")

    console.log('STATUS:', loginResp.status);
    console.log('BODY:', loginResp.body);

    const res = await request(app.getHttpServer())
      .post('/rt/register')
      .send(payload_to_send)
      .set("Authorization", `Bearer ${loginResp.body.data}`)

    console.log('STATUS:', res.status);
    console.log('BODY:', res.body);

    expect(res.body).toHaveProperty("data")
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  afterEach(async () => {
    await app.close();
  });
});
