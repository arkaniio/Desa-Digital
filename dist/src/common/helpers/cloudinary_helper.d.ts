import { Buffer } from 'buffer';
import { UploadApiResponse } from 'cloudinary';
export declare const BufferUpload: (fileBuffer: Buffer, name_folder: string) => Promise<UploadApiResponse>;
