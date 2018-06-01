import BTFetch from './BTFetch'


// 获取data信息
export const getDataInfo = async(params)=>{
    let reqUrl = '/user/GetDataBin'
    // let params = {
    //     username:'btd352'
    // }
    return await BTFetch(reqUrl,'POST',params)
}

export const getBlockInfo = async()=>{
    let blockHeader = await BTFetch('/user/GetBlockHeader','GET')
    if(!(blockHeader && blockHeader.code==1)){
        window.message.error('block header get faild');
        return
    }
    let params = {}
    let data = blockHeader.data
    params.cursor_label = data.cursor_label
    params.cursor_num = data.head_block_num
    params.lifetime = data.head_block_time + 300
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
  let random = window.uuid()
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
  // console.log('sign', sign);
  fetchParam.signature = sign.toString('hex')
  // console.log('fetchParam.signature', fetchParam.signature);
  // fetchParam.param = param.map(s1 => int10ToStr16(s1)).join('')
  fetchParam.param = BTCryptTool.buf2hex(fetchParam.param)
  return fetchParam
}

export function BTRowFetch(url, param) {
  return BTFetch(url, 'POST', param)
  .then(res => {
    if (res) {
      if (res.code == 1) {
        // 请求成功
        let data = res.data
        if (data.row == null) {
          // 无数据
          return { row: [], total: 0, page: 0 }
        } else {
          // 有数据，驼峰命名法是为了兼容后端不统一的字段
          let total = data.row_count || data.rowCount
          let page = data.page_num || data.pageNum
          return { row: data.row, total, page }
        }
      } else {
        if (res.details) {
          let details = JSON.parse(res.details)
          console.error('details', details);
        }

        console.error('BTRowFetch error', res.details);
        let error = new Error('response error')
        error.res = res
        throw error
      }

    } else {
      console.error('请求发送失败');
      throw new Error('request fail')
    }
  })
};
