import { Test, TestingModule } from '@nestjs/testing';
import { RtController } from './rt.controller';
import { RtService } from './rt.service';

describe('RtController', () => {
  let controller: RtController;

  const mockRtService = {
    registerRt: jest.fn(),
    updateRt: jest.fn(),
    deleteRt: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtController],
      providers: [
        { provide: RtService, useValue: mockRtService },
      ],
    }).compile();

    controller = module.get<RtController>(RtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
