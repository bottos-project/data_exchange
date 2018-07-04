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
// import keystore from 'bottos-crypto-js/lib/keystore'
const keystore = require('bottos-crypto-js/lib/keystore');

import { get_ms_short } from './utils/dateTimeFormat'

let t1 = 0;

function createKeystore({account, password, privateKey}) {
  let keystoreObj = keystore.create({account, password, privateKey})
  console.log('keystoreObj', keystoreObj);
  console.log('keys time2', get_ms_short() - t1 );
  postMessage(keystoreObj);
}

function decryptKeystore(data) {
  let privateKey = keystore.recover(data.password, data.keyStoreObj).toString('hex')
  console.log('keys time2', get_ms_short() - t1 );
  postMessage({
    error:null,
    privateKey
  });
}

onmessage = function(e) {
  console.log('Message received from main script', e.data);
  // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  t1 = get_ms_short()
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
