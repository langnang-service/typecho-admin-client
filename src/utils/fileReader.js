import { read, utils } from 'xlsx'
export const readExcel = (file) => {
  // console.log(file);
  if (!file) return false;
  if (!/\.(xls|xlsx)$/.test(file.name)) {
    // console.log(this);
    this.$message.error("上传格式不正确，请上传xls或者xlsx格式");
    return false;
  }
  const fileReader = new FileReader();
  fileReader.onload = (ev) => {
    // console.log(ev);
    try {
      const data = ev.target.result;

      // 切换为新的调用方式
      const workbook = read(data, { type: 'binary' })
      // console.log(workbook)
      // 取第一张表
      const wsname = workbook.SheetNames[0];
      // console.log(wsname);
      // 切换为新的调用方式 生成json表格数据
      const ws = utils.sheet_to_json(workbook.Sheets[wsname]);
      // console.log(ws);

    } catch (e) {
      // console.log(e);
      return false;
    }
  }
  fileReader.readAsBinaryString(file);
}