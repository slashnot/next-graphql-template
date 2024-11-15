import { finished } from 'stream/promises'
import { getError } from './errorCodes'
import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs'
import path from 'path'


const upload = async (file, details = {}, storageDir = 'storage') => {
    const { type = 'default', label } = details
    const basePath = path.resolve(`./${storageDir}/${type}`)

    if (!fs.existsSync(basePath)) {
        await fs.promises.mkdir(basePath, { recursive: true }, (err) => {
            if (err) return getError('UPLOAD_DIR_CREATE_ERROR')
        })
    }

    const { name, size, type: encoding } = file
    const fileArrayBuffer = await file.arrayBuffer()
    const { ext, mime } = await fileTypeFromBuffer(fileArrayBuffer)

    await fs.promises.writeFile(
        path.join(basePath, label ? `${label}.${ext}` : file.name),
        Buffer.from(fileArrayBuffer),
    )

    return { filename: name, mimetype: mime, encoding, size, extension: ext, type, ...details }
}

export { upload }