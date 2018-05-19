
export function getDateAndTime(dataString) {
  var d = new Date(dataString)
  return d.toLocaleDateString() + ' ' + d.toTimeString().slice(0, 8)
}

export function get_ms_short() {
  let ms = new Date().getTime()
  return parseInt(ms.toString().slice(8))
}
