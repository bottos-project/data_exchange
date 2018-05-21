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

export function int10ToStr16(i10) {
  var s16 = i10.toString(16)
  // console.log('s16', s16);
  if (s16.length == 1) {
    s16 = '0' + s16
  }
  return s16
}
