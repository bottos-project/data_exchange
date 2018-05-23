function isUnixTime(time) {
  // console.log('time', time);
  let _time = time.toString()
  // console.log('_time', _time);
  if (_time.length == 10 && _time.startsWith('15')) {
    return true;
  }
  return false;
}

export function getDateAndTime(dataString) {
  if (dataString == undefined) {
    return ''
  }
  if (isUnixTime(dataString)) {
    // console.log('dataString', dataString);
    dataString = dataString * 1000
  }
  var d = new Date(dataString)
  return d.toLocaleDateString() + ' ' + d.toTimeString().slice(0, 8)
}

export function get_ms_short() {
  let ms = new Date().getTime()
  return parseInt(ms.toString().slice(8))
}
