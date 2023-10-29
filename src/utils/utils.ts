import dayjs from 'dayjs'
import { utils, writeFile, read } from 'xlsx'
import { TaskDataClient } from 'interface/TaskData'
import ExcelData from 'interface/ExcelData'


export const TaskDataListDownloadXlsx = (
  taskDataTitleList: string[],
  taskDataList: TaskDataClient[]
) => {
  const data = taskDataList.map((taskData, index) => ({
    [taskDataTitleList[0]]: (index + 1).toString().padStart(2, '0'),
    [taskDataTitleList[1]]: taskData.workDate.format('YYYY-MM-DD'),
    [taskDataTitleList[2]]: taskData.lotNo,
    [taskDataTitleList[3]]: taskData.variety,
    [taskDataTitleList[4]]: taskData.standard,
    [taskDataTitleList[5]]: taskData.length,
    [taskDataTitleList[6]]: taskData.weight,
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


export const TaskDataListUploadXlsx = (event: React.ChangeEvent<HTMLInputElement>, setTaskDataListByList: (taskDataList: TaskDataClient[]) => void) => {
  if (!event.target.files) return
  
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
    const taskDataList: TaskDataClient[] = data.map((taskData) => ({
      workDate: dayjs(taskData['작업일']),
      lotNo: taskData['LOT No.'],
      variety: taskData['품종'],
      standard: taskData['규격'],
      length: taskData['슬라브 길이'],
      weight: taskData['중량'],
    }))
    setTaskDataListByList(taskDataList)
  }
}
