import { getError } from './errorCodes'
import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs'
import path from 'path'

const upload = async (file, details = {}, storageDir = 'storage') => {
    const { type = 'default', label } = details
    const basePath = path.resolve(`./${storageDir}/${type}`)

    // Check if dir exists and create if not
    if (!fs.existsSync(basePath)) {
        await fs.promises.mkdir(basePath, { recursive: true }, (err) => {
            if (err) return getError('UPLOAD_DIR_CREATE_ERROR')
        })
    }

    const { name, size, type: encoding } = file
    const fileArrayBuffer = await file.arrayBuffer()

    try {
        const { ext, mime } = await fileTypeFromBuffer(fileArrayBuffer)

        // Create filepath and file version
        const version = new Date().getTime()
        const fileNameArr = name.split(".")
        // Remove Extension
        fileNameArr.splice(fileNameArr.length - 1)

        const filename = label ? `${label}-${version}.${ext}` : `${fileNameArr.join('.')}-${version}`
        const filePath = path.join(basePath, filename)

        // Write File
        await fs.promises.writeFile(
            filePath,
            Buffer.from(fileArrayBuffer),
        )

        return {
            filename,
            mimetype: mime,
            encoding,
            size,
            extension: ext,
            type,
            label: label ?? "none"
        }
    } catch (error) {
        return getError('UNSUPPORTED_FILE_TYPE')
    }
}

export { upload }