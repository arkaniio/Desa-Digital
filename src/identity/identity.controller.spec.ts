import { Test, TestingModule } from '@nestjs/testing';
import { IdentityController } from './identity.controller.js';
import { IdentityService } from './identity.service.js';

describe('IdentityController', () => {
  let controller: IdentityController;

  const mockIdentityService = {
    getAllIdentity: jest.fn(),
    registerIdentity: jest.fn(),
    deleteIdentity: jest.fn(),
    updateIdentity: jest.fn(),
    getIdentity: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        { provide: IdentityService, useValue: mockIdentityService },
      ],
    }).compile();

    controller = module.get<IdentityController>(IdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
