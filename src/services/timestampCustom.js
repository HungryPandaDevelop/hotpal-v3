import moment from "moment";

export const timestampCustom = () => {
  return new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
export const timestampCustomDay = () => {
  return moment().format('YYYY-MM-DD');

}
export const timestampCustomDayTime = () => {
  return moment().format('YYYY-MM-DD hh:mm:ss');

}