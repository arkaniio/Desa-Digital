import { Test, TestingModule } from '@nestjs/testing';
import { RwController } from './rw.controller.js';
import { RwService } from './rw.service.js';

describe('RwController', () => {
  let controller: RwController;

  const mockRwService = {
    registerRw: jest.fn(),
    updateRw: jest.fn(),
    deleteRw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RwController],
      providers: [
        { provide: RwService, useValue: mockRwService },
      ],
    }).compile();

    controller = module.get<RwController>(RwController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
