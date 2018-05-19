export function toFixedWithoutZero(n, x) {
  if (x == undefined) {
    console.error('请输入位数 x');
    return n
  }
  let s1 = n.toString()
  if (!s1.includes('.')) {
    return n
  }
  let nArr = s1.split('.')
  let xiaoshu = nArr[1]
  if (xiaoshu.length < 7) {
    return n
  } else {
    nArr[1] = xiaoshu.slice(0, x)
    return parseFloat(nArr.join('.'))
  }
}
