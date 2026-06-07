"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubmissionsDto = exports.UpdateKepalaDesaSignSubmissions = exports.UpdateRtSignSubmissions = exports.CreateSubmissionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Tipe_Surat;
(function (Tipe_Surat) {
    Tipe_Surat["SURAT_DOMISILI"] = "SURAT_DOMISILI";
    Tipe_Surat["SURAT_USAHA"] = "SURAT_USAHA";
    Tipe_Surat["SURAT_NIKAH"] = "SURAT_NIKAH";
    Tipe_Surat["SURAT_KEMATIAN"] = "SURAT_KEMATIAN";
    Tipe_Surat["SURAT_KURANG_MAMPU"] = "SURAT_KURANG_MAMPU";
})(Tipe_Surat || (Tipe_Surat = {}));
class CreateSubmissionDto {
    Nomor_surat_rt;
    RtId;
    RwId;
    Dokumen_pengajuan;
    Tipe_Surat;
    Status;
    Keterangan_pengajuan;
    Keperluan;
    Tanggal_pengajuan;
    Tanggal_selesai;
}
exports.CreateSubmissionDto = CreateSubmissionDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSubmissionDto.prototype, "Nomor_surat_rt", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSubmissionDto.prototype, "RtId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSubmissionDto.prototype, "RwId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Dokumen_pengajuan", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Tipe_Surat),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Tipe_Surat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Keterangan_pengajuan", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Keperluan", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Tanggal_pengajuan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSubmissionDto.prototype, "Tanggal_selesai", void 0);
class UpdateRtSignSubmissions {
    Rt_desa_sign;
}
exports.UpdateRtSignSubmissions = UpdateRtSignSubmissions;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateRtSignSubmissions.prototype, "Rt_desa_sign", void 0);
class UpdateKepalaDesaSignSubmissions {
    Kepala_desa_sign;
}
exports.UpdateKepalaDesaSignSubmissions = UpdateKepalaDesaSignSubmissions;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateKepalaDesaSignSubmissions.prototype, "Kepala_desa_sign", void 0);
class UpdateSubmissionsDto extends (0, mapped_types_1.PartialType)(CreateSubmissionDto) {
}
exports.UpdateSubmissionsDto = UpdateSubmissionsDto;
//# sourceMappingURL=submissions.dto.js.map