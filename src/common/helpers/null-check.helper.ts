import { ConfigureCloudinanry } from "src/config/cloudinary.config"
import { BufferUpload } from "./cloudinary_helper"

export const CheckIsNull = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] != undefined && data[key] != null) {
                update_data[key] = data[key]
            }
        })
    }

    return update_data

}

export const CheckIsNullWitMulter = async (data: Record<string, any>, file: Express.Multer.File) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {

            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key]
            }

        })
    }

    if (file) {

        const result: any = await BufferUpload(file.buffer, "Avatar")

        update_data.Avatar = result.secure_url

    }

    return update_data

}

export const CheckIsNullAnnouncement = async (data: Record<string, any>, file: Express.Multer.File) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] != undefined && data[key] != null) {
                update_data[key] = data[key]
            }
        })
    }

    if (file) {

        const cloud_file: any = await BufferUpload(file.buffer, "Image")

        update_data.Image = cloud_file.secure_url

    }

    return update_data

}

export const CheckIsNullWithNumber = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (typeof data[key] == "number") {
                data[key] = Number(update_data[key])
            }
            data[key] = update_data[key]
        })
    }

    return update_data

}
