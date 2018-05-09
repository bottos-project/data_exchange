
export function getDateAndTime(dataString) {
  var d = new Date(dataString)
  return d.toLocaleDateString() + ' ' + d.toTimeString().slice(0, 8)
}
