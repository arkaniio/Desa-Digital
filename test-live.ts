const request = require('supertest');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function runTests() {
  console.log("Booting Nest Application for E2E Tests...");
  let app;
  try {
    app = await NestFactory.create(AppModule);
    await app.init();
  } catch (e) {
    console.error("Failed to start app. Please ensure database is running and environment variables are set.", e);
    process.exit(1);
  }

  const server = app.getHttpServer();

  let passed = 0;
  let failed = 0;
  let success = 0;
  const failList: string[] = [];

  try {
    console.log("Attempting Login as Super Admin/User...");
    const loginRes = await request(server).post('/user/login').send({
      Email: "lalufirdausmuhardika@gmail.com",
      Password: "dika123"
    });
    
    if (loginRes.status !== 201 && loginRes.status !== 200) {
      console.log("LOGIN FAILED! Status:", loginRes.status, "Body:", loginRes.body);
      console.log("Cannot proceed with tests requiring Authentication.");
      await app.close();
      process.exit(1);
    }
    
    const token = loginRes.body.data;
    console.log("Login Successful. Starting Endpoint Tests...");
    
    const testEndpoint = async (method: string, url: string, payload: any = {}, attachFile: boolean = false) => {
        let res;
        try {
            if (method === 'GET') {
              res = await request(server).get(url).set('Authorization', `Bearer ${token}`);
            } else if (method === 'POST') {
              let req = request(server).post(url).set('Authorization', `Bearer ${token}`);
              if (attachFile) {
                req = req.field('data', JSON.stringify(payload)).attach('file', Buffer.from('test'), 'test.png');
              } else {
                req = req.send(payload);
              }
              res = await req;
            } else if (method === 'PUT') {
              let req = request(server).put(url).set('Authorization', `Bearer ${token}`);
              if (attachFile) {
                req = req.field('data', JSON.stringify(payload)).attach('file', Buffer.from('test'), 'test.png');
              } else {
                req = req.send(payload);
              }
              res = await req;
            } else if (method === 'DELETE') {
              res = await request(server).delete(url).set('Authorization', `Bearer ${token}`);
            }
            
            // We consider 200, 201 (Success) and maybe 400 (Bad Request - Validation Error) or 403 (Forbidden) as "Working Endpoints" 
            // since they successfully routed to the controller and returned logic.
            // 500 means the endpoint failed entirely (code crash / bug).
            // But the user asked for passed/failed. We will log any 500 as FAILED.
            // If it returns 200/201, it's SUCCESS.
            // If it returns 400/403/404, it's a FAIL for the operation but we will note why.
            if (res.status >= 200 && res.status < 300) {
                console.log(`✅ [PASS] ${method} ${url} -> Status: ${res.status}`);
                passed++;
                success++;
            } else {
                console.log(`❌ [FAIL] ${method} ${url} -> Status: ${res.status} | Msg: ${JSON.stringify(res.body?.message || res.body)}`);
                failed++;
                failList.push(`${method} ${url} (Status: ${res.status}, Reason: ${JSON.stringify(res.body?.message)})`);
            }
        } catch(e: any) {
            console.log(`❌ [ERROR] ${method} ${url} -> ${e.message}`);
            failed++;
            failList.push(`${method} ${url} (Error: ${e.message})`);
        }
    };

    // 1. DASHBOARD ENDPOINTS
    await testEndpoint('GET', '/dashboard');
    await testEndpoint('GET', '/dashboard/super_admin');
    await testEndpoint('GET', '/dashboard/warga');
    await testEndpoint('GET', '/dashboard/kepala_desa');
    await testEndpoint('GET', '/dashboard/rt');
    await testEndpoint('GET', '/dashboard/rw');

    // 2. SUPER ADMIN ENDPOINTS
    await testEndpoint('POST', '/admin/kepala_desa/account', { Username: 'kades123', Email: 'kades@test.com', Password: '123' });
    await testEndpoint('POST', '/admin/rw/account', { Username: 'rw123', Email: 'rw@test.com', Password: '123' });
    await testEndpoint('POST', '/admin/rt/account', { Username: 'rt123', Email: 'rt@test.com', Password: '123' });

    // 3. VILLAGE ENDPOINTS
    await testEndpoint('GET', '/village/allVillage?page=1&limit=10');
    await testEndpoint('POST', '/village/create', { Name: 'Desa Testing', Address: 'Jalan Test', Total_Population: 500, Village_Age: 10, Leader_VillageId: 1 });
    await testEndpoint('PUT', '/village/update/999', { Name: 'Desa Update' });
    await testEndpoint('DELETE', '/village/delete/999');

    // 4. RW ENDPOINTS
    await testEndpoint('GET', '/rw/all?page=1&limit=10');
    await testEndpoint('PUT', '/rw/update/999', { Name: 'RW Update' });
    await testEndpoint('DELETE', '/rw/delete/999');

    // 5. RT ENDPOINTS
    await testEndpoint('GET', '/rt/all?page=1&limit=10');
    await testEndpoint('PUT', '/rt/update/999', { Number: 5 });
    await testEndpoint('DELETE', '/rt/delete/999');

    // 6. ANNOUNCEMENT ENDPOINTS
    await testEndpoint('GET', '/announcement/all?page=1&limit=10');
    await testEndpoint('POST', '/announcement/create', { Title: 'Pengumuman 1', Content: 'Isi Pengumuman', Status: 'ACTIVE' }, true);
    await testEndpoint('PUT', '/announcement/update/999', { Title: 'Update' }, true);
    await testEndpoint('DELETE', '/announcement/delete/999');

    // 7. SUBMISSIONS ENDPOINTS
    await testEndpoint('GET', '/submissions/all?page=1&limit=10');
    await testEndpoint('POST', '/submissions/create', { Nomor_surat_rt: 123, RtId: 1, RwId: 1, Tipe_Surat: 'SURAT_DOMISILI', Keperluan: 'Urus KTP' }, true);
    await testEndpoint('PUT', '/submissions/update/999', { Keperluan: 'Urus KK' }, true);
    await testEndpoint('PUT', '/submissions/permissions_rt/999', { Rt_desa_sign: true });
    await testEndpoint('PUT', '/submissions/permissions_kepdes/999', { Kepala_desa_sign: true });
    await testEndpoint('GET', '/submissions/verify_submissions?qr=abc123xyz');
    await testEndpoint('DELETE', '/submissions/delete/999');

    console.log("\n==================================================");
    console.log("TESTING SUMMARY:");
    console.log(`Passed/Success: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log("==================================================");
    
    if (failList.length > 0) {
      console.log("\nLIST OF FAILED ENDPOINTS:");
      failList.forEach(f => console.log(`- ${f}`));
    }
    
  } finally {
    await app.close();
    process.exit(0);
  }
}

runTests();
