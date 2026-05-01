import { Test, TestingModule } from '@nestjs/testing';
import { DigitalSignatureController } from './digital_signature.controller';
import { DigitalSignatureService } from './digital_signature.service';

describe('DigitalSignatureController', () => {
  let controller: DigitalSignatureController;

  const mockService = {
    createDigitalSignature: jest.fn(),
    updateDigitalSignature: jest.fn(),
    deleteDigitalSignature: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalSignatureController],
      providers: [
        { provide: DigitalSignatureService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<DigitalSignatureController>(DigitalSignatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
