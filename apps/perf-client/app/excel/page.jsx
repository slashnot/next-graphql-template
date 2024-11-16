import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import excelToJson from 'convert-excel-to-json'
XLSX.set_fs(fs);

const xlsxWrite = (filename) => {
    const workbook = XLSX.readFile(filename, {});
    const sheet = workbook.Sheets["Adults"];

    XLSX.utils.sheet_add_aoa(sheet, [
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"]
    ], { origin: 'A4' })

    // XLSX.writeFileXLSX(workbook, "./public/storage/excelSheets/excelSheet-mod.xlsx", {});
    const jsa = XLSX.utils.sheet_to_json(sheet, {});
    console.log("Write Success!!", jsa);
}

const ExcelPage = async () => {
    const filename = "./public/storage/excelSheets/excelSheet.xlsx"
    // xlsxWrite(filename)

    const result = excelToJson({ sourceFile: filename });
    console.log(result)

    return (
        <div className="excel">
            <h1 className="text-2xl text-indigo-500">Excel Workbook</h1>
        </div>
    )
}

export { ExcelPage }
export default ExcelPage