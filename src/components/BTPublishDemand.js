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
import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import moment from "moment"
import { Input, DatePicker, Select, TimePicker, Radio, Icon, Button, Row, Col } from 'antd'
import BTAssetList from './BTAssetList'
import { getBlockInfo, getSignaturedParam, hasSensitiveWord } from "../utils/BTCommonApi";
import BTFetch from "../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
import {getAccount} from '../tools/localStore'
import ConfirmButton from './ConfirmButton'
import BTTypeSelect from './BTTypeSelect'
import { toFixedWithoutZero } from '@/utils/number'
import {registDemandPack} from '../lib/msgpack/BTPackManager'
import {messageSign} from '../lib/sign/BTSign'
import BTCrypto from 'bottos-crypto-js'
import BTNumberInput from './BTNumberInput'
import { packedParam } from '../utils/pack'

const PersonalDemandMessages = messages.PersonalDemand;
const PersonalAssetMessages = messages.PersonalAsset;

const { TextArea } = Input;
const Option = Select.Option;

const initialState = {
    title:"",
    textArea:"",
    number: 0,
    token_type: 'BTO',
    dateString: moment().add(7, 'days').toString(),
    timeValue: '',
    newdata: [],
    getFileNameTemp:'',
    reqType: '',
}

class BTPublishDemand extends PureComponent{
    constructor(props) {
        super(props)
        this.state = initialState

        this.onTimeChange = this.onTimeChange.bind(this)
        this.onTokenChange = this.onTokenChange.bind(this)
    }

    onTimeChange(time, timeValue) {
      this.setState({ timeValue });
    }

    onTokenChange(value) {
      // console.log('value', value);
      this.setState({ token_type: value });
    }

    commitAsset(type){

      message.destroy()

      this.assetListModal.setState({
          visible:true,
          type:type,
      });

      BTFetch('/asset/queryUploadedData', 'post', {
        ...getSignaturedParam(getAccount()),
        pageSize: 10,
        page_num: 1,
      }).then(res => {
        if (res.code == 1 && res.data.rowCount > 0) {
          this.setState({ newdata: res.data.row })
        } else {
          message.warning(window.localeInfo["Header.ThereIsNoFileResourceSetForTheTimeBeing"]);
        }
      }).catch(error => {
        message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
        console.error(error)
      })

    }

    getFileName(fileInfo){
        if(fileInfo.type=='asset'){
            this.setState({
                getFileName:fileInfo.value,
                storage_hash:fileInfo.hash,
                getRealUrl:fileInfo.getRealUrl,
            })
        }else if(fileInfo.type=='assetTemp'){
            this.setState({
                getFileNameTemp:fileInfo.value,
                sample_hash:fileInfo.hash,
                getExampleUrl:fileInfo.getExampleUrl,
            })
        }
    }

    onChangeTitle(e){
        this.setState({
            title:e.target.value.trimLeft()
        })
    }

    handleNumberChange = (e) => {
        message.destroy();
        var number = e.target.value
        if (isNaN(number)) {
          return;
        }
        if (number >= 1e7) {
          number = 1e7 - 1
        }
        if (number < 0) {
          number = 0
        }
        number = toFixedWithoutZero(number, 6)
        console.log('number', number);

        this.setState({number})
    };

    //datePicker
    onChangeDate = (date, dateString) => {
        this.setState({ dateString });
    }

    onChangeTextArea(e){
        this.setState({
            textArea:e.target.value.trimLeft()
        })
    }

    async updata(){

      const { title, textArea } = this.state

      if (!title) {
          message.warning(window.localeInfo["PersonalDemand.PleaseImproveTheDemand"])
          return;
      }

      if (hasSensitiveWord(title)) {
        message.warning(window.localeInfo["ReqAndAss.SensitiveWordsInTitle"]);
        return ;
      }


      if (this.state.number <=0 || this.state.number >= 10000000000){
          message.warning(window.localeInfo["PersonalDemand.PleaseInputPrice"])
          return;
      }

      if (this.state.reqType == '') {
        message.warning(window.localeInfo["PersonalDemand.PleaseChooseTheRequirementType"]);
        return;
      }

      if (hasSensitiveWord(textArea)) {
        message.warning(window.localeInfo["ReqAndAss.SensitiveWordsInDescription"]);
        return;
      }

      let blockInfo = await getBlockInfo()
      let account_info = this.props.account_info
      let privateKeyStr = account_info.privateKey
      let privateKey = Buffer.from(privateKeyStr,'hex')

      let params = {
        "version": 1,
        ...blockInfo,
        "sender": account_info.username,
        "contract": "datareqmng",
        "method": "datareqreg",
        "sig_alg": 1
      }

      let expire_time_string = this.state.dateString + ' ' + (this.state.timeValue ? this.state.timeValue : '')
      let expire_time = new Date(expire_time_string).getTime() / 1000

      let did = {
        "dataReqId": window.uuid(),
        "basic_info": {
          "userName": account_info.username,
          "reqName": title || 'requirement',
          "reqType": Number.parseInt(this.state.reqType) || 0,
          "featureTag": 1,
          "sampleHash": this.state.sample_hash || '',
          "expireTime": expire_time,
          "opType": 1,
          "tokenType": this.state.token_type,
          "price": this.state.number * Math.pow(10, 8),
          "favoriFlag": 1,
          "description": textArea,
        }
      }
      // console.log('did', did);

      // let packBuf = registDemandPack(did)
      // params.param = packBuf
      // let sign = messageSign(params,privateKey)
      // params.signature = sign.toString('hex')
      // let param = BTCrypto.buf2hex(packBuf)
      // console.log('params.param', params.param);

      let url = '/requirement/Publish'
      let _params = await packedParam(did, params, privateKey)

      // console.assert( _params.param === param, '不相等')

      BTFetch(url,'POST',_params)
      .then(response => {
        if (response && response.code == 1) {
          this.setState(initialState)
          message.success(window.localeInfo["PersonalDemand.SuccessfulToPublishTheDemand"]);
        } else {
          message.warning(window.localeInfo["PersonalDemand.FailedToPublishTheDemand"]);
        }
      }).catch(error => {
        message.warning(window.localeInfo["PersonalDemand.FailedToPublishTheDemand"]);
      })
    }


    render() {
        return (
          <div className="upLoadNeed route-children-bg">
            <h2 className='route-children-container-title'>
              <FormattedMessage {...PersonalDemandMessages.PublishTheDemand} />
            </h2>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalDemandMessages.DemandName} />
              </Col>
              <Col span={8}>
                <Input maxLength='126' value={this.state.title} onChange={(e)=>this.onChangeTitle(e)}  />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalDemandMessages.RecruitmentPrice}/>
              </Col>
              <Col span={8}>
                <BTNumberInput
                  defaultValue={0}
                  value={this.state.number}
                  onChange={this.handleNumberChange}
                />
              </Col>
              <Col span={4}>
                <Select onChange={this.onTokenChange} value={this.state.token_type}>
                  <Option value="BTO">BTO</Option>
                  <Option value="DTO">DTO</Option>
                </Select>
              </Col>
            </Row>

            {/* 上传样例 */}
            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.UploadTheSample}/>
              </Col>
              <Col span={18}>
                <Button type='primary'
                  examplefile={this.state.exampledata}
                  onClick={()=>this.commitAsset('assetTemp')}
                >
                  <Icon type="cloud-upload" />
                  <FormattedMessage {...PersonalAssetMessages.SetScreeningSample}/>
                </Button>
                <span className='filename'>{
                    this.state.getFileNameTemp.length<=14
                    ?
                    this.state.getFileNameTemp
                    :
                    this.state.getFileNameTemp.split('.')[0].substring(0,5)+'...'+this.state.getFileNameTemp.split('.')[1]
                }</span>
              </Col>
            </Row>

            <BTAssetList ref={(ref) => this.assetListModal = ref}
              newdata={this.state.newdata}
              handleFile={(fileName)=>this.getFileName(fileName)}
            />

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetType} />
              </Col>
              <Col span={12}>
                <BTTypeSelect value={this.state.reqType} onChange={(value)=>this.setState({reqType:value})}/>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalDemandMessages.Deadline}/>
              </Col>
              <Col span={12}>
                <DatePicker
                  defaultValue={moment().add(7, 'days')}
                  placeholder={window.localeInfo["PersonalDemand.SelectDate"]}
                  onChange={this.onChangeDate}
                  disabledDate={(current) => current < moment().endOf('day')}
                />
                {this.state.dateString &&
                <TimePicker onChange={this.onTimeChange} />}

              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalDemandMessages.DemandDescription}/>
              </Col>
              <Col span={12}>
                <TextArea maxLength='120' rows={4} value={this.state.textArea} onChange={(e)=>this.onChangeTextArea(e)} />
              </Col>
            </Row>

            <div className="uploadNeedSubmit marginTop">
              <ConfirmButton type="submit" onClick={(e)=>this.updata(e)}>
                <FormattedMessage {...PersonalDemandMessages.Publish}/>
              </ConfirmButton>
            </div>
          </div>
        )
    }
}


function mapStateToProps(state) {
  const account_info = state.headerState.account_info
  return { account_info }
}

export default connect(mapStateToProps)(BTPublishDemand)
