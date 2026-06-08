import { FileInterceptor } from "@nestjs/platform-express";

export const FileInterceptorTools = FileInterceptor("file", {
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes("image")) {
            return cb(new Error("Failed to detect an image has been invalid!"), false)
        }
        return cb(null, true)
    }
}
)