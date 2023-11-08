import { utils, writeFile, read } from 'xlsx'
import ExcelData from 'interface/ExcelData'
import MeltingExcelData from 'interface/MeltingExcelData'
import MeltingTableData from 'interface/MeltingTableData'


export const MeltingDataConverter = (excelData: MeltingExcelData[]): MeltingTableData[] => {
  return excelData.map(meltingData => ({
    id: meltingData['ID'],
    workDate: meltingData['작업일'],
    lotNo: meltingData['LOT No.'],
    variety: meltingData['품종'],
    standard: meltingData['규격'],
    length: meltingData['슬라브 길이'],
    weight: meltingData['중량'],
  }))
}


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


export const TableDataListUploadXlsx = <TableDataType, ExcelDataType>(
  event: React.ChangeEvent<HTMLInputElement>,
  date: string,
  setTableDataDateList: (tableDataList: TableDataType[]) => void,
  dataConverter: (excelData: ExcelDataType[]) => TableDataType[]
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
    const data: ExcelDataType[] = utils.sheet_to_json<ExcelDataType>(rawData)
    const tableDataList: TableDataType[] = dataConverter(data)

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
