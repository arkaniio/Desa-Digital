import { Buffer } from 'buffer';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Result } from 'pg';
import { ConfigureCloudinanry } from '../../config/cloudinary.config';
import * as streamifier from 'streamifier';

export const BufferUpload = (fileBuffer: Buffer, name_folder: string): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {

        const config_cloud = ConfigureCloudinanry()

        const stream = config_cloud.uploader.upload_stream(
            { folder: name_folder },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (result) resolve(result);
                else reject(error);
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });

};