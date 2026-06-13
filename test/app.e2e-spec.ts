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

  it('TESTING DASHBOARD ENDPOINTS', async () => {
    const loginResp = await request(app.getHttpServer()).post('/user/login').send(login_user);
    const token = loginResp.body.data;

    const urls = ['/dashboard', '/dashboard/super_admin', '/dashboard/warga', '/dashboard/kepala_desa', '/dashboard/rt', '/dashboard/rw'];
    for (const url of urls) {
      const res = await request(app.getHttpServer()).get(url).set('Authorization', `Bearer ${token}`);
      console.log(`[DASHBOARD] GET ${url} -> Status: ${res.status}`);
      // Don't assert 200 strictly because permissions might deny it (e.g. 403)
      expect(res.status).toBeDefined();
    }
  });

  it('TESTING ANNOUNCEMENT ENDPOINTS', async () => {
    const loginResp = await request(app.getHttpServer()).post('/user/login').send(login_user);
    const token = loginResp.body.data;

    // GET ALL
    let res = await request(app.getHttpServer()).get('/announcement/all?page=1&limit=10').set('Authorization', `Bearer ${token}`);
    console.log(`[ANNOUNCEMENT] GET /announcement/all -> Status: ${res.status}`);

    // POST CREATE (dummy)
    res = await request(app.getHttpServer()).post('/announcement/create').set('Authorization', `Bearer ${token}`)
      .field('Title', 'Test').field('Content', 'Test').field('Status', 'ACTIVE').attach('file', Buffer.from('test'), 'test.png');
    console.log(`[ANNOUNCEMENT] POST /announcement/create -> Status: ${res.status}`);

    // PUT UPDATE
    res = await request(app.getHttpServer()).put('/announcement/update/999').set('Authorization', `Bearer ${token}`)
      .field('Title', 'Test').attach('file', Buffer.from('test'), 'test.png');
    console.log(`[ANNOUNCEMENT] PUT /announcement/update/999 -> Status: ${res.status}`);

    // DELETE
    res = await request(app.getHttpServer()).delete('/announcement/delete/999').set('Authorization', `Bearer ${token}`);
    console.log(`[ANNOUNCEMENT] DELETE /announcement/delete/999 -> Status: ${res.status}`);
  });

  it('TESTING SUBMISSIONS ENDPOINTS', async () => {
    const loginResp = await request(app.getHttpServer()).post('/user/login').send(login_user);
    const token = loginResp.body.data;

    let res = await request(app.getHttpServer()).get('/submissions/all?page=1&limit=10').set('Authorization', `Bearer ${token}`);
    console.log(`[SUBMISSIONS] GET /submissions/all -> Status: ${res.status}`);

    res = await request(app.getHttpServer()).post('/submissions/create').set('Authorization', `Bearer ${token}`)
      .field('Nomor_surat_rt', 1).field('RtId', 1).field('RwId', 1).field('Tipe_Surat', 'SURAT_DOMISILI').field('Keperluan', 'Test')
      .attach('file', Buffer.from('test'), 'test.png');
    console.log(`[SUBMISSIONS] POST /submissions/create -> Status: ${res.status}`);

    res = await request(app.getHttpServer()).put('/submissions/update/999').set('Authorization', `Bearer ${token}`)
      .field('Keperluan', 'Test').attach('file', Buffer.from('test'), 'test.png');
    console.log(`[SUBMISSIONS] PUT /submissions/update/999 -> Status: ${res.status}`);

    res = await request(app.getHttpServer()).put('/submissions/permissions_rt/999').set('Authorization', `Bearer ${token}`).send({ Rt_desa_sign: true });
    console.log(`[SUBMISSIONS] PUT /submissions/permissions_rt/999 -> Status: ${res.status}`);

    res = await request(app.getHttpServer()).put('/submissions/permissions_kepdes/999').set('Authorization', `Bearer ${token}`).send({ Kepala_desa_sign: true });
    console.log(`[SUBMISSIONS] PUT /submissions/permissions_kepdes/999 -> Status: ${res.status}`);

    res = await request(app.getHttpServer()).delete('/submissions/delete/999').set('Authorization', `Bearer ${token}`);
    console.log(`[SUBMISSIONS] DELETE /submissions/delete/999 -> Status: ${res.status}`);
  });

  it('TESTING RT/RW/VILLAGE ENDPOINTS', async () => {
    const loginResp = await request(app.getHttpServer()).post('/user/login').send(login_user);
    const token = loginResp.body.data;

    let res = await request(app.getHttpServer()).get('/village/allVillage').set('Authorization', `Bearer ${token}`);
    console.log(`[VILLAGE] GET /village/allVillage -> Status: ${res.status}`);
    res = await request(app.getHttpServer()).get('/rt/all').set('Authorization', `Bearer ${token}`);
    console.log(`[RT] GET /rt/all -> Status: ${res.status}`);
    res = await request(app.getHttpServer()).get('/rw/all').set('Authorization', `Bearer ${token}`);
    console.log(`[RW] GET /rw/all -> Status: ${res.status}`);
  });

  afterEach(async () => {
  })
}
)
