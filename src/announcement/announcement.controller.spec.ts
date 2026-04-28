import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

describe('AnnouncementController', () => {
  let controller: AnnouncementController;

  const mockAnnouncementService = {
    createNewAnnouncement: jest.fn(),
    deletAnnouncement: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementController],
      providers: [
        { provide: AnnouncementService, useValue: mockAnnouncementService },
      ],
    }).compile();

    controller = module.get<AnnouncementController>(AnnouncementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
