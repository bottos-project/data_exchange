import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBlockInfo, getSignaturedFetchParam } from "@/utils/BTCommonApi";
import BTFetch from "@/utils/BTFetch";
import { Spin, Icon } from 'antd'
// 这个是缓存收藏信息的
import {getAccount} from "@/tools/localStore";
import collectionState, { getTimeSecond } from "@/tools/sessionStorage";
// 下面是加签的 api
import { favoritePack } from '@/lib/msgpack/BTPackManager'

const { messageProtoEncode, queryProtoEncode } = require('@/lib/proto/index');

export async function getFavReqParam(favoriteParam) {

  let param = favoritePack(favoriteParam)
  // console.log('param', param);
  let blockInfo = await getBlockInfo()

  let fetchParam = {
    "version": 1,
    ...blockInfo,
    "sender": getAccount().username,
    "contract": "favoritemng",
    "method": "favoritepro",
    param,
    "sig_alg": 1
  }

  let privateKey = Buffer.from(getAccount().privateKey, 'hex')
  // console.log('privateKey', privateKey);

  return getSignaturedFetchParam({fetchParam, privateKey})
}

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

    this.lockCollect(20)

    let fetchParam = await getFavReqParam(favoriteParam)
    // console.log('fetchParam', fetchParam);

    BTFetch('/user/favorite', 'post', fetchParam)
    .then(res => {
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
    if (this.state.spin) {
      return <Spin size='large' />
    } else {
      return <Icon type="star-o" onClick={this.toggleFavorite} />;
    }
  }

}

BTFavoriteStar.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['asset', 'requirement']),
};

export default BTFavoriteStar;
