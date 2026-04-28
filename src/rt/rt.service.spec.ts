import { Test, TestingModule } from '@nestjs/testing';
import { RtService } from './rt.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RtService', () => {
  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RtService,
        {
          provide: PrismaService, useValue: {
            rt: {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          }
        }
      ],
    }).compile();

    service = module.get<RtService>(RtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
