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
const fs = require('fs');

function concat(files, targetFile, cb) {
  // let filePath = info.filePath
  // let fd = fs.openSync(filePath, 'w')
  // let writeStream = fs.createWriteStream(targetFile)
  // fs.appendFileSync(targetFile, data[, options])
  // fs.unlinkSync(path)

  let i = 0;
  function append() {
    let file = files[i]
    // fs.readFileSync(file)
    fs.appendFile(targetFile, fs.readFileSync(file), (err) => {
      if (err) throw err;
      // console.log('The "data to append" was appended to file!');
      fs.unlinkSync(file)
      i++
      if (i >= files.length) {
        console.log('i', i);
        return cb('success');
      } else {
        append()
      }
    });
  }

  append()

}

module.exports = concat;
