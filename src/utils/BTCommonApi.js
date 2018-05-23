import BTFetch from './BTFetch'


// 获取data信息
export const getDataInfo = async(params)=>{
    let reqUrl = '/user/GetDataBin'
    // let params = {
    //     username:'btd352'
    // }
    return await BTFetch(reqUrl,'POST',params)
}

export const fetchWithBlockHeader = async(url,method,params,options)=>{
    let blockHeader = await BTFetch('/user/GetBlockHeader','GET')
    if(!(blockHeader && blockHeader.code==1)){
        message.error('block header get faild');
        return
    }

    let data = blockHeader.data
    params.cursor_label = data.cursor_label
    params.cursor_num = data.head_block_num
    params.lifetime = data.head_block_time

    return await BTFetch(url,method,params,options)
}

export const getBlockInfo = async()=>{
    let blockHeader = await BTFetch('/user/GetBlockHeader','GET')
    if(!(blockHeader && blockHeader.code==1)){
        message.error('block header get faild');
        return
    }
    let params = {}
    let data = blockHeader.data
    params.cursor_label = data.cursor_label
    params.cursor_num = data.head_block_num
    params.lifetime = data.head_block_time
    return params
}

const { queryProtoEncode, messageProtoEncode } = require('@/lib/proto/index');
const query_pb = require('@/lib/proto/query_pb')
const message_pb = require('@/lib/proto/message_pb')
const BTCryptTool = require('bottos-js-crypto')

export function getSignaturedParam({username, privateKey}) {
  if (typeof username != 'string' || typeof privateKey != 'string') {
    console.error('type error');
  }
  let random = window.uuid
  let msg = {username,random}
  let loginProto = queryProtoEncode(query_pb, msg)
  let hash = BTCryptTool.sha256(BTCryptTool.buf2hex(loginProto))
  let signature = BTCryptTool.sign(hash, Buffer.from(privateKey, 'hex')).toString('hex')
  return {username,signature,random}
}

export function getSignaturedFetchParam({fetchParam, privateKey}) {
  let encodeBuf = messageProtoEncode(message_pb, fetchParam)
  let hashData = BTCryptTool.sha256(BTCryptTool.buf2hex(encodeBuf))
  let sign = BTCryptTool.sign(hashData, privateKey)
  fetchParam.signature = sign.toString('hex')
  // fetchParam.param = param.map(s1 => int10ToStr16(s1)).join('')
  fetchParam.param = BTCryptTool.buf2hex(fetchParam.param)
  return fetchParam
}
