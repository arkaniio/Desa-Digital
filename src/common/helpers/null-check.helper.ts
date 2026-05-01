import { isBoolean } from "class-validator"
import { BufferUpload } from "./cloudinary_helper.js"

export const CheckIsNull = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key]
            }
        })
    }

    return update_data

}

export const CheckIsNullWithBooleanAndNumber = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                if (typeof data[key] === "string" && data[key].trim() !== "" && !isNaN(Number(data[key]))) {
                    update_data[key] = Number(data[key])
                } else if (data[key] === "true" || data[key] === "false") {
                    update_data[key] = data[key] === "true"
                } else {
                    update_data[key] = data[key]
                }
            }
        })
    }

    return update_data

}

export const CheckIsNullWitMulterAvatar = async (data: Record<string, any>, file: Express.Multer.File, file_name: string) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {

            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key]
            }

        })
    }

    if (file) {

        const result: any = await BufferUpload(file.buffer, file_name)

        update_data.Avatar = result.secure_url

    }

    return update_data

}

export const CheckIsNullWitMulterDokumen = async (data: Record<string, any>, file: Express.Multer.File, file_name: string) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {

            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key]
            }

        })
    }

    if (file) {

        const result: any = await BufferUpload(file.buffer, file_name)

        update_data.Dokumen_pengajuan = result.secure_url

    }

    return update_data

}

export const CheckIsNullWitMulterAnnouncement = async (data: Record<string, any>, file: Express.Multer.File, file_name: string) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {

            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = data[key]
            }

        })
    }

    if (file) {

        const result: any = await BufferUpload(file.buffer, file_name)

        update_data.Image = result.secure_url

    }

    return update_data
}


export const CheckIsNullWithNumber = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] !== undefined && data[key] !== null) {
                update_data[key] = typeof data[key] === "string" && !isNaN(Number(data[key]))
                    ? Number(data[key])
                    : data[key]
            }
        })
    }

    return update_data

}
