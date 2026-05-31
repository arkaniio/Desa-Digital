// 1. Mock Cloudinary Helper in Node require.cache BEFORE importing any service or controller
const path = require('path');
const cloudinaryHelperPath = path.resolve(__dirname, './src/common/helpers/cloudinary_helper.ts');

require.cache[cloudinaryHelperPath] = {
  id: cloudinaryHelperPath,
  filename: cloudinaryHelperPath,
  loaded: true,
  exports: {
    BufferUpload: async (fileBuffer: any, name_folder: string) => {
      console.log(`   [Mock Cloudinary] BufferUpload called for folder: ${name_folder}`);
      return { secure_url: 'https://cloudinary.com/document.pdf' };
    }
  }
} as any;

// 2. Now safely import the controller, service and NestJS exceptions
import { SubmissionsService } from './src/submissions/submissions.service';
import { SubmissionsController } from './src/submissions/submissions.controller';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

// Simple assertion helper
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runTests() {
  console.log('==================================================');
  console.log('STARTING SUBMISSIONS ENDPOINTS & SERVICES VERIFICATION');
  console.log('==================================================\n');

  // 3. Setup Mock Prisma Service
  const mockPrisma: any = {
    submissions: {
      create: async (args: any) => {
        console.log('   [Mock Prisma] create called with:', JSON.stringify(args.data));
        return {
          id: 1,
          Nomor_surat_rt: args.data.Nomor_surat_rt,
          SenderId: args.data.SenderId,
          RtId: args.data.RtId,
          RwId: args.data.RwId,
          Dokumen_pengajuan: args.data.Dokumen_pengajuan,
          Tipe_Surat: args.data.Tipe_Surat,
          Keperluan: args.data.Keperluan,
          Tanggal_pengajuan: args.data.Tanggal_pengajuan,
        };
      },
      delete: async (args: any) => {
        console.log('   [Mock Prisma] delete called with:', JSON.stringify(args.where));
        if (args.where.id === 999) {
          return null; // Simulate not found
        }
        return { id: args.where.id };
      },
      update: async (args: any) => {
        console.log('   [Mock Prisma] update called with:', JSON.stringify(args));
        return { id: args.where.id, ...args.data };
      },
      findMany: async (args: any) => {
        console.log('   [Mock Prisma] findMany called with:', JSON.stringify(args));
        return [
          {
            id: 1,
            Nomor_surat_rt: 123,
            Keperluan: 'Kerja',
            Rt_desa_sign: false,
            Kepala_desa_sign: false,
          },
        ];
      },
      count: async (args: any) => {
        console.log('   [Mock Prisma] count called with:', JSON.stringify(args));
        return 1;
      },
    },
  };

  // 4. Instantiate Service & Controller
  const service = new SubmissionsService(mockPrisma);
  const controller = new SubmissionsController(service);

  // Mock Multer File
  const dummyFile = {
    buffer: Buffer.from('test-file'),
    fieldname: 'file',
    originalname: 'document.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 100,
    stream: null as any,
    destination: '',
    filename: '',
    path: '',
  } as Express.Multer.File;

  let totalTests = 0;
  let passedTests = 0;

  async function testCase(name: string, fn: () => Promise<void>) {
    totalTests++;
    console.log(`Testing: ${name}...`);
    try {
      await fn();
      passedTests++;
      console.log(`--> SUCCESS ✅\n`);
    } catch (err: any) {
      console.error(`--> FAILED ❌ (${err.message})\n`);
    }
  }

  // ---------------------------------------------------------------------------
  // TEST 1: Service - createSubmissions
  // ---------------------------------------------------------------------------
  await testCase('Service - createSubmissions [SUCCESS PATH]', async () => {
    const payload = {
      Nomor_surat_rt: '123',
      RtId: '1',
      RwId: '2',
      Tipe_Surat: 'SURAT_DOMISILI',
      Keperluan: 'Mengurus KTP baru',
    };
    const res = await service.createSubmissions(payload, 99, dummyFile);
    assert(res.id === 1, 'Should return created submission id');
    assert(res.SenderId === 99, 'SenderId should match authenticated user_id');
    assert(res.Nomor_surat_rt === 123, 'Nomor_surat_rt should be cast to a number');
  });

  await testCase('Service - createSubmissions [UNAUTHORIZED PATH]', async () => {
    const payload = { Nomor_surat_rt: '123' };
    try {
      await service.createSubmissions(payload, null as any, dummyFile);
      assert(false, 'Should have thrown UnauthorizedException');
    } catch (e: any) {
      assert(e instanceof UnauthorizedException, 'Should throw UnauthorizedException');
    }
  });

  // ---------------------------------------------------------------------------
  // TEST 2: Service - getAllSubmissions
  // ---------------------------------------------------------------------------
  await testCase('Service - getAllSubmissions [SUCCESS PATH]', async () => {
    const res = await service.getAllSubmissions(99, { page: 1, limit: 10 });
    assert(res.data.length === 1, 'Should return exactly 1 item');
    assert(res.meta.total === 1, 'Meta total should be 1');
  });

  // ---------------------------------------------------------------------------
  // TEST 3: Service - updateSubmissions
  // ---------------------------------------------------------------------------
  await testCase('Service - updateSubmissions [SUCCESS PATH]', async () => {
    const payload = { Keperluan: 'Pindah Domisili Baru' };
    const res = await service.updateSubmissions(payload, 1, 99, dummyFile);
    assert(res === true, 'Update should return true');
  });

  // ---------------------------------------------------------------------------
  // TEST 4: Service - deleteSubmissions
  // ---------------------------------------------------------------------------
  await testCase('Service - deleteSubmissions [SUCCESS PATH]', async () => {
    const res = await service.deleteSubmissions(99, 1);
    assert(res === true, 'Delete should return true');
  });

  // ---------------------------------------------------------------------------
  // TEST 5: Service - updateSubmissionsWithRt
  // ---------------------------------------------------------------------------
  await testCase('Service - updateSubmissionsWithRt [SUCCESS PATH]', async () => {
    const payload = { Rt_desa_sign: true };
    const res = await service.updateSubmissionsWithRt(102, payload, 1);
    assert(res === true, 'Signing should return true');
  });

  await testCase('Service - updateSubmissionsWithRt [FAILURE PATH - INVALID KEY]', async () => {
    const payload = { Something_else: true };
    try {
      await service.updateSubmissionsWithRt(102, payload, 1);
      assert(false, 'Should throw BadRequestException for missing sign field');
    } catch (e: any) {
      assert(e instanceof BadRequestException, 'Should throw BadRequestException');
    }
  });

  // ---------------------------------------------------------------------------
  // TEST 6: Service - updateSubmissionsWithKepalaDesa
  // ---------------------------------------------------------------------------
  await testCase('Service - updateSubmissionsWithKepalaDesa [SUCCESS PATH]', async () => {
    const payload = { Kepala_desa_sign: true };
    const res = await service.updateSubmissionsWithKepalaDesa(103, payload, 1);
    assert(res === undefined, 'Signing should return undefined/void');
  });

  // ---------------------------------------------------------------------------
  // TEST 7: Controller Endpoints Mapping
  // ---------------------------------------------------------------------------
  await testCase('Controller - getAllSubmissions Mapping', async () => {
    const res = await controller.getAllSubmissions(99, { page: 1, limit: 10 });
    assert(res.data.length === 1, 'Should call service successfully');
  });

  await testCase('Controller - createSubmissions Mapping', async () => {
    const payload = {
      Nomor_surat_rt: 123,
      RtId: 1,
      RwId: 2,
      Tipe_Surat: 'SURAT_DOMISILI' as any,
      Keperluan: 'Test',
      Dokumen_pengajuan: 'url',
      Tanggal_pengajuan: '2026-05-31',
    };
    const res = await controller.createSubmissions(payload, 99, dummyFile);
    assert(res.id === 1, 'Should map and return successfully');
  });

  console.log('==================================================');
  console.log(`TESTING COMPLETED: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log('==================================================');
  process.exit(passedTests === totalTests ? 0 : 1);
}

runTests();
