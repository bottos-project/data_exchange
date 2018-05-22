import * as BTProto from '../proto/index'
import * as BTPack from '../msgpack/msgpack'
import * as BTCrypto from 'bottos-js-crypto'

export const messageSign = (msg,privateKey)=>{
    let message_pb = require('../proto/message_pb')
    let msgProto = BTProto.messageProtoEncode(message_pb,msg)
    let hash = BTCrypto.sha256(BTCrypto.buf2hex(msgProto))
    console.log({hash})
    return BTCrypto.sign(hash,privateKey)
}
