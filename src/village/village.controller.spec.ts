import { Test, TestingModule } from '@nestjs/testing';
import { VillageController } from './village.controller.js';
import { VillageService } from './village.service.js';

describe('VillageController', () => {
  let controller: VillageController;

  const mockVillageService = {
    createNewVillage: jest.fn(),
    deleteVillage: jest.fn(),
    updateVillage: jest.fn(),
    getAllVillage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VillageController],
      providers: [
        { provide: VillageService, useValue: mockVillageService },
      ],
    }).compile();

    controller = module.get<VillageController>(VillageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
