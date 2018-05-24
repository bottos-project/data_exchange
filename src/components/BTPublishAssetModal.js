import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import {getAccount} from "../tools/localStore";
// import BTUploadAsset from './BTUploadAsset'
// import messages from '../locales/messages'
import {Icon, Modal, Radio, Select, Button, Input, DatePicker, TimePicker, Cascader, Col, Row } from 'antd';
import BTAssetList from './BTAssetList'
import BTCryptTool from 'bottos-js-crypto'
import {getBlockInfo,getDataInfo, getSignaturedParam} from '../utils/BTCommonApi'
import BTFetch from "../utils/BTFetch";
import {options} from '../utils/option'
import {FormattedMessage} from 'react-intl'
import messages from '../locales/messages'
import moment from "moment"
import uuid from 'node-uuid'
import ConfirmButton from './ConfirmButton'
import BTTypeSelect from './BTTypeSelect'
import * as BTSign from '../lib/sign/BTSign'
import {registAssetPack} from '../lib/msgpack/BTPackManager'

const PersonalAssetMessages = messages.PersonalAsset;
const HeaderMessages = messages.Header;

const { TextArea } = Input;

String.prototype.trim=function() {
    return this.replace(/(^\s*)/g,'');
};
String.prototype.trims=function() {
    return this.replace(/(\s*$)/g,'');
};
class BTPublishAssetModal extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            value:1,
            title:'',
            number:'',
            description:'',
            tag1:'',
            tag2:'',
            tag3:'',
            dataAssetType: '0',
            getFileNameTemp:'',
            getFileName:'',
            getExampleUrl:'',
            getRealUrl:'',
            sample_hash:'',
            storage_hash:'',
            newdata:[],
            date11: '',
            timeValue: '',
        }

        this.onTimeChange = this.onTimeChange.bind(this)
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
        pageNum: 1,
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

    title(e){
        this.setState({
            title:e.target.value.trim(),
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

        this.setState({number})

    }

    description(e){
        this.setState({
            description:e.target.value.trim()
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

    async updata(){
      if(this.state.number<=0||this.state.number>=10000000000){
        message.warning(window.localeInfo["PersonalAsset.InputPrice"]);
        return;
      }
      let reg=/^\d+(?:\.\d{1,10})?$/
      if(!reg.test(this.state.number)){
          message.warning('输入正确的价格');
          return;
      }

      if (this.state.date11 == '') {
        message.warning(window.localeInfo["PersonalAsset.Deadline"]);
        return;
      }

      let blockInfo = await getBlockInfo()
      let account_info = this.props.account_info
      let privateKeyStr = account_info.privateKey
      let privateKey = Buffer.from(privateKeyStr,'hex')

      // console.log('blockInfo', blockInfo);

      let _message = {
        "version": 1,
        ...blockInfo,
        "sender": account_info.username,
        "contract": "assetmng",
        "method": "assetreg",
        "sig_alg": 1
      }

      let featureTag = this.state.tag1 + '-' + this.state.tag2 + '-' +this.state.tag3
      let expire_time_string = this.state.date11 + ' ' + (this.state.timeValue ? this.state.timeValue : '')
      let expire_time = new Date(expire_time_string).getTime() / 1000

      let did = {
        "asset_id": window.uuid,
        "basic_info": {
          "username": account_info.username,
          "assetName": this.state.title,
          "assetType": this.state.dataAssetType,
          "featureTag": featureTag,
          "sampleHash": this.state.sample_hash,
          "storageHash": this.state.storage_hash,
          "expireTime": expire_time,
          "opType": 1,
          "price": Number.parseInt(this.state.number) * Math.pow(10, 10),
          "description": this.state.description
        }
      }

      console.log('did basic_info', did.basic_info)
      let arrBuf = registAssetPack(did)
      let params = Object.assign({}, _message)
      params.param = arrBuf

      let sign = BTSign.messageSign(params, privateKey)
      params.signature = sign.toString('hex')
      params.param = BTCryptTool.buf2hex(arrBuf)

      let url = '/asset/registerAsset'

      BTFetch(url,'POST',params)
      .then(response=>{
        console.log({response})
        if(response && response.code==1){
          window.message.success('success')
        }else{
          window.message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
        }
      }).catch(error=>{
        window.message.warning(window.localeInfo["Header.FailedToGetTheFileResourceSet"]);
      })
    }

    dataPicker = (date, dateString) => {
      // console.log('date, dateString', date, dateString);
      this.setState({ date11: dateString })
    }

    render() {
      return (
        <div className='route-children-container route-children-bg'>
          <BTAssetList  ref={(ref)=>this.assetListModal = ref} newdata={this.state.newdata} handleFile={(fileName)=>this.getFileName(fileName)}/>
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
                <Button type='primary' examplefile={this.state.exampledata} onClick={()=>this.commitAsset('assetTemp')}>
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

            {/* 选择资产文件 */}
            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.UploadTheAsset}/>
              </Col>
              <Col span={18}>
                <Button type='primary' exampledata={this.state.exampledata} onClick={()=>this.commitAsset('asset')}>
                  <FormattedMessage {...PersonalAssetMessages.SetScreeningFile}/>
                </Button>
                <span className='filename'>{
                  this.state.getFileName.length<=14
                  ?
                  this.state.getFileName
                  :
                  this.state.getFileName.split('.')[0].substring(0,5)+'...'+this.state.getFileName.split('.')[1]
                }</span>
              </Col>
            </Row>


            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetName}/>
              </Col>
              <Col span={8}>
                <Input placeholder={window.localeInfo["PersonalAsset.Name"]} value={this.state.title} onChange={(e)=>this.title(e)} />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.ExpectedPrice}/>
              </Col>
              <Col span={8}>
                <Input placeholder={window.localeInfo["PersonalAsset.Price"]}
                       type='number'
                       value={this.state.number}
                       onChange={this.handleNumberChange}
                />
              </Col>
              <Col span={4}>
                <img src="./img/token.png" style={{width:20,height:20,margin:5}} alt=""/>
              </Col>
            </Row>



            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.Deadline}/>
              </Col>
              <Col span={12}>
                <DatePicker
                    placeholder={window.localeInfo["PersonalAsset.SelectDate"]}
                    onChange={this.dataPicker}
                    disabledDate={(current) => current < moment().endOf('day')}
                    // value={moment(this.state.date11, 'HH:mm:ss')}
                />
                {this.state.date11 &&
                <TimePicker onChange={this.onTimeChange} />}
              </Col>
            </Row>


            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetType}/>
              </Col>
              <Col span={12}>
                <BTTypeSelect onChange={this.onChangeDataAssetType} />
                {/* <Cascader value={this.state.cascader}
                  options={options}
                  placeholder={window.localeInfo["PersonalAsset.PleaseSelect"]}
                /> */}
              </Col>
            </Row>

            <Row className="featureTag" gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetFeatureTag}/>
              </Col>
              <Col span={12}>
                <Row type="flex" justify="space-between">
                  <Col span={6}><Input type="text" value={this.state.tag1} onChange={(e)=>this.tag1(e)}/></Col>
                  <Col span={6}><Input type="text" value={this.state.tag2} onChange={(e)=>this.tag2(e)}/></Col>
                  <Col span={6}><Input type="text" value={this.state.tag3} onChange={(e)=>this.tag3(e)}/></Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className='label' span={6}>
                <FormattedMessage {...PersonalAssetMessages.AssetDescription}/>
              </Col>
              <Col span={12}>
                <TextArea maxLength='120' value={this.state.description} onChange={(e)=>this.description(e)} rows={4} />
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
