import { Test, TestingModule } from '@nestjs/testing';
import { VillageService } from './village.service';
import { PrismaService } from '../prisma/prisma.service';

describe('VillageService', () => {
  let service: VillageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VillageService,
        {
          provide: PrismaService, useValue: {
            village: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          }
        }
      ],
    }).compile();

    service = module.get<VillageService>(VillageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
