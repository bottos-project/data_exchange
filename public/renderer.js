const node_uuid = require('node-uuid')
const eventName = require('../src/utils/EventName')

global.electron = require('electron')
global.uuid = node_uuid.v1().replace(/-/g,'');
global.eventName = eventName;

var createHash = require('crypto').createHash

const fs = require('fs');

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
