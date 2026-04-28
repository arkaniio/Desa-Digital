import { Test, TestingModule } from '@nestjs/testing';
import { IdentityService } from './identity.service';
import { PrismaService } from '../prisma/prisma.service';

describe('IdentityService', () => {
  let service: IdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityService,
        {
          provide: PrismaService, useValue: {
            identityMember: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          }
        }
      ],
    }).compile();

    service = module.get<IdentityService>(IdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
