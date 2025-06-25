import * as XLSX from "xlsx";

export class ExcelUtil {
  static readExcel = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target?.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wbname = wb.SheetNames[0];

        const ws = wb.Sheets[wbname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      //   fileReader.onerror((file, error) => {
      //     reject(error);
      //   });
    });
  };
}

