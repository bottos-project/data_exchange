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
import { connect } from 'react-redux'
import {getAccount} from "../tools/localStore";
import {Icon, Select, Button, Input, DatePicker, TimePicker, Col, Row } from 'antd';
import BTAssetList from './BTAssetList'
import BTCryptTool from 'bottos-crypto-js'
import {getBlockInfo,getDataInfo, getSignaturedParam} from '../utils/BTCommonApi'
import BTFetch from "../utils/BTFetch";
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
import moment from "moment"
import ConfirmButton from './ConfirmButton'
import BTTypeSelect from './BTTypeSelect'
import * as BTSign from '../lib/sign/BTSign'
import {registAssetPack} from '../lib/msgpack/BTPackManager'
import BTNumberInput from './BTNumberInput'
import { packedParam } from '../utils/pack'

const PersonalAssetMessages = messages.PersonalAsset;
const HeaderMessages = messages.Header;

const { TextArea } = Input;
const Option = Select.Option;

const initState = {
  title:'',
  number:'0',
  description:'',
  token_type: 'BTO',
  tag1:'',
  tag2:'',
  tag3:'',
  dataAssetType: '',
  getFileNameTemp:'',
  getFileName:'',
  getExampleUrl:'',
  getRealUrl:'',
  sample_hash:'',
  storage_hash:'',
  newdata:[],
  dateString: moment().add(7, 'days').toString(),
  timeValue: '',
}

class BTPublishAssetModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = initState

        this.onTimeChange = this.onTimeChange.bind(this)
        this.onTokenChange = this.onTokenChange.bind(this)
    }

    onChangeDataAssetType = (value) => {
      console.log('value', value);
      this.setState({ dataAssetType: value });
    }

    commitAsset(type) {
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
          // message.warning(window.localeInfo["PersonalAsset.ThereIsNoDataForTheTimeBeing"])
          this.setState({ newdata: res.data.row })
        } else {
          message.warning(window.localeInfo["Header.ThereIsNoFileResourceSetForTheTimeBeing"]);
        }
      }).catch(error => {
        message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
        console.error(error)
      })

    }

    onTimeChange(time, timeValue) {
      this.setState({ timeValue });
    }

    onTokenChange(value) {
      // console.log('value', value);
      this.setState({ token_type: value });
    }

    title(e){
        this.setState({
            title:e.target.value.trimLeft(),
        })
    }

    handleNumberChange = (e) => {
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

        this.setState({number})

    }

    description(e){
        this.setState({
            description:e.target.value.trimLeft()
        })
    }

    tag1(e){
        this.setState({ tag1:e.target.value })
    }

    tag2(e){
        this.setState({ tag2:e.target.value })
    }

    tag3(e){
        this.setState({ tag3:e.target.value })
    }

    getFileName(fileInfo){
        if(fileInfo.type=='asset'){
            this.setState({
                getFileName:fileInfo.value,
                storage_hash:fileInfo.hash,
            })
        }else if(fileInfo.type=='assetTemp'){
            this.setState({
                getFileNameTemp:fileInfo.value,
                sample_hash:fileInfo.hash,
                getExampleUrl:fileInfo.getExampleUrl,
            })
        }
    }

    async updata(){
      if (!this.state.storage_hash) {
        message.warning(window.localeInfo["PersonalAsset.PleaseChooseTheAsset"]);
        return ;
      }
      if(this.state.number<=0||this.state.number>=10000000000){
        message.warning(window.localeInfo["PersonalAsset.InputPrice"]);
        return;
      }
      let reg=/^\d+(?:\.\d{1,10})?$/
      if(!reg.test(this.state.number)){
        message.warning(window.localeInfo["PersonalAsset.InputPrice"]);
          return;
      }

      if (this.state.dateString == '') {
        message.warning(window.localeInfo["PersonalAsset.InputDeadline"]);
        return;
      }

      if (this.state.dataAssetType == '') {
        message.warning(window.localeInfo["PersonalAsset.PleaseChooseTheAssetType"]);
        return;
      }

      let blockInfo = await getBlockInfo()
      let account_info = this.props.account_info
      let privateKeyStr = account_info.privateKey
      let privateKey = Buffer.from(privateKeyStr,'hex')

      // console.log('blockInfo', blockInfo);

      const [contract, method] = ['assetmng', 'assetreg']
      let _message = {
        "version": 1,
        ...blockInfo,
        "sender": account_info.username,
        contract,
        method,
        "sig_alg": 1
      }

      let featureTag = this.state.tag1 + '-' + this.state.tag2 + '-' +this.state.tag3
      let expire_time_string = this.state.dateString + ' ' + (this.state.timeValue ? this.state.timeValue : '')
      let expire_time = new Date(expire_time_string).getTime() / 1000

      // console.log('expire_time', expire_time);
      // 用来确保 expire_time 是一个有效的时间戳
      if (expire_time == 0 || Number.isNaN(expire_time)) {
        console.warn('Invalid expire_time', expire_time);
        expire_time = (new Date().getTime() / 1000).toFixed()
        expire_time == Number(expire_time) + 7 * 24 * 3600
      }

      let did = {
        "assetId": window.uuid(),
        "info": {
          "userName": account_info.username,
          "assetName": this.state.title,
          "assetType": Number.parseInt(this.state.dataAssetType) || 0,
          "featureTag": featureTag,
          "sampleHash": this.state.sample_hash,
          "storageHash": this.state.storage_hash,
          "expireTime": expire_time,
          "opType": 1,
          "tokenType": this.state.token_type,
          "price": Number(this.state.number) * Math.pow(10, 8),
          "description": this.state.description
        }
      }

      console.log('did info', did.info)
      // let arrBuf = registAssetPack(did)
      // let arrBuf = await packDID(did, contract, method)

      // let params = Object.assign({}, _message)
      // params.param = arrBuf
      //
      // let sign = BTSign.messageSign(params, privateKey)
      // params.signature = sign.toString('hex')
      // params.param = BTCryptTool.buf2hex(arrBuf)

      let url = '/asset/registerAsset'
      let params = await packedParam(did, _message, privateKey)

      BTFetch(url,'POST',params)
      .then(response=>{
        // console.log({response})
        if(response && response.code==1){
          this.setState(initState)
          window.message.success(window.localeInfo['PersonalAsset.SuccessfulToRegisterTheAsset'])
        }else{
          window.message.error(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
        }
      }).catch(error=>{
        window.message.error(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
      })
    }

    dataPicker = (date, dateString) => {
      console.log('dateString', dateString);
      this.setState({ dateString })
    }

    render() {

      const { newdata, exampledata, getFileNameTemp, getFileName } = this.state

      return (
        <div className='route-children-container route-children-bg'>
          <BTAssetList  ref={(ref)=>this.assetListModal = ref} newdata={newdata} handleFile={(fileName)=>this.getFileName(fileName)}/>
          <div className="uploadAsset">
            <h2 className='route-children-container-title'>
              <FormattedMessage {...HeaderMessages.PublishAsset}/>
            </h2>

            {/* 上传样例 */}
            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.UploadTheSample}/>
              </Col>
              <Col span={18}>
                <Button type='primary' examplefile={exampledata} onClick={()=>this.commitAsset('assetTemp')}>
                  <Icon type="cloud-upload" />
                  <FormattedMessage {...PersonalAssetMessages.SetScreeningSample}/>
                </Button>
                <span className='filename'>{
                    getFileNameTemp.length <= 24
                    ?
                    getFileNameTemp
                    :
                    getFileNameTemp.split('.')[0].substring(0, 8)+'...'+getFileNameTemp.split('.').pop()
                }</span>
              </Col>
            </Row>

            {/* 选择资产文件 */}
            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.UploadTheAsset}/>
              </Col>
              <Col span={18}>
                <Button type='primary' exampledata={exampledata} onClick={()=>this.commitAsset('asset')}>
                  <Icon type="cloud-upload" />
                  <FormattedMessage {...PersonalAssetMessages.SetScreeningFile}/>
                </Button>
                <span className='filename'>{
                  getFileName.length <= 24
                  ?
                  getFileName
                  :
                  getFileName.split('.')[0].substring(0, 8)+'...'+getFileName.split('.').pop()
                }</span>
              </Col>
            </Row>


            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetName}/>
              </Col>
              <Col span={8}>
                <Input maxLength='126' placeholder={window.localeInfo["PersonalAsset.Name"]} value={this.state.title} onChange={(e)=>this.title(e)} />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>
              </Col>
              <Col span={8}>
                <BTNumberInput placeholder={window.localeInfo["PersonalAsset.Price"]}
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

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.Deadline}/>
              </Col>
              <Col span={12}>
                <DatePicker
                  defaultValue={moment().add(7, 'days')}
                  placeholder={window.localeInfo["PersonalAsset.SelectDate"]}
                  onChange={this.dataPicker}
                  disabledDate={(current) => current < moment().endOf('day')}
                />
                {this.state.dateString &&
                <TimePicker onChange={this.onTimeChange} />}
              </Col>
            </Row>


            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetType}/>
              </Col>
              <Col span={12}>
                <BTTypeSelect value={this.state.dataAssetType} onChange={this.onChangeDataAssetType} />
              </Col>
            </Row>

            <Row className="featureTag" gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetFeatureTag}/>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="space-between">
                  <Col span={6}><Input maxLength='20' type="text" value={this.state.tag1} onChange={(e)=>this.tag1(e)}/></Col>
                  <Col span={6}><Input maxLength='20' type="text" value={this.state.tag2} onChange={(e)=>this.tag2(e)}/></Col>
                  <Col span={6}><Input maxLength='20' type="text" value={this.state.tag3} onChange={(e)=>this.tag3(e)}/></Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>
              </Col>
              <Col span={12}>
                <TextArea maxLength='255' value={this.state.description} onChange={(e)=>this.description(e)} rows={4} />
              </Col>
            </Row>

            <div className="uploadNeedSubmit marginTop">
              <ConfirmButton type="submit" onClick={(e)=>this.updata(e)}>
                <FormattedMessage {...PersonalAssetMessages.Publish}/>
              </ConfirmButton>
            </div>
          </div>
        </div>
      )
    }
}


function mapStateToProps(state) {
  const account_info = state.headerState.account_info
  return { account_info }
}

export default connect(mapStateToProps)(BTPublishAssetModal)
