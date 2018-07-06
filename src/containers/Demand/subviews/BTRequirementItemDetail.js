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
import BTFetch from "../../../utils/BTFetch";
import { getBlockInfo, getSignaturedParam, getSignaturedFetchParam } from "../../../utils/BTCommonApi";
import React,{PureComponent} from 'react'
import { Carousel, Button, Tag, Input } from 'antd';
import {FormattedMessage} from 'react-intl'
import messages from '../../../locales/messages'
import BTAssetRadioGroup from './BTAssetRadioGroup'
import { getDateAndTime } from '../../../utils/dateTimeFormat'
import {getAccount} from "../../../tools/localStore";
import CloseBack from '@/components/CloseBack'
import TokenSymbol from '@/components/TokenSymbol'
import BTFavoriteStar from '@/components/BTFavoriteStar'
import { typeValueKeyMap } from '../../../utils/keyMaps'
import { PackArraySize, PackStr16, PackUint32 } from '@/lib/msgpack/msgpack'
import { BTDownloadFile } from '@/utils/BTDownloadFile'
import { selectType } from '../../../utils/keyMaps'

const DemandMessages = messages.Demand;
const ReqAndAssMessages = messages.ReqAndAss;
const { TextArea } = Input;

export default class BTRequirementItemDetail extends PureComponent{
  constructor(props){
      super(props)
      // console.log('props.location', props.location);
      this.state={
        exampledata: [],
        ...props.location.state
      }
      this.download = this.download.bind(this)
  }

  commitAsset(){
    message.destroy();
    if(!getAccount()){
        message.warning(window.localeInfo["Demand.PleaseLogInFirst"])
        return ;
    }
    this.assetListModal.setState({
        visible:true
    })
    let param = {
      ...getSignaturedParam(getAccount()),
      "pageSize": 10,
      "page_num": 1,
    };
    BTFetch('/asset/queryMyAsset', 'post', param)
      .then(res => {
          if (res.code == 1) {
              if (res.data.row_count == 0) {
                  message.warning(window.localeInfo["Demand.ThereIsNoDataForTheTimeBeing"])
                  return;
              };
              this.setState({
                  exampledata:res.data.row,
              })
          } else {
              message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
              return;
          }
      })
      .catch(error => {
          message.warning(window.localeInfo["Demand.FailedToGetTheFileResourceSet"])
      })
  }

  download() {
    let data = this.state
    console.log('data', data);
    let { sample_hash: guid, username } = data
    // console.log('guid, username', guid, username);
    BTDownloadFile(guid, username)
    .catch(e => {
      console.dir(e);
      console.error('download', e);
    })
  }

  async handleFile(asset_id) {
    message.destroy();

    if (!asset_id) {
        window.message.error(window.localeInfo["Demand.ThereIsNoAssetForTheTimeBeing"])
        return ;
    };

    let username = getAccount().username

    let requirementInfo = this.state

    let fileInfo = requirementInfo.exampledata.find(ele => ele.asset_id == asset_id)

    let originParam = {
      "dataPromoteId": window.uuid(),
      "info": {
        "userName": username,
        "assetId": asset_id,
        "dataReqId": requirementInfo.requirement_id,
        "consumer": requirementInfo.username,
        "opType": 1,
      }
    }

    let b1 = PackArraySize(2)
    let b2 = PackStr16(originParam.dataPromoteId)

    let b3 = PackArraySize(5)

    let b4 = PackStr16(originParam.info.userName)
    let b5 = PackStr16(originParam.info.assetId)
    let b6 = PackStr16(originParam.info.dataReqId)
    let b7 = PackStr16(originParam.info.consumer)
    let b8 = PackUint32(originParam.info.opType)

    let param = [...b1,...b2,...b3,...b4,...b5,...b6,...b7,...b8]
    console.log('param', param);

    let blockInfo = await getBlockInfo()

    console.log('blockInfo', blockInfo);

    let privateKey = Buffer.from(getAccount().privateKey, 'hex')

    let fetchParam = {
        "version": 1,
        ...blockInfo,
        "sender": username,
        "contract": "datadealmng",
        "method": "presale",
        "param": param,
        "sig_alg": 1
    }

    fetchParam = getSignaturedFetchParam({fetchParam, privateKey})

    BTFetch('/asset/preSaleNotice', 'post', fetchParam)
    .then(res => {
      if (!res || res.code != 1) {
        throw new Error('Failed Promote')
      }
      if (res.data != 'null') {
        this.setState({ is_presale: true });
        window.message.success(window.localeInfo["Demand.SuccessfulPromote"])
      }
    })
    .catch(err => {
      console.error('error', err);
      window.message.error(window.localeInfo["Demand.FailedPromote"])
    })
  }

  render() {
      let data = this.state
      const req_type = data.req_type || 0
      const typeValue = typeValueKeyMap[req_type]

      return (
          <div className='route-children-container route-children-bg'>
            <CloseBack />

            <div className="demandDetailBox">
                <BTAssetRadioGroup exampledata={data.exampledata} ref={(ref)=>this.assetListModal = ref} handleFile={(fileInfo)=>this.handleFile(fileInfo)}/>
                <h2 className='route-children-container-title'>
                    <FormattedMessage {...DemandMessages.DataDetails}/>
                </h2>
                <div className={"mainData " + typeValue}>
                  <div className='bt-type-svg-box'>
                    <i className={"iconfont icon-" + typeValue} />
                  </div>

                  <div className="headAndShop">
                    <h1>{data.requirement_name}</h1>
                    <BTFavoriteStar isFavorite={data.is_collection} type='requirement' id={data.requirement_id} />
                  </div>

                  <p>
                      <FormattedMessage {...DemandMessages.Publisher} />
                      {data.username}
                  </p>
                  <p>
                    <FormattedMessage {...DemandMessages.RequirementType} />
                    {selectType[data.req_type]}
                  </p>
                  <p>
                      <FormattedMessage {...DemandMessages.ExpectedPrice}/>
                      {data.price/Math.pow(10, 8)}
                      <TokenSymbol type={data.token_type} />
                  </p>
                  <p>
                      <FormattedMessage {...ReqAndAssMessages.ExpireTime}/>
                      {getDateAndTime(data.expire_time)}
                  </p>
                </div>
                <ul>
                   <li>
                     {
                       data.sample_hash
                       ?
                       <Button type="primary" onClick={this.download}>
                         <FormattedMessage {...ReqAndAssMessages.DownLoadTheSample}/>
                       </Button>
                       :
                       <Button disabled>
                         <FormattedMessage {...ReqAndAssMessages.NoSample}/>
                       </Button>
                     }
                    </li>
                    <li>
                      {
                        data.is_presale ?
                        <Button disabled>
                          <FormattedMessage {...DemandMessages.HavePromote}/>
                        </Button>
                        :
                        <Button type="primary" onClick={()=>this.commitAsset()}>
                          <FormattedMessage {...DemandMessages.ProvideTheAsset}/>
                        </Button>
                      }
                    </li>
                </ul>
                <div className="dataDescription">
                  <span>
                    <FormattedMessage {...DemandMessages.DataDescription}/>
                  </span>
                  <TextArea readOnly rows={4} defaultValue={data.description} />
                </div>
            </div>
          </div>
      )
  }
}
