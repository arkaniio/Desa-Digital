import * as dotenv from 'dotenv';
import * as path from 'path'
dotenv.config()
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from "supertest";
import { AppModule } from './../src/app.module';
import { TransformInterceptor } from '../src/interceptor/response_success.interceptor';
import { FilterException } from '../src/interceptor/response_error.interceptor';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalFilters(new FilterException())

    await app.init();
  });

  const login_user = {
    Email: "lalufirdausmuhardika@gmail.com",
    Password: "dika123"
  }


  it('TESTING FILE (POST) AND (PUT)', async () => {
    try {
      const loginResp = await request(app.getHttpServer())
        .post('/user/login')
        .send(login_user)

      expect(loginResp.status).toBe(HttpStatus.CREATED)
      expect(loginResp.body).toHaveProperty("data")

      console.log('STATUS:', loginResp.status);
      console.log('BODY:', loginResp.body);

      const update_resp = await request(app.getHttpServer())
        .put("/user/update")
        .set("Authorization", `Bearer ${loginResp.body.data}`)
        .field("Username", "Dika Ganteng")
        .attach("file", path.join(__dirname, "../src/file_test/download (5).jpg"))

      expect(update_resp.status).toBe(HttpStatus.OK)
      expect(update_resp.body).toHaveProperty("data")

      console.log('STATUS:', update_resp.status);
      console.log('BODY:', update_resp.body);
    } catch (error) {
      console.log(error)
      throw error
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
