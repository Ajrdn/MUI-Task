import { utils, writeFile, read } from 'xlsx'
import ExcelData from 'interface/ExcelData'


export const TableDataListDownloadXlsx = (excelData: ExcelData[]): void => {
  const excelHandler = {
    getExcelFileName: () => {
      return '용해 데이터.xlsx'
    },
    getSheetName: () => {
      return '용해 데이터'
    },
    getExcelData: () => {
      return excelData
    },
    getWorksheet: () => {
      return utils.json_to_sheet(excelHandler.getExcelData())
    },
  }

  const datas = excelHandler.getWorksheet()
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, datas, excelHandler.getSheetName())
  writeFile(workbook, excelHandler.getExcelFileName())
}


export const TableDataListUploadXlsx = <TableDataType>(
  event: React.ChangeEvent<HTMLInputElement>,
  date: string,
  setTableDataDateList: (tableDataList: TableDataType[]) => void,
): void => {
  if (!event.target.files || event.target.files.length === 0) return
  
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(event.target.files[0])
  fileReader.onload = (event: ProgressEvent<FileReader>) => {
    if (!event.target) return
    const bufferArray = event.target.result
    const fileInformation = read(bufferArray, {
      type: 'buffer',
      cellText: false,
      cellDates: true,
    })
    const sheetName = fileInformation.SheetNames[0]
    const rawData = fileInformation.Sheets[sheetName]
    const tableDataList: TableDataType[] = utils.sheet_to_json<TableDataType>(rawData)

    fetch(`http://localhost:8000/taskDataList/${date}`, {
      method: 'PUT',
      body: JSON.stringify(tableDataList),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((tableDataDateList: TableDataType[]) => {
      setTableDataDateList(tableDataDateList)
    }) 
  }
}
