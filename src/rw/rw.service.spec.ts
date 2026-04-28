import { Test, TestingModule } from '@nestjs/testing';
import { RwService } from './rw.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RwService', () => {
  let service: RwService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RwService,
        {
          provide: PrismaService, useValue: {
            rw: {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          }
        }
      ],
    }).compile();

    service = module.get<RwService>(RwService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
