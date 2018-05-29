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

const lockTimeSecond = 10

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

class BTFavoriteStar extends Component {
  constructor(props){
      super(props)

      let loading = false
      let cs = collectionState.get(props.type, props.id)
      if (typeof cs == 'number' && getTimeSecond() - cs < lockTimeSecond) {
        loading = true
      }

      this.state = {
        loading,
        isFavorite: props.isFavorite
      }

      this.deleteFavorite = this.deleteFavorite.bind(this)
      this.addFavorite = this.addFavorite.bind(this)
  }

  lockCollect(t) {
    // 锁定收藏按钮，不让用户连续点击
    this.setState({ loading: true });
    const { type, id } = this.props
    // 设置
    collectionState.set(type, id)

    this.timeKey = setTimeout(() => {
      if (this && this.setState) {
        this.setState({ loading: false });
      }
      collectionState.delete(type, id)
    }, t * 1000);

  }

  addFavorite(e) {
    this.toggleFavorite('add')
  }

  deleteFavorite(e) {
    this.toggleFavorite('delete')
  }

  async toggleFavorite(method) {

    message.destroy();
    if (!getAccount()) {
      message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
      return;
    }

    var OpType = 1
    if (method == 'delete') {
      OpType = 3
    }

    // packmsg
    let favoriteParam = {
      "Username": getAccount().username,
      "GoodsId": this.props.id,
      "GoodsType": this.props.type,
      OpType
    }

    this.lockCollect(lockTimeSecond)

    let fetchParam = await getFavReqParam(favoriteParam)
    // console.log('fetchParam', fetchParam);

    BTFetch('/user/favorite', 'post', fetchParam)
    .then(res => {
      if (!res || res.code != 1) {
        throw new Error('')
      }
      if (OpType == 1) {
        window.message.success(window.localeInfo["Asset.SuccessfulCollect"])
        this.setState({isFavorite: true})
      } else {
        window.message.success(window.localeInfo["Asset.DeleteCollect"])
        this.setState({isFavorite: false})

      }
    })
    .catch(err => {
      if (OpType == 1) {
        window.message.error(window.localeInfo["Asset.FailedCollect"])
      } else {

      }
      console.error('err', err);
    })

  }

  componentWillUnmount() {
    if (this.timeKey) {
      clearTimeout(this.timeKey)
    }
  }

  render() {
    if (this.state.loading) {
      return <Icon type="loading" />
    } else if (this.state.isFavorite) {
      return <Icon type="star" onClick={this.deleteFavorite} />
    } else {
      return <Icon type="star-o" onClick={this.addFavorite} />;
    }
  }

}

BTFavoriteStar.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['asset', 'requirement']),
  isFavorite: PropTypes.bool,
};

export default BTFavoriteStar;
