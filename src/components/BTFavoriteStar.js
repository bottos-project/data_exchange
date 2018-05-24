import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBlockInfo } from "@/utils/BTCommonApi";
import BTFetch from "@/utils/BTFetch";
import { Spin, Icon } from 'antd'
// 这个是缓存收藏信息的
import {getAccount} from "@/tools/localStore";
import collectionState, { getTimeSecond } from "@/tools/sessionStorage";
// 下面是加签的 api
import { PackArraySize, PackStr16, PackUint32 } from '@/lib/msgpack/msgpack'
const BTCryptTool = require('bottos-js-crypto')
const message_pb = require('@/lib/proto/message_pb');
const query_pb = require('@/lib/proto/query_pb')
// import { int10ToStr16 } from '@/utils/number'

const { messageProtoEncode, queryProtoEncode } = require('@/lib/proto/index');

const lockTimeSecond = 20

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

  lockCollect(t) {
    // 锁定收藏按钮，不让用户连续点击
    this.setState({ spin: true });
    const { type, id } = this.props
    // 设置
    collectionState.set(type, id)

    this.timeKey = setTimeout(() => {
      if (this && this.setState) {
        this.setState({ spin: false });
      }
      collectionState.delete(type, id)
    }, t * 1000);

  }

  async toggleFavorite(e) {
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

    // console.log('favoriteParam', favoriteParam);

    let b1 = PackArraySize(4)
    let b2 = PackStr16(favoriteParam.Username)
    let b3 = PackUint32(favoriteParam.OpType)
    let b4 = PackStr16(favoriteParam.GoodsType)
    let b5 = PackStr16(favoriteParam.GoodsId)

    let param = [...b1,...b2,...b3,...b4,...b5]

    // console.log('param', param);

    let privateKey = Buffer.from(getAccount().privateKey, 'hex')
    // console.log('privateKey', privateKey);

    let blockInfo = await getBlockInfo()

    let fetchParam = {
      "version": 1,
      ...blockInfo,
      // "sender": sigName(getAccount().username, privateKey),
      "sender": getAccount().username,
      "contract": "favoritemng",
      "method": "favoritepro",
      param,
      "sig_alg": 1
    }

    let encodeBuf = messageProtoEncode(message_pb, fetchParam)
    let hashData = BTCryptTool.sha256(BTCryptTool.buf2hex(encodeBuf))
    let signatureBuffer = BTCryptTool.sign(hashData, privateKey)

    fetchParam.signature = signatureBuffer.toString('hex')
    // console.log('fetchParam', fetchParam);

    // fetchParam.param = param.map(s1 => int10ToStr16(s1)).join('')
    fetchParam.param = BTCryptTool.buf2hex(param)

    this.lockCollect(20)

    BTFetch('/user/favorite', 'post', fetchParam).then(res => {
      if (res.code == 1) {
        window.message.success(window.localeInfo["Asset.SuccessfulCollect"])
      } else {
        window.message.error(window.localeInfo["Asset.FailedCollect"])
      }
    })

  }

  componentWillUnmount() {
    if (this.timeKey) {
      clearTimeout(this.timeKey)
    }
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
