const path = require('path');

const cloudinaryHelperPath = path.resolve(__dirname, './dist/src/common/helpers/cloudinary_helper.js');
require.cache[cloudinaryHelperPath] = {
  id: cloudinaryHelperPath,
  filename: cloudinaryHelperPath,
  loaded: true,
  exports: {
    BufferUpload: async () => ({ secure_url: 'https://mock.com/image.png' })
  }
};

const { SubmissionsController } = require('./dist/src/submissions/submissions.controller.js');
const { SubmissionsService } = require('./dist/src/submissions/submissions.service.js');
const { DashboardController } = require('./dist/src/dashboard/dashboard.controller.js');
const { default: DashboardService } = require('./dist/src/dashboard/dashboard.service.js');
const { AnnouncementController } = require('./dist/src/announcement/announcement.controller.js');
const { AnnouncementService } = require('./dist/src/announcement/announcement.service.js');
const { RtController } = require('./dist/src/rt/rt.controller.js');
const { RtService } = require('./dist/src/rt/rt.service.js');
const { RwController } = require('./dist/src/rw/rw.controller.js');
const { RwService } = require('./dist/src/rw/rw.service.js');
const { VillageController } = require('./dist/src/village/village.controller.js');
const { VillageService } = require('./dist/src/village/village.service.js');
const { AdminController } = require('./dist/src/super_admin/admin.controller.js');
const { AdminService } = require('./dist/src/super_admin/admin.service.js');
const { default: PasswordService } = require('./dist/src/common/services/password/password.service.js');

const mockPrisma = {
  user: {
    findUnique: async () => ({ id: 1, Username: 'admin', Role: 'SUPER_ADMIN', Email: 'admin@test.com' }),
    findFirst: async () => ({ id: 1, Username: 'admin', Role: 'SUPER_ADMIN', Email: 'admin@test.com' }),
    create: async () => ({ id: 2, Username: 'test' }),
    count: async () => 10,
    findMany: async () => []
  },
  village: {
    findUnique: async () => ({ id: 1, Name: 'Desa A' }),
    findFirst: async () => ({ id: 1, Name: 'Desa A', _count: { users: 5 } }),
    create: async () => ({ id: 1 }),
    update: async () => ({ id: 1 }),
    delete: async () => ({ id: 1 }),
    findMany: async () => [],
    count: async () => 5
  },
  rw: {
    findUnique: async () => ({ id: 1, Name: 'RW 1' }),
    findFirst: async () => ({ id: 1, Name: 'RW 1' }),
    update: async () => ({ id: 1 }),
    delete: async () => ({ id: 1 }),
    findMany: async () => [],
    count: async () => 20
  },
  rt: {
    findUnique: async () => ({ id: 1 }),
    findFirst: async () => ({ id: 1 }),
    update: async () => ({ id: 1 }),
    delete: async () => ({ id: 1 }),
    findMany: async () => [],
    count: async () => 50
  },
  announcement: {
    findUnique: async () => ({ id: 1 }),
    findFirst: async () => ({ id: 1 }),
    create: async () => ({ id: 1 }),
    update: async () => ({ id: 1 }),
    delete: async () => ({ id: 1 }),
    findMany: async () => [],
    count: async () => 10
  },
  submissions: {
    findUnique: async () => ({ id: 1 }),
    findFirst: async () => ({ id: 1, Nomor_surat_rt: 123, Rt_desa_sign: false, Kepala_desa_sign: false }),
    create: async () => ({ id: 1 }),
    update: async () => ({ id: 1 }),
    delete: async () => ({ id: 1 }),
    findMany: async () => [],
    count: async () => 5
  },
  $transaction: async (cb) => cb(mockPrisma)
};

const passwordService = { hashPassword: async () => 'hashed_pwd' };
const adminService = new AdminService(passwordService, mockPrisma);
const adminController = new AdminController(adminService);

const dashboardService = new DashboardService(mockPrisma);
const dashboardController = new DashboardController(dashboardService);

const announcementService = new AnnouncementService(mockPrisma);
const announcementController = new AnnouncementController(announcementService);

const rtService = new RtService(mockPrisma);
const rtController = new RtController(rtService);

const rwService = new RwService(mockPrisma);
const rwController = new RwController(rwService);

const villageService = new VillageService(mockPrisma);
const villageController = new VillageController(villageService);

const submissionsService = new SubmissionsService(mockPrisma);
const submissionsController = new SubmissionsController(submissionsService);

let passed = 0;
let failed = 0;
const failList = [];

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`✅ [PASS] ${name}`);
  } catch (e) {
    failed++;
    console.log(`❌ [FAIL] ${name} -> ${e.message}`);
    failList.push(`${name} (${e.message})`);
  }
}

async function runAll() {
  console.log("--- TESTING ALL ENDPOINTS EXCEPT AUTH AND USER ---");

  // Dashboard
  await test('Dashboard - superAdminDashboard', async () => await dashboardController.superAdminDashboard(1));
  await test('Dashboard - wargaDashboard', async () => await dashboardController.wargaDashboard(1, 'WARGA'));
  await test('Dashboard - kepalaDesaDashboard', async () => await dashboardController.kepalaDesaDashboard(1));
  await test('Dashboard - rtDashboard', async () => await dashboardController.rtDashboard(1));
  await test('Dashboard - rwDashboard', async () => await dashboardController.rwDashboard(1));
  
  // Super Admin
  await test('Admin - create Kepala Desa Account', async () => await adminController.createKepalaDesaAccount({ Username: 'kades', Password: '123', Email: 'e@m.com', VillageId: 1 }, 1));
  await test('Admin - create RW Account', async () => await adminController.createRwAccount({ Username: 'rw', Password: '123', Email: 'rw@m.com', RwId: 1, VillageId: 1 }, 1));
  await test('Admin - create RT Account', async () => await adminController.createRtAccount({ Username: 'rt', Password: '123', Email: 'rt@m.com', RtId: 1, VillageId: 1 }, 1));

  // Village
  await test('Village - create', async () => await villageController.createNewVillage({ Name: 'A', Address: 'B', Total_Population: 10, Village_Age: 1, Leader_VillageId: 1 }, 1));
  await test('Village - update', async () => await villageController.updateVillage({ Name: 'B' }, 1, 1));
  await test('Village - delete', async () => await villageController.deleteVillage(1, 1));

  // RW
  await test('RW - update', async () => await rwController.updateRw({ Name: 'C' }, 1, 1));
  await test('RW - delete', async () => await rwController.deleteRw(1, 1));

  // RT
  await test('RT - update', async () => await rtController.updateRt({ Number: 2 }, 1, 1));
  await test('RT - delete', async () => await rtController.deleteRt(1, 1));

  // Announcement
  const mockFile = { buffer: Buffer.from('test') };
  await test('Announcement - create', async () => await announcementController.createNewAnnouncement({ Title: 'A', Content: 'B', RwId: 1, RtId: 1, Status: 'ACTIVE' }, mockFile, 1));
  await test('Announcement - getAll', async () => await announcementController.getAllAnnouncement({ page: 1, limit: 10 }, 1, 'SUPER_ADMIN'));
  await test('Announcement - update', async () => await announcementController.updateAnnouncement({ Title: 'C' }, 1, mockFile, 1));
  await test('Announcement - delete', async () => await announcementController.deleteAnnouncement(1, 1));

  // Submissions
  await test('Submissions - create', async () => await submissionsController.createSubmissions({ Nomor_surat_rt: 1, RtId: 1, RwId: 1, Tipe_Surat: 'SURAT_DOMISILI', Keperluan: 'A' }, 1, mockFile));
  await test('Submissions - getAll', async () => await submissionsController.getAllSubmissions(1, { page: 1, limit: 10 }));
  await test('Submissions - update', async () => await submissionsController.updateSubmissions({ Keperluan: 'B' }, 1, 1, mockFile));
  await test('Submissions - permissions RT', async () => await submissionsController.updateSubmissionsWithRt({ Rt_desa_sign: true }, 1, 1));
  await test('Submissions - permissions Kepdes', async () => await submissionsController.updateSubmissionsWithKepalaDesa({ Kepala_desa_sign: true }, 1, 1));
  await test('Submissions - verify submissions QR', async () => await submissionsController.verifySubmission('abc'));
  await test('Submissions - delete', async () => await submissionsController.deleteSubmissions(1, 1));

  console.log("\n==================================================");
  console.log("TESTING SUMMARY:");
  console.log(`Passed (Success): ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log("==================================================");
  if (failList.length > 0) {
    console.log("Failed Endpoints (Errors):");
    failList.forEach(f => console.log(`- ${f}`));
  }
}

runAll();
