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

const uuidv1 = require('uuid/v1');
const eventName = require('../src/utils/EventName')
const createHash = require('crypto').createHash
const fs = require('fs');

global.existsSync = fs.existsSync

global.wrapFile = function(fileInfo) {
  let data = fs.readFileSync(fileInfo.path)
  // console.log(data.buffer);
  let file = new File([data.buffer], fileInfo.name, {
    type: "application/octet-stream"
  })
  return file
}
// const path = require('path');

global.electron = require('electron')

global.uuid = () => uuidv1().replace(/-/g,'')

global.eventName = eventName;

global.sha256Chunk = (filePath, start, end, chunk) => {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const input = fs.createReadStream(filePath, { start, end });
    input.on('readable', function () {
      const data = input.read();
      if (data)
      hash.update(data);
      else {
        const s = hash.digest('hex')
        // console.log(`${s} ${filePath}`);
        resolve( {chunk, hash: s} )
      }
    })
    input.on('error', function (err) {
      reject(err)
    })
  })
}
