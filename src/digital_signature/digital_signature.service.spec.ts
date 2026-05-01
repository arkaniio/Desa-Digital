import { Test, TestingModule } from '@nestjs/testing';
import { DigitalSignatureService } from './digital_signature.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DigitalSignatureService', () => {
  let service: DigitalSignatureService;

  const mockPrisma = {
    digital_Signature: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    submissions: {
      update: jest.fn(),
    },
    $transaction: jest.fn((fn) => fn(mockPrisma)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DigitalSignatureService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DigitalSignatureService>(DigitalSignatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
