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

  const payload_create_village = {
    Name: "Desa Karang Asem",
    Address: "Jalan Tawak Tawak",
    Total_Population: 1000,
    Village_Age: 20,
    Leader_VillageId: 9
  }


  it(' /village/create (POST)', async () => {

    const loginResp = await request(app.getHttpServer())
      .post('/user/login')
      .send(payload_to_send_email)

    expect(loginResp.status).toBe(HttpStatus.CREATED)
    expect(loginResp.body).toHaveProperty("data")

    console.log('STATUS:', loginResp.status);
    console.log('BODY:', loginResp.body);

    const village_res = await request(app.getHttpServer())
      .post('/village/create')
      .send(payload_create_village)
      .set("Authorization", `Bearer ${loginResp.body.data}`)

    console.log('STATUS:', village_res.status);
    console.log('BODY:', village_res.body);

    expect(village_res.body).toHaveProperty("data")
    expect(village_res.status).toBe(HttpStatus.CREATED);
  });

  afterEach(async () => {
    await app.close();
  });
});
