import ExcelDef from './Excel.gql'
import { getError } from '@gql-app/utils/errorCodes'
import xlsx from "json-as-xlsx"
import fs from 'fs'
import path from 'path'

let data = [
    {
        sheet: "Adults",
        columns: [
            { label: "User", value: "user" }, // Top level data
            { label: "Age", value: (row) => row.age + " years" }, // Custom format
            { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Run functions
        ],
        content: [
            { user: "Andrea", age: 20, more: { phone: "11111111" } },
            { user: "Luis", age: 21, more: { phone: "12345678" } },
        ],
    },
    {
        sheet: "Children",
        columns: [
            { label: "User", value: "user" }, // Top level data
            { label: "Age", value: "age", format: '# "years"' }, // Column format
            { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
        ],
        content: [
            { user: "Manuel", age: 16, more: { phone: 9999999900 } },
            { user: "Ana", age: 17, more: { phone: 8765432135 } },
        ],
    },
]


const settings = {
    writeOptions: {
        type: "buffer",
        bookType: "xlsx",
    },
}

const Query = {
    sheets: async () => {
        const basePath = path.resolve(`./public/storage/excelSheets`)
        const filePath = path.join(basePath, "excelSheet.xlsx")
        const sheetBuffer = xlsx(data, settings)

        if (!fs.existsSync(basePath)) {
            await fs.promises.mkdir(basePath, { recursive: true }, (err) => {
                if (err) return getError('UPLOAD_DIR_CREATE_ERROR')
            })
        }

        // // Write File
        await fs.promises.writeFile(
            filePath,
            Buffer.from(sheetBuffer),
        )

        return [{ path: "/storage/excelSheets/excelSheet.xlsx" }]
    }
}

const Mutation = {}

const ExcelResolver = { Query, Mutation }
export { ExcelDef, ExcelResolver }