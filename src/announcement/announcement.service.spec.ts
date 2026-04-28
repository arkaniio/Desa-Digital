import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementService } from './announcement.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AnnouncementService', () => {
  let service: AnnouncementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnouncementService,
        {
          provide: PrismaService, useValue: {
            announcement: {
              create: jest.fn(),
              delete: jest.fn(),
            },
          }
        }
      ],
    }).compile();

    service = module.get<AnnouncementService>(AnnouncementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
