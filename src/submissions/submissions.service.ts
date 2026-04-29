import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { BufferUpload } from 'src/common/helpers/cloudinary_helper';
import { ConfigureCloudinanry } from 'src/config/cloudinary.config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubmissionsService {

    constructor(private prisma: PrismaService) { }


    async createSubmissions(data: any, user_id: number, file: Express.Multer.File) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the id data from token")

        try {

            const buffe_data_file = await BufferUpload(file.buffer, "Dokumen")

            if (!buffe_data_file && buffe_data_file == undefined || buffe_data_file == null) throw new BadRequestException("Failed to get the file!")

            const dataFile = buffe_data_file.secure_url

            const createData = await this.prisma.submissions.create({
                data: {
                    Nomor_surat_rt: data.Nomor_surat_rt,
                    UserId: user_id,
                    RtId: data.RtId,
                    RwId: data.RwId,
                    Dokumen_pengajuan: dataFile,
                    Tipe_Surat: data.Tipe_Surat,
                    Keperluan: data.Keperluan,
                    Tanggal_pengajuan: data.Tanggal_pengajuan
                }
            })

            if (!createData && createData == undefined || createData == null) throw new BadRequestException("Failed to get payload in data!")

            return createData

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}
