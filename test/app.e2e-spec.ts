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
    Name: "Desa Karang Anyar",
    Address: "Jalan Tawak Tawak No 3",
    Total_Population: 1003,
    Village_Age: 24,
    Leader_VillageId: 9
  }


  it(' /village/update/:id (PUT)', async () => {

    const loginResp = await request(app.getHttpServer())
      .post('/user/login')
      .send(payload_to_send_email)

    expect(loginResp.status).toBe(HttpStatus.CREATED)
    expect(loginResp.body).toHaveProperty("data")

    console.log('STATUS:', loginResp.status);
    console.log('BODY:', loginResp.body);

    const village_res = await request(app.getHttpServer())
      .put('/village/update/2')
      .send(payload_create_village)
      .set("Authorization", `Bearer ${loginResp.body.data}`)

    console.log('STATUS:', village_res.status);
    console.log('BODY:', village_res.body);

    expect(village_res.body).toHaveProperty("data")
    expect(village_res.status).toBe(HttpStatus.OK);
  });

  afterEach(async () => {
    await app.close();
  });
});
