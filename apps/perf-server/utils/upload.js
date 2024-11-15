import { finished } from 'stream/promises'
import { getError } from './errorCodes'
import fs from 'fs'
import path from 'path'


const upload = async (file, details) => {
    const basePath = path.resolve('./storage')

    if (!fs.existsSync(basePath)) {
        fs.mkdir(basePath, (err) => {
            if (err)
                return getError('UPLOAD_DIR_CREATE_ERROR')
        })
    }

    const input = await file
    const { createReadStream, filename, mimetype, encoding } = input.file
    const stream = createReadStream()
    const out = fs.createWriteStream(`${basePath}/${filename}`)

    stream.pipe(out)
    await finished(out)

    return { filename, mimetype, encoding, ...details }
}

export { upload }