"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const request = require('supertest');
const app_module_1 = require("./src/app.module");
const prisma_service_1 = require("./src/prisma/prisma.service");
const auth_1 = require("./src/common/auth");
const mockVillage = { id: 1, Name: 'Desa Mock', Address: 'Jl. Mock', Total_Population: 1000, Village_Age: 10, Leader_VillageId: 1 };
const mockRw = { Id: 1, Name: 'RW 01', VillageId: 1, Leader_Id: 2 };
const mockRt = { Id: 1, Number: 1, RwId: 1, VillageId: 1, Leader_Id: 3 };
const mockAnnouncement = { id: 1, Title: 'Test', Content: 'Test', Image: 'url', AuthorId: 1, RwId: 1, RtId: 1, Status: 'ACTIVE' };
const mockSubmission = { id: 1, Nomor_surat_rt: 1, SenderId: 1, RtId: 1, RwId: 1, Dokumen_pengajuan: 'url', Tipe_Surat: 'SURAT_DOMISILI', Status: 'PENDING', Keperluan: 'Test' };
const mockPrismaService = {
    user: {
        findUnique: jest.fn().mockResolvedValue({ id: 1, Role: 'SUPER_ADMIN', Username: 'admin' }),
        create: jest.fn().mockResolvedValue({ id: 2, Role: 'KEPALA_DESA' }),
    },
    village: {
        findMany: jest.fn().mockResolvedValue([mockVillage]),
        findUnique: jest.fn().mockResolvedValue(mockVillage),
        create: jest.fn().mockResolvedValue(mockVillage),
        update: jest.fn().mockResolvedValue(mockVillage),
        delete: jest.fn().mockResolvedValue(mockVillage),
    },
    rw: {
        findMany: jest.fn().mockResolvedValue([mockRw]),
        findUnique: jest.fn().mockResolvedValue(mockRw),
        update: jest.fn().mockResolvedValue(mockRw),
        delete: jest.fn().mockResolvedValue(mockRw),
    },
    rt: {
        findMany: jest.fn().mockResolvedValue([mockRt]),
        findUnique: jest.fn().mockResolvedValue(mockRt),
        update: jest.fn().mockResolvedValue(mockRt),
        delete: jest.fn().mockResolvedValue(mockRt),
    },
    announcement: {
        findMany: jest.fn().mockResolvedValue([mockAnnouncement]),
        findUnique: jest.fn().mockResolvedValue(mockAnnouncement),
        create: jest.fn().mockResolvedValue(mockAnnouncement),
        update: jest.fn().mockResolvedValue(mockAnnouncement),
        delete: jest.fn().mockResolvedValue(mockAnnouncement),
    },
    submissions: {
        findMany: jest.fn().mockResolvedValue([mockSubmission]),
        findUnique: jest.fn().mockResolvedValue(mockSubmission),
        create: jest.fn().mockResolvedValue(mockSubmission),
        update: jest.fn().mockResolvedValue(mockSubmission),
        delete: jest.fn().mockResolvedValue(mockSubmission),
        count: jest.fn().mockResolvedValue(1),
    },
    $transaction: jest.fn().mockImplementation((cb) => cb(mockPrismaService)),
};
class MockAuthGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        req.user = { userId: 1, role: 'SUPER_ADMIN' };
        return true;
    }
}
async function bootstrap() {
    const moduleFixture = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    })
        .overrideProvider(prisma_service_1.PrismaService)
        .useValue(mockPrismaService)
        .overrideGuard(auth_1.JwtAuthGuard)
        .useClass(MockAuthGuard)
        .compile();
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    await app.init();
    let passed = 0;
    let failed = 0;
    const failedEndpoints = [];
    const runTest = async (method, url, payload = {}, attachFile = false) => {
        let res;
        try {
            if (method === 'GET')
                res = await request(app.getHttpServer()).get(url);
            if (method === 'POST') {
                let req = request(app.getHttpServer()).post(url);
                if (attachFile) {
                    req = req.field('data', JSON.stringify(payload)).attach('file', Buffer.from('test'), 'test.png');
                }
                else {
                    req = req.send(payload);
                }
                res = await req;
            }
            if (method === 'PUT') {
                let req = request(app.getHttpServer()).put(url);
                if (attachFile) {
                    req = req.field('data', JSON.stringify(payload)).attach('file', Buffer.from('test'), 'test.png');
                }
                else {
                    req = req.send(payload);
                }
                res = await req;
            }
            if (method === 'DELETE')
                res = await request(app.getHttpServer()).delete(url);
            if (res.status === 200 || res.status === 201) {
                passed++;
                console.log(`[PASS] ${method} ${url} - Status: ${res.status}`);
            }
            else {
                failed++;
                console.log(`[FAIL] ${method} ${url} - Status: ${res.status} - Body: ${JSON.stringify(res.body)}`);
                failedEndpoints.push(`${method} ${url}`);
            }
        }
        catch (e) {
            failed++;
            console.log(`[ERROR] ${method} ${url} - ${e.message}`);
            failedEndpoints.push(`${method} ${url}`);
        }
    };
    console.log('--- STARTING TESTS ---');
    await runTest('GET', '/dashboard');
    await runTest('GET', '/dashboard/super_admin');
    await runTest('GET', '/dashboard/warga');
    await runTest('GET', '/dashboard/kepala_desa');
    await runTest('GET', '/dashboard/rt');
    await runTest('GET', '/dashboard/rw');
    await runTest('POST', '/admin/kepala_desa/account', { Username: 'kades', Email: 'kades@a.com', Password: '123' });
    await runTest('POST', '/admin/rw/account', { Username: 'rw', Email: 'rw@a.com', Password: '123' });
    await runTest('POST', '/admin/rt/account', { Username: 'rt', Email: 'rt@a.com', Password: '123' });
    await runTest('GET', '/village/allVillage?page=1&limit=10');
    await runTest('POST', '/village/create', { Name: 'Desa A', Address: 'Jl A', Total_Population: 100, Village_Age: 10, Leader_VillageId: 1 });
    await runTest('PUT', '/village/update/1', { Name: 'Desa B' });
    await runTest('DELETE', '/village/delete/1');
    await runTest('GET', '/rw/all?page=1&limit=10');
    await runTest('PUT', '/rw/update/1', { Name: 'RW 02' });
    await runTest('DELETE', '/rw/delete/1');
    await runTest('GET', '/rt/all?page=1&limit=10');
    await runTest('PUT', '/rt/update/1', { Number: 2 });
    await runTest('DELETE', '/rt/delete/1');
    await runTest('GET', '/announcement/all?page=1&limit=10');
    await runTest('POST', '/announcement/create', { Title: 'A', Content: 'B', Status: 'ACTIVE' }, true);
    await runTest('PUT', '/announcement/update/1', { Title: 'B' }, true);
    await runTest('DELETE', '/announcement/delete/1');
    await runTest('GET', '/submissions/all?page=1&limit=10');
    await runTest('POST', '/submissions/create', { Nomor_surat_rt: 1, RtId: 1, RwId: 1, Tipe_Surat: 'SURAT_DOMISILI', Keperluan: 'A', Tanggal_pengajuan: new Date() }, true);
    await runTest('PUT', '/submissions/update/1', { Keperluan: 'B' }, true);
    await runTest('PUT', '/submissions/permissions_rt/1', { Rt_desa_sign: true });
    await runTest('PUT', '/submissions/permissions_kepdes/1', { Kepala_desa_sign: true });
    await runTest('GET', '/submissions/verify_submissions?qr=abc');
    await runTest('DELETE', '/submissions/delete/1');
    console.log('--- TEST RESULTS ---');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success: ${passed}`);
    if (failedEndpoints.length > 0) {
        console.log('Failed Endpoints:');
        failedEndpoints.forEach(ep => console.log(`- ${ep}`));
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=test-e2e-all.js.map