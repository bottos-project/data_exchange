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
import * as BTProto from '../proto/index'
import * as BTPack from '../msgpack/msgpack'
import * as BTCrypto from 'bottos-crypto-js'

export const messageSign = (msg,privateKey)=>{
    let message_pb = require('../proto/message_pb')
    let msgProto = BTProto.messageProtoEncode(message_pb,msg)
    let hash = BTCrypto.sha256(BTCrypto.buf2hex(msgProto))
    console.log({hash})
    return BTCrypto.sign(hash,privateKey)
}
