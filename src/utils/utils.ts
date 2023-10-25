import { utils, writeFile } from 'xlsx'
import TaskData from 'interface/TaskData'


export const TaskDataListDownloadXlsx = (taskDataTitleList: string[], taskDataList: TaskData[]) => {
  const data = taskDataList.map((taskData, index) => ({
    [taskDataTitleList[0]]: (index + 1).toString().padStart(2, '0'),
    [taskDataTitleList[1]]: taskData.workDate,
    [taskDataTitleList[2]]: taskData.LOTNo,
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
