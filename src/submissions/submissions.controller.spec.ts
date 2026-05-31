import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { CreateSubmissionDto, UpdateSubmissionsDto, UpdateRtSignSubmissions, UpdateKepalaDesaSignSubmissions } from './dto/submissions.dto';

describe('SubmissionsController', () => {
  let controller: SubmissionsController;
  let service: SubmissionsService;

  const mockSubmissionsService = {
    getAllSubmissions: jest.fn(),
    createSubmissions: jest.fn(),
    updateSubmissions: jest.fn(),
    deleteSubmissions: jest.fn(),
    updateSubmissionsWithRt: jest.fn(),
    updateSubmissionsWithKepalaDesa: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionsController],
      providers: [
        {
          provide: SubmissionsService,
          useValue: mockSubmissionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SubmissionsController>(SubmissionsController);
    service = module.get<SubmissionsService>(SubmissionsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSubmissions', () => {
    it('should call service.getAllSubmissions', async () => {
      mockSubmissionsService.getAllSubmissions.mockResolvedValue({ data: [] });
      const query = { page: 1, limit: 10 };

      const result = await controller.getAllSubmissions(101, query);

      expect(result).toEqual({ data: [] });
      expect(service.getAllSubmissions).toHaveBeenCalledWith(101, query);
    });
  });

  describe('createSubmissions', () => {
    it('should call service.createSubmissions', async () => {
      const mockDto = {} as CreateSubmissionDto;
      const mockFile = {} as Express.Multer.File;
      mockSubmissionsService.createSubmissions.mockResolvedValue({ id: 1 });

      const result = await controller.createSubmissions(mockDto, 101, mockFile);

      expect(result).toEqual({ id: 1 });
      expect(service.createSubmissions).toHaveBeenCalledWith(mockDto, 101, mockFile);
    });
  });

  describe('updateSubmissions', () => {
    it('should call service.updateSubmissions', async () => {
      const mockDto = {} as UpdateSubmissionsDto;
      const mockFile = {} as Express.Multer.File;
      mockSubmissionsService.updateSubmissions.mockResolvedValue(true);

      const result = await controller.updateSubmissions(mockDto, 1, 101, mockFile);

      expect(result).toBe(true);
      expect(service.updateSubmissions).toHaveBeenCalledWith(mockDto, 1, 101, mockFile);
    });
  });

  describe('deleteSubmissions', () => {
    it('should call service.deleteSubmissions', async () => {
      mockSubmissionsService.deleteSubmissions.mockResolvedValue(true);

      const result = await controller.deleteSubmissions(1, 101);

      expect(result).toBe(true);
      expect(service.deleteSubmissions).toHaveBeenCalledWith(101, 1);
    });
  });

  describe('updateSubmissionsWithRt', () => {
    it('should call service.updateSubmissionsWithRt', async () => {
      const mockDto = { Rt_desa_sign: true } as UpdateRtSignSubmissions;
      mockSubmissionsService.updateSubmissionsWithRt.mockResolvedValue(true);

      const result = await controller.updateSubmissionsWithRt(mockDto, 1, 102);

      expect(result).toBe(true);
      expect(service.updateSubmissionsWithRt).toHaveBeenCalledWith(102, mockDto, 1);
    });
  });

  describe('updateSubmissionsWithKepalaDesa', () => {
    it('should call service.updateSubmissionsWithKepalaDesa', async () => {
      const mockDto = { Kepala_desa_sign: true } as UpdateKepalaDesaSignSubmissions;
      mockSubmissionsService.updateSubmissionsWithKepalaDesa.mockResolvedValue(true);

      const result = await controller.updateSubmissionsWithKepalaDesa(mockDto, 1, 103);

      expect(result).toBe(true);
      expect(service.updateSubmissionsWithKepalaDesa).toHaveBeenCalledWith(103, mockDto, 1);
    });
  });
});
