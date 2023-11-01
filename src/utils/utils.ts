import { utils, writeFile, read } from 'xlsx'
import TaskData from 'interface/TaskData'
import ExcelData from 'interface/ExcelData'


const TABLE_HEADER_LIST: string[] = [
  'No.',
  '작업일',
  'LOT No.',
  '품종',
  '규격',
  '슬라브 길이',
  '중량',
]


export const TaskDataListDownloadXlsx = (taskDataList: TaskData[]) => {
  const data = taskDataList.map((taskData, index) => ({
    [TABLE_HEADER_LIST[0]]: (index + 1).toString().padStart(2, '0'),
    [TABLE_HEADER_LIST[1]]: taskData.workDate,
    [TABLE_HEADER_LIST[2]]: taskData.lotNo,
    [TABLE_HEADER_LIST[3]]: taskData.variety,
    [TABLE_HEADER_LIST[4]]: taskData.standard,
    [TABLE_HEADER_LIST[5]]: taskData.length,
    [TABLE_HEADER_LIST[6]]: taskData.weight,
  }))

  const excelHandler = {
    getExcelFileName: () => {
      return '작업 데이터.xlsx'
    },
    getSheetName: () => {
      return '작업 데이터'
    },
    getExcelData: () => {
      return data
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


export const TaskDataListUploadXlsx = (
  event: React.ChangeEvent<HTMLInputElement>,
  date: string,
  setTaskDataDateList: (taskDataList: TaskData[]) => void,
) => {
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
    const data: ExcelData[] = utils.sheet_to_json<ExcelData>(rawData)
    const taskDataList: TaskData[] = data.map(taskData => ({
      workDate: taskData['작업일'],
      lotNo: taskData['LOT No.'],
      variety: taskData['품종'],
      standard: taskData['규격'],
      length: taskData['슬라브 길이'],
      weight: taskData['중량'],
    }))

    fetch(`http://localhost:8000/taskDataList/${date}`, {
      method: 'PUT',
      body: JSON.stringify(taskDataList),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((taskDataDateList: TaskData[]) => {
      setTaskDataDateList(taskDataDateList)
    }) 
  }
}
