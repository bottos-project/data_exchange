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
import BTFetch from './BTFetch'
import { hashHistory } from 'react-router'


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

const { queryProtoEncode, messageProtoEncode } = require('../lib/proto/index');
const query_pb = require('../lib/proto/query_pb')
const message_pb = require('../lib/proto/message_pb')
const BTCryptTool = require('bottos-crypto-js')

export function getSignaturedParam(account_info) {
  if (account_info == null) {
    return console.error('account_info error')
  }
  const {username, privateKey} = account_info
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
  let chainId = Buffer.from("00000000000000000000000000000000","hex")
  let newMsgProto = new Uint8Array()
  newMsgProto = [...encodeBuf,...chainId]
  let hashData = BTCryptTool.sha256(BTCryptTool.buf2hex(newMsgProto))
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


/**
 * 查找 asset 信息
 * @param {String} asset_id [description]
 */
export function lookForAsset(asset_id, account_info) {
  if (typeof asset_id != 'string' || account_info == null) {
    window.message.error(window.localeInfo["Check.QueryFailure"])
    throw new Error('Type Error')
  }
  BTFetch("/asset/queryAssetByID", "post", {
    ...getSignaturedParam(account_info),
    asset_id
  }).then(res => {
    if (!res) return ;
    if (res.code == 1 && res.data != null) {
      hashHistory.push({
        pathname: '/assets/detail',
        state: res.data
      })
    } else {
      window.message.error(window.localeInfo["Check.QueryFailure"])
    }
  })
  .catch(error=>{
    window.message.error(window.localeInfo["Check.QueryFailure"])
  })

}

/**
 * 是否包含敏感词
 * @param  {String}  text [description]
 * @return {Boolean}      [description]
 */
export function hasSensitiveWord(text) {
  if (typeof text != 'string') {
    console.error('Type Error: expected string but ', typeof text);
  }
  const censorwordsArr = window.getSensitives()
  for (let word of censorwordsArr) {
    let pattern = new RegExp(word)
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}
