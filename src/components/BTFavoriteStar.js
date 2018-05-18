import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getBlockInfo, getDataInfo, fetchWithBlockHeader} from "@/utils/BTCommonApi";
import { Spin, Icon, message } from 'antd'
// 这个是缓存收藏信息的
import {getAccount} from "@/tools/localStore";
import collectionState, { getTimeSecond } from "@/tools/sessionStorage";
// 下面是加签的 api
import { PackArraySize, PackStr16, PackUint32 } from '@/lib/msgpack/msgpack'
const BTCryptTool = require('bottos-js-crypto')
const message_pb = require('@/lib/proto/message_pb');
const query_pb = require('@/lib/proto/query_pb')

const { messageProtoEncode, queryProtoEncode } = require('@/lib/proto/index');

const lockTimeSecond = 20

function sigName(username, privateKey) {
  let random = window.uuid
  let msg = {username,random}
  let loginProto = queryProtoEncode(query_pb, msg)
  let hash = BTCryptTool.sha256(BTCryptTool.buf2hex(loginProto))
  return BTCryptTool.sign(hash, privateKey).toString('hex')
}

function sigParam() {

}

class BTFavoriteStar extends Component {
  constructor(props){
      super(props)

      let spin = false
      let cs = collectionState.get(props.type, props.id)
      if (typeof cs == 'number' && getTimeSecond() - cs < lockTimeSecond) {
        spin = true
      }

      this.state = { spin }

      this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  toggleFavorite(e) {
    e.preventDefault()
    e.stopPropagation()

    message.destroy();
    if(!getAccount()){
        message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
        return;
    }

    // packmsg
    let favoriteParam = {
      "Username": getAccount().username,
      "GoodsId": this.props.id,
      "GoodsType": this.props.type,
      "OpType": 1,
    }

    let b1 = PackArraySize(4)
    let b2 = PackStr16(favoriteParam.Username)
    let b3 = PackStr16(favoriteParam.GoodsId)
    let b4 = PackStr16(favoriteParam.GoodsType)
    let b5 = PackUint32(favoriteParam.OpType)

    let param = [...b1,...b2,...b3,...b4,...b5]

    let privateKey = Buffer.from(getAccount().privateKey, 'hex')

    let fetchParam = {
      "version": 1,
      "sender": sigName(getAccount().username, privateKey),
      "contract": "favoritemng",
      "method": "favoritepro",
      param,
      "sig_alg": 1
    }

    let encodeBuf = messageProtoEncode(message_pb, fetchParam)
    let hashData = BTCryptTool.sha256(BTCryptTool.buf2hex(encodeBuf))
    let signatureBuffer = BTCryptTool.sign(hashData, privateKey)

    fetchParam.signature = signatureBuffer.toString('hex')
    console.log('fetchParam', fetchParam);

    // fetchParam.param = param.map(s1 => int10ToStr16(s1)).join('')
    //
    // this.lockCollect(20)
    //
    // fetchWithBlockHeader('/user/favorite', 'post', favoriteParam).then(res => {
    //     if (res.code == 1) {
    //         message.success(window.localeInfo["Asset.SuccessfulCollect"])
    //     } else {
    //         message.error(window.localeInfo["Asset.FailedCollect"])
    //     }
    // })

  }

  render() {
    return (
      <a>{
        this.state.spin ?
        <Spin size="small" />
        :
        <Icon type="star-o" onClick={this.toggleFavorite} />
      }</a>
    )
  }

}

BTFavoriteStar.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['asset', 'requirement']),
};

export default BTFavoriteStar;
