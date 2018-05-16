const node_uuid = require('node-uuid')
const eventName = require('../src/utils/EventName')

global.electron = require('electron')
global.uuid = node_uuid.v1().replace(/-/g,'');
global.eventName = eventName;

var createHash = require('crypto').createHash

const fs = require('fs');

global.sha256Chunk = (filePath, start, end, chunk) => {
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(filePath, { start, end });
    var hash = createHash('sha256')
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

// be83db9f7fd045e3cf272f3d02ab9641a2fc52009a62c84182015e0a5077dc30
