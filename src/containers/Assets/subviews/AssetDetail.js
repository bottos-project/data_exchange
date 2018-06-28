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

const ReqAndAssMessages = messages.ReqAndAss;
const AssetMessages = messages.Asset;

// 此处样式在Demand/subviews/styles.less中控制
const { TextArea } = Input;
const confirm = Modal.confirm;

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

    grantCredit(username,blockInfo,privateKey){
      let params = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": "bottos",
        "method": "grantcredit",
        "sig_alg": 1
      }

      let did = {
        name:username,
        spender:'datadealmng',
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
            }else if(response.code==4001){
              this.calcelCredit(username,blockInfo,privateKey)
              window.message.error(window.localeInfo["Asset.InsufficientBalance"])
            }else{
              this.calcelCredit(username,blockInfo,privateKey)
              window.message.error(window.localeInfo["Asset.FailedPurchase"])
            }
          }
        }).catch(error=>{
          this.calcelCredit(username,blockInfo,privateKey)
          window.message.error(window.localeInfo["Asset.FailedPurchase"])
        })
    }

    calcelCredit(username,blockInfo,privateKey){
      let params = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": "bottos",
        "method": "cancelcredit",
        "sig_alg": 1,
      }

      let did = {
        name:username,
        spender:"datadealmng"
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

    buyButtonClick(username,blockInfo,privateKey){
      console.log("buyButtonClick")
      let originParam = {
      	"data_deal_id": window.uuid(),
      	"basic_info": {
      		"username": username,
      		"assetId": this.state.asset_id
      	}
      }

      let b1 = PackArraySize(2)
      let b2 = PackStr16(originParam.data_deal_id)

      let b3 = PackArraySize(2)

      let b4 = PackStr16(originParam.basic_info.username)
      let b5 = PackStr16(originParam.basic_info.assetId)

      let param = [...b1,...b2,...b3,...b4,...b5]

      let fetchParam = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": "datadealmng",
        "method": "buydata",
        "param": param,
        "sig_alg": 1
      }

      BTFetch('/exchange/buyAsset', 'post', getSignaturedFetchParam({fetchParam, privateKey}))
      .then(res=>{
        console.log({res})
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

                <Row>
                  <Col span={6}>
                    <FormattedMessage {...AssetMessages.AssetID}/>
                  </Col>
                  <Col span={18}>{data.asset_id}</Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <FormattedMessage {...AssetMessages.Publisher}/>
                  </Col>
                  <Col span={18}>{data.username}</Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <FormattedMessage {...AssetMessages.AssetType}/>
                  </Col>
                  <Col span={18}>
                    {arTypeKeyMap[data.asset_type]}
                  </Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <FormattedMessage {...AssetMessages.ExpectedPrice}/>
                  </Col>
                  <Col span={18}>
                    {data.price / Math.pow(10, 8)}
                    <TokenSymbol type={data.token_type} />
                  </Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <FormattedMessage {...AssetMessages.ExpireTime}/>
                  </Col>
                  <Col span={18}>{getDateAndTime(time)}</Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <FormattedMessage {...AssetMessages.FeatureTag}/>
                  </Col>
                  <Col span={18}>
                    <BTTags tags={tagsArr} />
                  </Col>
                </Row>

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
