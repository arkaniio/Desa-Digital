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

  const payload_to_send_email = {
    Email: "lalufirdausmuhardika@gmail.com",
    Password: "dika123"
  }

  const payload_announcement = {
    Tittle: "shshshsh",
    Content: "shshshshshshshs",
    RwId: 1,
    RtId: 2
  }

  const payload_create_Rt = {
    Number: 5,
    RwId: 1
  }


  it(' /announcement/create (POST)', async () => {

    const loginResp = await request(app.getHttpServer())
      .post('/user/login')
      .send(payload_to_send_email)

    expect(loginResp.status).toBe(HttpStatus.CREATED)
    expect(loginResp.body).toHaveProperty("data")

    console.log('STATUS:', loginResp.status);
    console.log('BODY:', loginResp.body);

    const rt_res = await request(app.getHttpServer())
      .post("/register")
      .send(payload_create_Rt)
      .set("Authorization", `Bearer ${loginResp.body.data}`)

    console.log("STATUS:", rt_res.status)
    console.log("BODY:", rt_res.body)

    const announcement_res = await request(app.getHttpServer())
      .post('/announcement/create')
      .send(payload_announcement)
      .set("Authorization", `Bearer ${loginResp.body.data}`)

    console.log('STATUS:', announcement_res.status);
    console.log('BODY:', announcement_res.body);

    expect(announcement_res.body).toHaveProperty("data")
    expect(announcement_res.status).toBe(HttpStatus.OK);
  });

  afterEach(async () => {
    await app.close();
  });
});
