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
import React,{PureComponent} from 'react'
import { Row, Col, Button, Tag, Modal, Input } from 'antd';
import BTFetch from '../../../utils/BTFetch'
import { getBlockInfo, getSignaturedFetchParam } from '../../../utils/BTCommonApi'
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import {getAccount} from '../../../tools/localStore'
import { getDateAndTime } from '@/utils/dateTimeFormat'
import BTFavoriteStar from '@/components/BTFavoriteStar'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import CloseBack from '@/components/CloseBack'
import TokenSymbol from '@/components/TokenSymbol'
import BTTags from '../../AssetAndRequirement/BTTags'
import { PackArraySize, PackStr16 } from '@/lib/msgpack/msgpack'
import {buyAssetGrantCreditPack,cancelAssetGrantCreditPack} from '../../../lib/msgpack/BTPackManager'
import {messageSign} from '../../../lib/sign/BTSign'
import * as BTCryptTool from 'bottos-crypto-js'
import { arTypeKeyMap, typeValueKeyMap } from '@/utils/keyMaps'
import { packedParam } from '../../../utils/pack'

const ReqAndAssMessages = messages.ReqAndAss;
const AssetMessages = messages.Asset;

// 此处样式在Demand/subviews/styles.less中控制
const { TextArea } = Input;
const confirm = Modal.confirm;

/**
 * [functionName description]
 * @param  {Object} titleMessage [description]
 * @param  {any} content      [description]
 * @return {Component}              [description]
 */
function RowItem({titleMessage, content}) {
  if (typeof titleMessage != 'object') {
    console.error('Type Error', titleMessage);
  }
  return <Row style={{marginBottom: '0.5em'}}>
    <Col span={6}><FormattedMessage {...titleMessage} /></Col>
    <Col span={18}>{content}</Col>
  </Row>
}

export default class BTAssetDetail extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.location.state,
            visible: false
        }
    }
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    showModal(e) {
      if (!getAccount()){
          message.warning(window.localeInfo["Asset.PleaseLogInFirst"])
          return;
      }
      if (this.state.username == getAccount().username) {
        message.warning(window.localeInfo["Asset.YouAreNotAllowedToBuyYourOwnAssets"])
        return;
      }
      this.setState({
        visible: true,
      });
    }

    async buySureAsset() {
      //获取区块信息
      let blockInfo = await getBlockInfo()
      let privateKey = Buffer.from(getAccount().privateKey, 'hex')
      let username = getAccount().username
      this.grantCredit(username,blockInfo,privateKey)

    }

    grantCredit(username, blockInfo, privateKey) {
      const token_type = this.props.location.state.token_type
      let params = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": token_type === "BTO" ? "bottos" : "bottostoken",
        "method": "grantcredit",
        "sig_alg": 1
      }

      let did = {
        name:username,
        spender:'datadealmng',
        token_type,
        limit:this.state.price
      }

      let arrBuf = buyAssetGrantCreditPack(did)
      params.param = arrBuf
      let sign = messageSign(params, privateKey)
      params.signature = sign.toString('hex')
      params.param = BTCryptTool.buf2hex(arrBuf)
      let url = '/exchange/GrantCredit'
      BTFetch(url,'POST',params)
        .then(response=>{
          if(response){
            if(response.code==1){
              this.buyButtonClick(username,blockInfo,privateKey)
            }else if(response.code==4001 || response.code==10105) {
              window.message.error(window.localeInfo["Asset.InsufficientBalance"])
            }else{
              window.message.error(window.localeInfo["Asset.FailedPurchase"])
            }
          }
        }).catch(error=>{
          window.message.error(window.localeInfo["Asset.FailedPurchase"])
        })
    }

    calcelCredit(username,blockInfo,privateKey){
      const token_type = this.props.location.state.token_type

      let params = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": token_type === "BTO" ? "bottos" : "bottostoken",
        "method": token_type === "BTO" ? "cancelcredit" : "deletecredit",
        "sig_alg": 1,
      }

      let did = {
        name:username,
        spender:"datadealmng",
        token_type,
      }

      let arrBuf = cancelAssetGrantCreditPack(did)
      params.param = arrBuf
      let sign = messageSign(params, privateKey)
      params.signature = sign.toString('hex')
      params.param = BTCryptTool.buf2hex(arrBuf)

      let url = '/exchange/CancelCredit'
      BTFetch(url,'POST',params)
        .then(response=>{
          console.log({response})
          if(response && response.code==1){
            console.log('取消授权成功')
          }else{
            console.log('取消授权失败')
          }
        }).catch(error=>{
          console.log({error})
        })
    }

    async buyButtonClick(username, blockInfo, privateKey){
      // console.log("buyButtonClick")
      let originParam = {
      	"dataExchangeId": window.uuid(),
      	"basic_info": {
      		"userName": username,
      		"assetId": this.state.asset_id
      	}
      }

      let b1 = PackArraySize(2)
      let b2 = PackStr16(originParam.dataExchangeId)

      let b3 = PackArraySize(2)

      let b4 = PackStr16(originParam.basic_info.userName)
      let b5 = PackStr16(originParam.basic_info.assetId)

      let param = [...b1,...b2,...b3,...b4,...b5]

      let fetchParam = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": "datadealmng",
        "method": "buydata",
        param,
        "sig_alg": 1
      }

      let params = await packedParam(originParam, fetchParam, privateKey)

      console.assert( BTCryptTool.buf2hex(param) === params.param, '不相等')

      BTFetch('/exchange/buyAsset', 'post', params)
      .then(res=>{
        if (!res) {
          throw new Error('buy asset failed')
        }
        // console.log(res);
        if (res.code == 1) {
          this.setState({ isBuy_asset_flag: true })
          window.message.success(window.localeInfo["Asset.SuccessfulPurchase"])
        } else if (res.code == 4001) {
          this.calcelCredit(username,blockInfo,privateKey)
          message.warning(window.localeInfo["Asset.InsufficientBalance"])
        } else {
          throw new Error('buy asset failed')
        }
      }).catch(err => {
        console.error('err', err);
        this.calcelCredit(username,blockInfo,privateKey)
        window.message.error(window.localeInfo["Asset.FailedPurchase"])
      })
    }

    async handleOk(){
      this.setState({
        visible: false,
      });
      message.destroy();

      this.buySureAsset()
    }

    download() {
      let { sample_hash: guid, username } = this.state;
      BTDownloadFile(guid, username)
    }

    render() {

      let data = this.state;
      const asset_type = data.asset_type || 0
      const typeValue = typeValueKeyMap[asset_type]
      let time = new Date((data.expire_time)*1000).toLocaleDateString();
      let tagsArr = data.feature_tag.split('-')

        return (
          <div className='route-children-container route-children-bg'>
            <CloseBack />
            <div className="assetDetailBox">
              <h2 className='route-children-container-title'>
                <FormattedMessage {...AssetMessages.DataDetails}/>
              </h2>
              <div className={"mainData " + typeValue}>
                <div className='bt-type-svg-box'>
                  <i className={"iconfont icon-" + typeValue} />
                </div>

                <div className="headAndShop">
                  <h1>{data.asset_name}</h1>
                  <BTFavoriteStar isFavorite={data.favorite_flag} type='asset' id={data.asset_id} />
                </div>

                <RowItem titleMessage={AssetMessages.AssetID} content={data.asset_id} />

                <RowItem titleMessage={AssetMessages.Publisher} content={data.username} />

                <RowItem titleMessage={AssetMessages.AssetType} content={arTypeKeyMap[data.asset_type]} />

                <RowItem titleMessage={AssetMessages.ExpectedPrice} content={
                  <React.Fragment>
                    {data.price / Math.pow(10, 8)}
                    <TokenSymbol type={data.token_type} />
                  </React.Fragment>
                } />

                <RowItem titleMessage={ReqAndAssMessages.ExpireTime} content={getDateAndTime(time)} />

                <RowItem titleMessage={AssetMessages.FeatureTag} content={<BTTags tags={tagsArr} />} />

              </div>

              <ul>
                  <li>
                    {data.isBuy_asset_flag ?
                      <Button disabled>
                        <FormattedMessage {...AssetMessages.HaveBought}/>
                      </Button>
                      :
                      <Button onClick={()=>this.showModal()} type="primary">
                        <FormattedMessage {...AssetMessages.BuyAssets}/>
                      </Button>
                    }
                  </li>
                  <li>
                    {
                      data.sample_hash
                      ?
                      <Button onClick={()=>this.download()} type="primary">
                        <FormattedMessage {...ReqAndAssMessages.DownLoadTheSample}/>
                      </Button>
                      :
                      <Button disabled>
                        <FormattedMessage {...ReqAndAssMessages.NoSample}/>
                      </Button>
                    }
                  </li>
              </ul>

              <Modal
                visible={this.state.visible}
                onOk={(e)=>this.handleOk(e)}
                onCancel={(e)=>this.handleCancel(e)}
                okText={<FormattedMessage {...messages.OK} />}
                cancelText={<FormattedMessage {...messages.Cancel} />}
              >
                <p>
                  <FormattedMessage {...AssetMessages.AreYouSureToBuyThisAsset}/>
                </p>
              </Modal>

              <div className="dataDescription">
                <span>
                  <FormattedMessage {...AssetMessages.DataDescription}/>
                </span>
                <TextArea readOnly rows={4} defaultValue={data.description} />
              </div>
            </div>
          </div>
        )
    }
}
