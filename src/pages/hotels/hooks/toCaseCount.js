export const toCaseCount = (arg)=> {
  let last = arg.toString().split('').pop();
  if (last == 1) return ' гость'
  else if (last >= 2 && last <= 4) return ' гостя'
  else if (last >= 5 && last <= 9) return ' гостей'
  else return ' гостей'
}
