import { keystore } from 'bottos-js-crypto'

import { get_ms_short } from './utils/dateTimeFormat'


function createKeystore(data) {
  let keystoreObj = keystore.create(data)
  console.log('keystoreObj', keystoreObj);
  // console.log('keys time2', get_ms_short() - t1 );
  postMessage(keystoreObj);
}

function decryptKeystore(data) {
  try {
      let privateKey = keystore.recover(data.password, data.keyStoreObj).toString('hex')
      postMessage({
          error:null,
          privateKey
      });
  } catch(error) {
      postMessage({ error })
  }
}

onmessage = function(e) {
  console.log('Message received from main script', e.data);
  // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  let t1 = get_ms_short()
  // console.log('Posting message back to main script', t1);
  //
  // let keys = BTCryptTool.createPubPrivateKeys()
  // console.log('keys', keys);

  // BTIpcRenderer
  console.log('keystore', keystore);
  const { type, data } = e.data
  switch (type) {
    case 'createKeystore':
      createKeystore(data)
      break;
    case 'decryptKeystore':
      decryptKeystore(data)
      break;
    default:
  }
}
