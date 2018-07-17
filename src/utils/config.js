/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/

var hostname = '139.219.133.94'
// var hostname = '139.219.130.112'
// var hostname = '139.219.136.155'
// var hostname = '139.219.139.198'
// var hostname = '139.217.202.68'

var base_url = `http://${hostname}:8080/`
var service = {
  version:'v3'
}



function randowFromArray(arr) {
  console.assert(Array.isArray(arr))
  let len = arr.length
  let randomIndex = Math.floor(Math.random() * len)
  if (randomIndex == len) {
    randomIndex = len -1
  }
  // console.log('randomIndex', randomIndex);
  return arr[randomIndex];
}

function changeIP() {

  fetch(base_url + service.version + '/dashboard/GetNodeIp', {
    method: 'POST',
    contentType: 'application/json',
    body: JSON.stringify({ page_num: 1, page_size: 8})
  }).then(res => res.json()).then(res => {
    if (res.code != 1) {
      throw new Error('Failed to GetNodeIp')
    }
    // console.log('res', res);
    let data = res.data
    let IPInfoList = data.row
    // console.log('IPInfoList', IPInfoList);
    if (!IPInfoList) {
      throw new Error('IP error')
    }
    let info = randowFromArray(IPInfoList)
    // console.log('info', info);
    hostname = info.ip
    console.log('hostname', hostname);
  })

}

// changeIP()


Object.defineProperty(service, 'base_url', {
  get: function() {
    if (window.useCustomIP === true && window.hostname != undefined) {
      hostname = window.hostname
    }
    console.log('hostname', hostname);
    base_url = `http://${hostname}:8080/`
    return base_url
  },
  set: function(newValue) {
    base_url = newValue
  },
  enumerable : true,
  configurable : true
})


module.exports = {
  service,
  mock:{
    base_url:"http://192.168.9.242:8080/v3"
    // base_url:"http://192.168.9.223:8080/v3"
  }
}
